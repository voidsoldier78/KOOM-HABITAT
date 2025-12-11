import { Injectable, signal, WritableSignal } from '@angular/core';

export type Language = 'es' | 'en';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  // La señal que hace la magia instantánea
  public currentLang: WritableSignal<Language> = signal<Language>(this.getInitialLang());

  constructor() { }

  private getInitialLang(): Language {
    const stored = localStorage.getItem('lang');
    return (stored === 'en' || stored === 'es') ? stored : 'es';
  }

  // ESTA ES LA FUNCIÓN QUE LLAMA TU BOTÓN
  toggleLanguage() {
    
  this.currentLang.update(current => {
    const newLang = current === 'es' ? 'en' : 'es';
    console.log('🚨 SERVICIO: Idioma cambiado a:', newLang); // <--- AGREGA ESTO
    localStorage.setItem('lang', newLang);
    return newLang;
  });
}
}