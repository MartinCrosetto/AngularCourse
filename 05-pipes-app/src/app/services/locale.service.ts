import { Injectable, signal } from '@angular/core';

function validateIsAnAvailableLocale(locale: string | null): AvailableLocale {
  // si existe locale, lo pone en minusculas, sino retorna null
  locale = locale ? locale.toLowerCase() : null;
  const validLocales: Record<string, AvailableLocale> = {
    es: 'es',
    fr: 'fr',
    en: 'en',
  };
  if (locale === null) {
    return 'en';
  }
  //si no se encuentra en los locales validos, retorna "en"
  return validLocales[locale] ?? 'en';
}

export type AvailableLocale = 'es' | 'fr' | 'en';
@Injectable({ providedIn: 'root' })
export class LocaleService {
  private currentLocale = signal<AvailableLocale>('es');

  constructor() {
    this.currentLocale.set(
      validateIsAnAvailableLocale(localStorage.getItem('locale'))
    );
  }

  get getLocale() {
    return this.currentLocale();
  }
  changeLocale(locale: AvailableLocale) {
    // Guardamos el locale en el local storage
    localStorage.setItem('locale', locale);
    this.currentLocale.set(locale);
    // Recargamos la pantalla
    window.location.reload();
  }
}
