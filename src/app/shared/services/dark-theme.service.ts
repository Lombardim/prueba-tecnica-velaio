import { Injectable } from '@angular/core';
import { SystemTheme } from '../interfaces/theme.interface';

@Injectable({
  providedIn: 'root'
})
export class DarkThemeService {
  private _currentTheme: SystemTheme = SystemTheme.LIGHT;

  constructor() { }

  get isLightTheme(): boolean {
    return this._currentTheme === SystemTheme.LIGHT;
  }
  
  updateSelectedTheme() {
    this._currentTheme = localStorage.getItem('theme') as SystemTheme;
    if (this._currentTheme === SystemTheme.DARK) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  changeTheme(theme: SystemTheme) {
    this._currentTheme = theme;
    localStorage.setItem('theme', this._currentTheme)
    this.updateSelectedTheme();
  }
}
