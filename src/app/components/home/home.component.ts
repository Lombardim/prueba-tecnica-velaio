import {Component, OnDestroy, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {LanguageCode, LanguageConfig} from 'src/app/shared/interfaces/language.interface';
import {DarkThemeService} from '../../shared/services/dark-theme.service';
import {SystemTheme} from '../../shared/interfaces/theme.interface';
import {CustomSelectOption} from '../../shared/interfaces/custom.interface';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter, Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  headerName = '';
  currentLanguage: LanguageConfig = {
    logo: 'bg-en-icon',
    code: LanguageCode.ENGLISH,
    value: 'english',
  };
  languages: CustomSelectOption[] = [
    {
      name: 'HOME.LANGUAGE.ENGLISH',
      icon: 'bg-en-icon',
      value: 'english',
    },
    {
      name: 'HOME.LANGUAGE.SPANISH',
      icon: 'bg-es-icon',
      value: 'spanish',
    },
  ];
  subscription$?: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private theme: DarkThemeService,
    private translate: TranslateService,
  ) {}

  get isLightMode(): boolean {
    return this.theme.isLightTheme;
  }

  ngOnInit(): void {
    this.subscription$ = this.router.events.pipe(filter((event): event is NavigationEnd =>
      event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      this.setHeaderName(event.url);
    });
    this.setHeaderName();
    this.getCurrentLanguage();
  }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

  setHeaderName(url?: string) {
    if (url) {
      this.headerName = url.includes('action') ? url.includes('create') ? 'HOME.ROUTE.CREATE' : 'HOME.ROUTE.EDIT'
        : 'HOME.ROUTE.LIST';
    } else {
      this.headerName = this.route.snapshot.firstChild?.routeConfig?.path === 'action' ?
        this.route.snapshot.firstChild?.queryParams['type'] === 'create' ? 'HOME.ROUTE.CREATE' : 'HOME.ROUTE.EDIT'
        : 'HOME.ROUTE.LIST';
    }
  }

  getCurrentLanguage() {
    switch(this.translate.getDefaultLang()) {
      case LanguageCode.SPANISH: {
        this.currentLanguage = {
          logo: 'bg-es-icon',
          code: LanguageCode.SPANISH,
          value: 'spanish',
        };
        break;
      }
      case LanguageCode.ENGLISH: {
        this.currentLanguage = {
          logo: 'bg-en-icon',
          code: LanguageCode.ENGLISH,
          value: 'english',
        };
        break;
      }
    }
  }

  changeLanguage(language: string) {
    this.currentLanguage.value = language;
    this.currentLanguage.logo = this.currentLanguage.value === 'english' ? 'bg-en-icon' : 'bg-es-icon';
    this.translate.use(this.currentLanguage.value === 'english' ? 'en' : 'es');
  }

  changeTheme() {
    this.theme.changeTheme(this.isLightMode ? SystemTheme.DARK : SystemTheme.LIGHT);
  }
}
