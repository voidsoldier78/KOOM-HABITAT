import { Component, computed, inject } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {

  public translation = inject(TranslationService);

  // Base de datos de textos
  db = {
    es: {
      ui: {
        desc: 'Tu pausa perfecta para vivir la Riviera Maya. <br> Departamentos de lujo con servicios incluidos en Tulum.',
        infoTitle: 'Información',
        linkHome: 'Inicio',
        linkLocation: 'Ubicación',
        linkSpaces: 'Espacios',
        linkDepts: 'Departamentos',
        linkBook: 'Reservar',
        legalTitle: 'Legal',
        linkPrivacy: 'Política de Privacidad',
        linkTerms: 'Términos y Condiciones',
        linkCookies: 'Política de Cookies',
        linkContact: 'Contacto',
        copyright: '© 2025 KOOM Habitat. Todos los derechos reservados.',
        madeWith: 'Hecho con'
      }
    },
    en: {
      ui: {
        desc: 'Your perfect pause to experience the Riviera Maya. <br> Luxury apartments with included services in Tulum.',
        infoTitle: 'Information',
        linkHome: 'Home',
        linkLocation: 'Location',
        linkSpaces: 'Spaces',
        linkDepts: 'Apartments',
        linkBook: 'Book Now',
        legalTitle: 'Legal',
        linkPrivacy: 'Privacy Policy',
        linkTerms: 'Terms & Conditions',
        linkCookies: 'Cookie Policy',
        linkContact: 'Contact',
        copyright: '© 2025 KOOM Habitat. All rights reserved.',
        madeWith: 'Made with'
      }
    }
  };

  // Señal computada única
  ui = computed(() => this.db[this.translation.currentLang()].ui);

}