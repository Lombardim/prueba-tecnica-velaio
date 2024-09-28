import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageCode, LanguageConfig } from 'src/app/shared/interfaces/language.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentLanguage: LanguageConfig = {
    logo: '🇪🇸',
    code: LanguageCode.SPANISH,
    value: 'spanish',
  };

  constructor(
    private route: ActivatedRoute,
    private translate: TranslateService,
  ) {

  }
  ngOnInit(): void {
    console.log(this.translate.getDefaultLang());
  }
  changeLanguage(language: string) {
    this.translate.use(language);
  }
}
