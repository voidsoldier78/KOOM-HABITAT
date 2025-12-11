import { Component, computed, inject } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

interface Amenity {
  title: string;
  image: string;
  description: string;
  showDesc: boolean;
}

@Component({
  selector: 'app-galeria',
  standalone: false,
  templateUrl: './galeria.html',
  styleUrl: './galeria.css',
})
export class Galeria {

  public translation = inject(TranslationService);

  // Base de datos de textos
  db = {
    es: {
      title: 'AMENIDADES',
      amenities: [
        {
          title: 'Alberca Planta Baja',
          image: 'img/Albercaplantabaja.webp',
          description: ' Piscina principal climatizada en planta baja con acceso para todos los huéspedes',
          showDesc: false
        },
        {
          title: 'Plunge Pool',
          image: 'img/PlungePool.webp',
          description: 'Plunge pool en el Rooftop con una increíble vista hacia la selva.',
          showDesc: false
        }
      ]
    },
    en: {
      title: 'AMENITIES',
      amenities: [
        {
          title: 'Ground Floor Pool',
          image: 'img/Albercaplantabaja.webp',
          description: '“Enjoy two heated pools: Main heated pool located on ground floor for all guests to enjoy',
          showDesc: false
        },
        {
          title: 'Plunge Pool',
          image: 'img/PlungePool.webp',
          description: 'Plunge pool on the Rooftop with amazing jungle views.',
          showDesc: false
        }
      ]
    }
  };

  // Señal computada: Accede automáticamente al idioma actual
  ui = computed(() => this.db[this.translation.currentLang()]);

  // --- Lógica Visual (Hover/Click) ---
  
  showDescription(amenity: Amenity): void {
    amenity.showDesc = true;
  }

  hideDescription(): void {
    // Reseteamos el estado en la lista actual
    this.ui().amenities.forEach(item => item.showDesc = false);
  }

  toggleDescription(amenity: Amenity): void {
    amenity.showDesc = !amenity.showDesc;
  }
}