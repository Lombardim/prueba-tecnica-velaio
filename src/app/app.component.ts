import { Component, OnInit, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageCode } from './shared/interfaces/language.interface';
import { DarkThemeService } from './shared/services/dark-theme.service';
import { SystemTheme } from './shared/interfaces/theme.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'velaio-miguel-lombardi';

  constructor(
    private translate: TranslateService,
    private darkTheme: DarkThemeService,
    private renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    this.validateCurrentLanguage();
    this.validateCurrentTheme();
  }

  validateCurrentLanguage() {
    const languageConfig: string | null = localStorage.getItem('lang');
    if (languageConfig) {
      switch (languageConfig) {
        case LanguageCode.ENGLISH: {
          this.translate.use('en');
          break;
        }
        case LanguageCode.SPANISH: {
          this.translate.use('es');
          break;
        }
      }
    } else {
      if (navigator.language.includes(LanguageCode.SPANISH)) {
        this.translate.use('es');
      } else {
        this.translate.use('en');
      }
    }
    this.renderer.setAttribute(document.documentElement, 'lang', this.translate.currentLang);
  }

  validateCurrentTheme() {
    const savedTheme: string | null = localStorage.getItem('theme');
    if (savedTheme) {
      if (savedTheme as SystemTheme === SystemTheme.DARK) {
        this.darkTheme.changeTheme(savedTheme as SystemTheme);
      }
    } else {
      this.darkTheme.changeTheme(window.matchMedia("(prefers-color-scheme: dark)").matches ? SystemTheme.DARK : SystemTheme.LIGHT);
    }
  }
}
