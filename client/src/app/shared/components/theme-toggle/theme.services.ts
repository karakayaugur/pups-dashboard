import { inject, Injectable } from '@angular/core';
import { StorageService } from '@core/services';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themeKey = 'app-theme';
  private readonly storageService = inject(StorageService);

  constructor() {
    const theme =
      this.storageService.getData(this.themeKey) === 'dark' ? 'dark' : 'light';
    this.setTheme(theme);
  }

  setTheme(theme: 'light' | 'dark'): void {
    document.documentElement.setAttribute('color-scheme', theme);
    localStorage.setItem(this.themeKey, theme);
  }

  toggleTheme(): void {
    const currentTheme =
      document.documentElement.getAttribute('color-scheme') ?? 'light';
    const theme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('color-scheme', theme);
    localStorage.setItem(this.themeKey, theme);
  }
}
