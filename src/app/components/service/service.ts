import { Component, computed, inject } from '@angular/core';
import { TranslationService } from '../../services/translation.service'; // Asegúrate que la ruta sea correcta

@Component({
  selector: 'app-service',
  standalone: false,
  templateUrl: './service.html',
  styleUrl: './service.css',
})
export class Service {

  // 1. Inyectamos el servicio de traducción
  public translation = inject(TranslationService);

  // 2. Base de datos de textos e imágenes
  db = {
    es: {
      ui: {
        sectionTitle: 'Servicios Exclusivos',
        subTitle: 'Todo lo que necesitas para una estancia perfecta',
        servicesList: [
          { 
            title: 'Concierge 24/7', 
            description: 'Asistencia personalizada en todo momento.',
            image: 'assets/img/concierge.jpg' // Cambia por tu imagen
          },
          { 
            title: 'Limpieza Premium', 
            description: 'Mantenimiento impecable diario incluido.',
            image: 'assets/img/cleaning.jpg' 
          },
          { 
            title: 'Seguridad Privada', 
            description: 'Tranquilidad total para ti y tu familia.',
            image: 'assets/img/security.jpg' 
          }
        ]
      }
    },
    en: {
      ui: {
        sectionTitle: 'Exclusive Services',
        subTitle: 'Everything you need for a perfect stay',
        servicesList: [
          { 
            title: '24/7 Concierge', 
            description: 'Personalized assistance at all times.',
            image: 'assets/img/concierge.jpg' 
          },
          { 
            title: 'Premium Cleaning', 
            description: 'Impeccable daily maintenance included.',
            image: 'assets/img/cleaning.jpg' 
          },
          { 
            title: 'Private Security', 
            description: 'Total peace of mind for you and your family.',
            image: 'assets/img/security.jpg' 
          }
        ]
      }
    }
  };

  // 3. Señal para detectar el idioma actual
  ui = computed(() => {
    const lang = this.translation.currentLang();
    return this.db[lang].ui;
  });

  constructor() { }
}