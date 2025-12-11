import { Component, computed, inject } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

// Definimos una interfaz para que sea más fácil entender la estructura (Opcional pero recomendado)
interface LocationItem {
  name: string;        // Texto del botón (ej: Quinta Avenida)
  time: string;        // Tiempo (ej: 5 min)
  image: string;       // Ruta de la imagen
  description: string; // Texto largo del modal
}

@Component({
  selector: 'app-location',
  standalone: false,
  templateUrl: './location.html',
  styleUrl: './location.css',
})
export class Location {

  // 1. Inyectamos el servicio
  public translation = inject(TranslationService);

  // 2. Variable para guardar el ítem que el usuario clicó (para el Modal)
  selectedItem: LocationItem | null = null;

  // 3. Base de datos de textos
  db = {
    es: {
      ui: {
        mainTitle: 'Ubicación Privilegiada',
        subTitle: 'A solo minutos de las playas icónicas de la Riviera Maya',
        directAccessTitle: 'Acceso Directo',
        accessText: 'Conectividad inmediata con las principales avenidas y zonas turísticas de Playa del Carmen.',
        nearbyTitle: 'Cerca de Todo',
        // AHORA ES UNA LISTA DE OBJETOS
        nearbyList: [
          {
            time: '5 min',
            name: 'Playa Paraiso',
            image: 'img/tulu1.jpg', // ¡Asegúrate de tener estas imágenes o cambiar la ruta!
            description: 'Un mar turquesa impresionante, arena suave y un ambiente tranquilo que invita a relajarte por completo. Playa Paraíso es ese lugar donde llegas a desconectarte y terminas enamorado del paisaje.'
          },
          {
            time: '10 min',
            name: 'Zona arqueológica Tulums',
            image: 'img/tulu2.jpg',
            description: 'Historia maya frente al Caribe. Caminar entre templos antiguos con el sonido del mar de fondo es una experiencia única que combina cultura, belleza natural y energía mística.'
          },
          {
            time: '15 min',
            name: 'Reserva de la biósfera sian ka an ',
            image: 'img/tulu3.jpg',
            description: 'Naturaleza pura en su máxima expresión. Manglares, lagunas, fauna silvestre y paisajes intactos te hacen sentir que estás descubriendo un paraíso escondido.'
          }
        ]
      }
    },
    en: {
      ui: {
        mainTitle: 'Prime Location',
        subTitle: 'Just minutes from the iconic beaches of the Riviera Maya',
        directAccessTitle: 'Direct Access',
        accessText: 'Immediate connectivity to the main avenues and tourist zones of Playa del Carmen.',
        nearbyTitle: 'Close to Everything',
        nearbyList: [
          {
            time: '5 min',
            name: 'Playa Paraíso',
            image: 'img/tulu1.jpg',
            description: 'Stunning turquoise waters, soft white sand, and a peaceful atmosphere that makes you want to stay forever. Playa Paraíso is the perfect place to relax and fall in love with the view.'
          },
          {
            time: '10 min',
            name: 'Tulum Archaeological Zone',
            image: 'img/tulu2.jpg',
            description: 'Mayan history overlooking the Caribbean. Walking among ancient temples with the sound of the ocean behind you is a unique experience filled with culture, beauty, and a mystical vibe.'
          },
          {
            time: '15 min',
            name: 'Sian Ka’an Biosphere Reserve',
            image: 'img/tulu3.jpg',
            description: 'Pure, untouched nature. Mangroves, lagoons, wildlife, and breathtaking landscapes make you feel like you’re exploring a hidden paradise.'
          }
        ]
      }
    }
  };

  // 4. Señal computada
  ui = computed(() => {
    const lang = this.translation.currentLang();
    return this.db[lang].ui;
  });

  // Función opcional para limpiar la selección al cerrar (aunque Bootstrap lo maneja visualmente)
  clearSelection() {
    this.selectedItem = null;
  }
}