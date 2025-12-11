import { Component,computed, inject } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-hero',
  standalone: false,
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  // 1. Variable para guardar los textos que verá el HTML
public translation = inject(TranslationService);
  // 2. Base de datos de textos (Ajusta los textos a lo que diga tu Hero real)
  db = {
    es: {
      ui: {
        title: "Vive la experiencia Tulum",
        subtitle: "Tu pausa perfecta para vivir la Riviera",
      }
    },
    en: {
      ui: {
        title: "Live the Tulum Experience",
        subtitle: "our perfect pause to experience the Riviera Maya",
      }
    }
  };

  ui = computed(() => {
    const lang = this.translation.currentLang();
    return this.db[lang].ui;
  });


}
