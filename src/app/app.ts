import { Component, HostListener, inject, signal, computed } from '@angular/core';
import { TranslationService } from './services/translation.service';

@Component({
  selector: 'app-root',
  // Asegúrate de que coincida con el nombre de tu archivo HTML
  templateUrl: './app.html', 
  standalone: false,
  styleUrl: './app.css'
})
export class App {

  // Inyectamos el servicio como público para que el HTML pueda acceder a toggleLanguage()
  public translationService = inject(TranslationService);
  
  protected readonly title = signal('KOOM');
  public isScrolled = false;

  // 1. BASE DE DATOS DEL NAVBAR
  // Aquí definimos los textos en ambos idiomas
  db = {
    es: {
      navAmenities: 'Amenidades',
      navDepts: 'Departamentos',
      navServices: 'Servicios Incluidos',
      navLocation: 'Ubicación',
      navReserve: 'Reserva'
    },
    en: {
      navAmenities: 'Amenities',
      navDepts: 'Apartments',
      navServices: 'Included Services',
      navLocation: 'Location',
      navReserve: 'Book Now'
    }
  };

  // 2. SEÑALES COMPUTADAS (Signals)
  // Estas señales escuchan automáticamente el idioma actual del servicio
  // y actualizan el texto sin necesidad de recargar la página.
  public navAmenities = computed(() => this.db[this.translationService.currentLang()].navAmenities);
  public navDepts     = computed(() => this.db[this.translationService.currentLang()].navDepts);
  public navServices  = computed(() => this.db[this.translationService.currentLang()].navServices);
  public navLocation  = computed(() => this.db[this.translationService.currentLang()].navLocation);
  public navReserve   = computed(() => this.db[this.translationService.currentLang()].navReserve);

  // 3. LÓGICA DE SCROLL (Para cambiar el color del navbar)
  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Detectamos si el usuario ha bajado más de 10px
    const verticalOffset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isScrolled = verticalOffset > 10;
  }

  // 4. LÓGICA DE NAVEGACIÓN
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}