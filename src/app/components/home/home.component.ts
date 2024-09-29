import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {LanguageCode, LanguageConfig} from 'src/app/shared/interfaces/language.interface';
import {DarkThemeService} from '../../shared/services/dark-theme.service';
import {SystemTheme} from '../../shared/interfaces/theme.interface';
import {CustomSelectOption} from '../../shared/interfaces/custom.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
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

  constructor(
    private route: ActivatedRoute,
    private theme: DarkThemeService,
    private translate: TranslateService,
  ) {}

  get isLightMode(): boolean {
    return this.theme.isLightTheme;
  }

  ngOnInit(): void {
    this.getCurrentLanguage();
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
