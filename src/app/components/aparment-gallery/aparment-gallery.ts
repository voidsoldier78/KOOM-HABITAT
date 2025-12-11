import { Component, computed, effect, inject } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

// --- INTERFACES ---
interface Apartment {
  id: string;
  title: string;
  imageSrc: string;
  gallery: GalleryItem[];
  rooms: number;
  people: number;
  size: number;
  description: string;
  amenities: string[];
  price: number;
  bookingLink?: string;
}

interface GalleryItem {
  src: string;
  text: string;
}

interface ServiceDetail {
  key: string;
  title: string;
  image: string;
  description: string;
  gallery: GalleryItem[];
}

@Component({
  selector: 'app-aparment-gallery',
  standalone: false,
  templateUrl: './aparment-gallery.html', // Ojo: verifica si es .html o .component.html
  styleUrl: './aparment-gallery.css',
})
export class AparmentGallery {

  public translation = inject(TranslationService);

  // Estados locales
  public selectedApartment: Apartment | null = null;
  public viewMode: 'details' | 'service' = 'details';
  public selectedService: ServiceDetail | null = null;

  // Variables visuales
  currentAptImage: string = '';
  currentAptText: string = '';
  currentServiceImage: string = '';
  currentServiceText: string = '';

  // Detecta si la URL termina en mp4 o webm
isVideo(url: string): boolean {
  if (!url) return false;
  const lowerUrl = url.toLowerCase();
  return lowerUrl.endsWith('.mp4') || lowerUrl.endsWith('.webm') || lowerUrl.endsWith('.ogg');
}

  constructor() {
    // ESTE EFFECT ES CLAVE PARA EL MODAL:
    // Si cambias el idioma con el modal abierto, esto busca el nuevo texto
    // para el departamento seleccionado y lo actualiza al instante.
    effect(() => {
      // 1. Detectamos cambio de idioma (esto dispara el efecto)
      const lang = this.translation.currentLang(); 
      
      // 2. Si hay un depa abierto, actualizamos su referencia al nuevo idioma
      if (this.selectedApartment) {
        const currentList = this.apartments(); // Obtenemos la lista nueva
        const updatedApt = currentList.find(a => a.id === this.selectedApartment?.id);
        
        if (updatedApt) {
          this.selectedApartment = updatedApt;
          // Si estamos viendo la descripción principal, la actualizamos
          if (this.currentAptImage === updatedApt.imageSrc) {
             this.currentAptText = updatedApt.description;
          }
        }
      }

      // 3. Si hay un servicio abierto, hacemos lo mismo
      if (this.selectedService) {
        // CORRECCIÓN AQUÍ TAMBIÉN: Usamos el cast para evitar errores en el effect
        const currentServices = this.servicesData() as Record<string, ServiceDetail>;
        const updatedService = currentServices[this.selectedService.key];
        
        if (updatedService) {
          this.selectedService = updatedService;
          if (this.currentServiceImage === updatedService.image) {
            this.currentServiceText = updatedService.description;
          }
        }
      }
    });
  }

  // --- BASE DE DATOS COMPLETA ---
  db = {
    es: {
      ui: {
        titulo_principal: "Nuestros Departamentos",
        subtitulo: "Encuentra el espacio perfecto para tu estancia",
        modal_amenidades: "Amenidades",
        modal_precio_incluye: "Precio incluye:",
        modal_noches: "Hospedaje 7 noches",
        serv_auto: "Automóvil",
        serv_desayuno: "Desayuno",
        serv_depa: "Departamento equipado",
        btn_baja: "Baja",
        btn_alta: "Alta",
        btn_reservar: "RESERVAR",
        titulo_servicios: "SERVICIOS INCLUIDOS",
        btn_volver: "VOLVER A DEPARTAMENTOS"
      },
      apartments: [
        {
          id: 'D1',
          title: 'Departamento D1',
          imageSrc: 'img/Departamento1.webp',
          rooms: 2, people: 4, size: 85, price: 2750,
          description: 'Habitación principal: Amplia habitación con closet, aire acondicionado y aplicaciones en Piedra Maya. Acceso directo a la alberca y al asoleadero. El departamento cuenta con una habitación extra',
          amenities: [
            'Disfruta de dos albercas climatizadas: Piscina principal climatizada en planta baja con acceso para todos los huéspedes',
            'Plunge pool en el Rooftop con una increíble vista hacia la selva.',
            'Un baño completo con aplicaciones en mármol negro. Ducha tipo lluvia.',
            'Equipado con productos de cuidado personal como papel higiénico, shampoo y jabón.',
            'Incluye tambien Cocina integral totalmente equipada y barra comedor.',
            'Batería de sartenes completa e insumos alimenticios básicos. Estancia con televisión y sofá.'
          ],
          gallery: [
            { src: 'img/baño3.webp', text: 'Un baño completo con aplicaciones en mármol negro. Ducha tipo lluvia. Equipado con productos de cuidado personal como papel higiénico, shampoo y jabón.' },
            { src: 'img/1_Cocina_estancia_D1.jpg', text: 'Cocina integral totalmente equipada y barra comedor. Batería de sartenes completa e insumos alimenticios básicos. Estancia con televisión y sofá.' },
            { src: 'video/KOOM.mp4', text: 'Ten tu propio descanso en la naturaleza: observa, explora y disfruta dentro de nuestras instalaciones con alberca y una hermosa vista a la selva.'}
          ],
          bookingLink: 'https://reserva.koom-tulum.com/departamento/departamento-1'
        },
        {
          id: 'D2',
          title: 'Departamento D2',
          imageSrc: 'img/Departamento2.webp',
          rooms: 2, people: 4, size: 90, price: 3100,
          description: 'Habitación principal: Amplia habitación con closet, aire acondicionado y aplicaciones en Piedra Maya. Acceso directo a la alberca y al asoleadero. El departamento cuenta con una habitación extra.',
          amenities: [
            'Dos baños completos con aplicaciones en mármol negro. Ducha tipo lluvia.',
            'Equipado con productos de cuidado personal como papel higiénico, shampoo y jabón.',
            'Cocina integral totalmente equipada y barra comedor.',
            'Batería de sartenes completa e insumos alimenticios básicos.',
            'Estancia con televisión y sofá-cama matrimonial.'
          ],
          gallery: [
            { src: 'img/baño2.jpg', text: 'Dos baños completos con aplicaciones en mármol negro. Ducha tipo lluvia. Equipado con productos de cuidado personal como papel higiénico, shampoo y jabón.' },
            { src: 'img/cocina2.jpeg', text: 'Cocina integral totalmente equipada y barra comedor. Batería de sartenes completa e insumos alimenticios básicos. Estancia con televisión y sofá-cama matrimonial.' },
             { src: 'video/KOOM.mp4', text: 'Todo lo que puedes desear dentro de un penthouse'}
          ],
          bookingLink: 'https://reserva.koom-tulum.com/departamento/departamento-2'
        },
        {
          id: 'D3',
          title: 'Departamento D3',
          imageSrc: 'img/habitacion3.webp',
          rooms: 3, people: 6, size: 95, price: 3600,
          description: 'Habitación principal: Amplia habitación con vista a la selva, closet, aire acondicionado y aplicaciones en Piedra Maya. Acceso directo a la terraza privada. El departamento cuenta con una habitación extra.',
          amenities: [
            'Dos baños completos con aplicaciones en mármol negro. Ducha tipo lluvia.',
            'Equipado con productos de cuidado personal como papel higiénico, shampoo y jabón.',
            'Cocina integral totalmente equipada y barra comedor.',
            'Batería de sartenes completa e insumos alimenticios básicos.',
            'Estancia con televisión y sofá-cama matrimonial. Acceso balcón.',
            'Balcón: Balcón con jacuzzi. Terraza privada con acceso desde la habitación principal, equipada con sillas.'
          ],
          gallery: [
            { src: 'img/baño3.webp', text: 'Dos baños completos con aplicaciones en mármol negro. Ducha tipo lluvia. Equipado con productos de cuidado personal como papel higiénico, shampoo y jabón.' },
            { src: 'img/cocina3.png', text: 'Cocina integral totalmente equipada y barra comedor. Batería de sartenes completa e insumos alimenticios básicos. Estancia con televisión y sofá-cama matrimonial. Acceso balcón.' },
            { src: 'img/balcon.jpg', text: 'Balcón con jacuzzi.' },
            {src: 'img/terraza.jpg', text: 'Terraza privada con acceso desde la habitación principal, equipada con sillas.' },
            { src: 'video/KOOM.mp4', text: 'Todo lo que puedes desear dentro de un penthouse'}
            
          ],
          bookingLink: 'https://reserva.koom-tulum.com/departamento/departamento-3'
        },
        {
          id: 'D4',
          title: 'Departamento D4',
          imageSrc: 'img/habitacion4.webp',
          rooms: 3, people: 6, size: 95, price: 3600,
          description: 'Habitación principal: Amplia habitación con vista a la selva, closet, aire acondicionado y aplicaciones en Piedra Maya. Acceso a terraza privada. El departamento cuenta con una habitación extra.',
          amenities: [
            'Dos baños completos con aplicaciones en mármol negro. Ducha tipo lluvia.',
            'Equipado con productos de cuidado personal como papel higiénico, shampoo y jabón.',
            'Cocina integral totalmente equipada y barra comedor.',
            'Batería de sartenes completa e insumos alimenticios básicos.',
            'Estancia con televisión y sofá-cama matrimonial.',
            'Acceso a Balcón con jacuzzi.',
            'Terraza privada con acceso desde la habitación principal, equipada con sillas.'
          ],
          gallery: [
            { src: 'img/baño4.webp', text: 'Dos baños completos con aplicaciones en mármol negro. Ducha tipo lluvia. Equipado con productos de cuidado personal como papel higiénico, shampoo y jabón.' },
            { src: 'img/cocina2.jpeg', text: 'Cocina integral totalmente equipada y barra comedor. Batería de sartenes completa e insumos alimenticios básicos. Estancia con televisión y sofá-cama matrimonial. Acceso a balcón.' },
            { src: 'img/jacuzzi4.webp', text: 'Balcón con jacuzzi.' },
              { src: 'img/terraza.jpg.webp', text: 'Terraza privada con acceso desde la habitación principal, equipada con sillas.' },
            { src: 'video/KOOM.mp4', text: 'Todo lo que puedes desear dentro de un penthouse'}
          ],
          bookingLink: 'https://reserva.koom-tulum.com/departamento/departamento-4'
        },
        {
          id: 'D5',
          title: 'Penthouse D1',
          imageSrc: 'img/hab5.webp',
          rooms: 3, people: 6, size: 95, price: 3600,
          description: 'o Habitación principal: Amplia habitación con closet, aire acondicionado y aplicaciones en Piedra Maya. Acceso a terraza privada con vista a la selva.',
          amenities: [
            'Tres baños completos con aplicaciones en mármol negro. Ducha tipo lluvia.',
            'Equipado con productos de cuidado personal como papel higiénico, shampoo y jabón.',
            'Cocina integral totalmente equipada y barra comedor.',
            'Batería de sartenes completa e insumos alimenticios básicos.',
            'Estancia en primera planta con acceso a balcón, equipada con televisión y sofá-cama matrimonial.',
            'Segunda estancia en planta alta con acceso a plunge pool y vista a la selva.'
          ],
          gallery: [
            { src: 'img/hab5.webp', text: 'Dos cómodas habitaciones con camas matrimoniales y aire acondicionado. Una habitación se encuentra en el segundo piso, cuenta con acceso directo al asoleadero, parrilla y plunge pool.' },
            { src: 'img/baño5.webp', text: 'Tres baños completos con aplicaciones en mármol negro. Ducha tipo lluvia. Equipado con productos de cuidado personal como papel higiénico, shampoo y jabón.' },
            { src: 'img/cocina.jpg', text: 'Cocina integral totalmente equipada y barra comedor. Batería de sartenes completa e insumos alimenticios básicos.' },
            { src: 'img/estancia.jpg', text: 'Estancia en primera planta con acceso a balcón, equipada con televisión y sofá-cama matrimonial. Segunda estancia en planta alta con acceso a plunge pool y vista a la selva.'},
            { src: 'img/segundoPiso.jpg', text: 'El segundo piso cuenta con un asoleadero, asador y plunge pool privada con una increíble vista hacia la selva.'},
            { src: 'img/balcon.jpg', text: 'Balcón con vista a la calle.'},
            { src: 'img/terraza.jpg', text: 'Terraza privada con acceso desde la habitación principal. Equipadas con sillas y mesa.'},
             { src: 'video/KOOM.mp4', text: 'Todo lo que puedes desear dentro de un penthouse'}
          ],
          bookingLink: 'https://reserva.koom-tulum.com/departamento/penthouse-1'
        },
       
      ],
      servicesData: {
        'auto': {
          key: 'auto',
          title: 'Automóvil Incluido',
          image: 'img/Automovil.webp',
          description: 'Te ofrecemos un auto sin límite de kilometraje para que te muevas con libertad durante tu estancia',
          gallery: [
            { src: 'img/Desayuno.webp', text: 'Empieza tu día con energía. Disfruta de un desayuno continental fresco preparado cada mañana con ingredientes locales y fruta de temporada.' },
            { src: 'img/InstalacionesEquipadas.webp', text: 'Siéntete como en casa. Cocina completa con utensilios, refrigerador, estufa, cafetera y todo lo necesario para cocinar tus platillos favoritos.' }
          ]
        },
        'desayuno': {
          key: 'desayuno',
          title: 'Desayuno Diario',
          image: 'img/Desayuno.webp',
          description: 'Empieza tu día con energía. Disfruta de un desayuno continental fresco preparado cada mañana con ingredientes locales y fruta de temporada.',
          gallery: [
            { src: 'img/Automovil.webp', text: 'Olvídate de rentar auto. Tu reserva incluye un Toyota Avanza similar para que recorras Tulum y la Riviera Maya con total libertad. Seguro básico incluido.' },
            { src: 'img/InstalacionesEquipadas.webp', text: 'Siéntete como en casa. Cocina completa con utensilios, refrigerador, estufa, cafetera y todo lo necesario para cocinar tus platillos favoritos.' }
          ]
        },
        'equipado': {
          key: 'equipado',
          title: 'Departamento Equipado',
          image: 'img/InstalacionesEquipadas.webp',
          description: 'Siéntete como en casa. Cocina completa con utensilios, refrigerador, estufa, cafetera y todo lo necesario para cocinar tus platillos favoritos.',
          gallery: [
            { src: 'img/Automovil.webp', text: 'Olvídate de rentar auto. Tu reserva incluye un Toyota Avanza similar para que recorras Tulum y la Riviera Maya con total libertad. Seguro básico incluido.' },
            { src: 'img/Desayuno.webp', text: 'Empieza tu día con energía. Disfruta de un desayuno continental fresco preparado cada mañana con ingredientes locales y fruta de temporada.' },
          ]
        }
      }
    },
    en: {
      ui: {
        titulo_principal: "Our Apartments",
        subtitulo: "Find the perfect space for your stay",
        modal_amenidades: "Amenities",
        modal_precio_incluye: "Price includes:",
        modal_noches: "7 Night Stay",
        serv_auto: "Car Rental",
        serv_desayuno: "Breakfast",
        serv_depa: "Fully Equipped Apt",
        btn_baja: "Low Season",
        btn_alta: "High Season",
        btn_reservar: "BOOK NOW",
        titulo_servicios: "INCLUDED SERVICES",
        btn_volver: "BACK TO APARTMENTS"
      },
      apartments: [
        {
          id: 'D1',
          title: 'Apartment D1',
          imageSrc: 'img/Departamento1.webp',
          rooms: 2, people: 4, size: 85, price: 2750,
          description: 'o Master bedroom: Large room with closet, air conditioning and Mayan Stone applications. Direct access to the pool and sun terrace. The apartment has one extra bedroom.',
          amenities: [
            'Enjoy two heated pools: Main heated pool located on ground floor for all guests to enjoy',
            'Plunge pool on the Rooftop with amazing jungle views.',
            'One full bathroom with black marble applications. Rain shower.',
            'Stocked with personal care products such as toilet paper, shampoo and soap.',
            'Fully equipped kitchen and dining bar. Complete set of pans and basic food supplies.',
            'Living room equipped with television and a sofa.'
          ],
          gallery: [
            { src: 'img/baño3.webp', text: 'One full bathroom with black marble applications. Rain shower. Stocked with personal care products such as toilet paper, shampoo and soap.' },
            { src: 'img/1_Cocina_estancia_D1.jpg', text: 'Fully equipped kitchen with a granite countertop.' },
            { src: 'video/KOOM.mp4', text: 'Fully equipped kitchen and dining bar. Complete set of pans and basic food supplies. Living room equipped with television and a sofa.'}

          ],
          bookingLink: 'https://reserva.koom-tulum.com/departamento/departamento-1'
        },
        {
          id: 'D2',
          title: 'Apartment D2',
          imageSrc: 'img/Departamento2.webp',
          rooms: 2, people: 4, size: 90, price: 3100,
          description: 'Main Room: Large room with closet, air conditioning and Mayan Stone applications. Direct access to the pool and sun terrace. The apartment has one extra bedroom.',
          amenities: [
            'Two full bathrooms with black marble applications. Rain shower.',
            'Stocked with personal care products such as toilet paper, shampoo and soap.',
            'Fully equipped kitchen and dining bar.',
            'Complete set of pans and basic food supplies.',
            'Living room equipped with television and double-sized sofa-bed.'
          ],
          gallery: [
            { src: 'img/baño2.jpg', text: 'Two full bathrooms with black marble applications. Rain shower. Stocked with personal care products such as toilet paper, shampoo and soap.' },
            { src: 'img/cocina2.jpeg', text: 'Fully equipped kitchen and dining bar. Complete set of pans and basic food supplies. Living room equipped with television and double-sized sofa-bed.' },
             { src: 'video/KOOM.mp4', text: 'Todo lo que puedes desear dentro de un penthouse'}
          ],
          bookingLink: 'https://reserva.koom-tulum.com/departamento/departamento-2'
        },
        {
          id: 'D3',
          title: 'Apartment D3',
          imageSrc: 'img/habitacion3.webp',
          rooms: 3, people: 6, size: 95, price: 3600,
          description: 'Main Room: Large room with jungle view, closet, air conditioning and Mayan Stone applications. Direct access to the private terrace. The apartment has one extra bedroom',
          amenities: [
            'Two full bathrooms with black marble applications. Rain shower.',
            'Stocked with personal care products such as toilet paper, shampoo and soap.',
            'Fully equipped kitchen and dining bar.',
            'Complete set of pans and basic food supplies.',
            'Living room equipped with television and double-sized sofa-bed. Balcony access.',
            'Balcony: Balcony with jacuzzi. Terrace: Private terrace with access from the master bedroom, equipped with chairs.'
          ],
          gallery: [
            { src: 'img/baño3.webp', text: 'Two full bathrooms with black marble applications. Rain shower. Stocked with personal care products such as toilet paper, shampoo and soap.' },
            { src: 'img/cocina3.png', text: 'Fully equipped kitchen and dining bar. Complete set of pans and basic food supplies. Living room equipped with television and double-sized sofa-bed. Balcony access.' },
            { src: 'img/balcon.jpg', text: 'Balcony with jacuzzi.' },
            { src: 'img/terraza.webp', text: 'Private terrace with access from the master bedroom, equipped with chairs.' },
            { src: 'video/KOOM.mp4', text: 'Enjoy your own getaway in nature: observe, explore, and relax within our facilities, featuring a pool and a beautiful jungle view.'}
          ],
          bookingLink: 'https://reserva.koom-tulum.com/departamento/departamento-3'
        },
        {
          id: 'D4',
          title: 'Apartment D4',
          imageSrc: 'img/habitacion4.webp',
          rooms: 3, people: 6, size: 95, price: 3600,
          description: 'o Master bedroom: Large room with jungle view, closet, air conditioning and Mayan Stone applications. Access to private terrace. The apartment has one extra bedroom.',
          amenities: [
            'Two full bathrooms with black marble applications. Rain shower.',
            'Stocked with personal care products such as toilet paper, shampoo and soap.',
            'Fully equipped kitchen and dining bar.',
            'Complete set of pans and basic food supplies.',
            'Living room equipped with television and double sofa bed.',
            'Access to balcony.',
            'Balcony: Balcony with jacuzzi.',
            'Private terrace with access from the master bedroom, equipped with chairs and table'
          ],
          gallery: [
            { src: 'img/baño4.webp', text: 'Two full bathrooms with black marble applications. Rain shower. Stocked with personal care products such as toilet paper, shampoo and soap.' },
            { src: 'img/cocina2.jpeg', text: 'Fully equipped kitchen and dining bar. Complete set of pans and basic food supplies. Living room equipped with television and double sofa bed. Access to balcony. Balcony: Balcony with jacuzzi.' },
            { src: 'img/jacuzzi4.webp', text: 'Balcony with jacuzzi.' },
            { src: 'img/terraza.jpg', text: 'Private terrace with access from the master bedroom, equipped with chairs and table' },
            { src: 'video/KOOM.mp4', text: 'Enjoy your own getaway in nature: observe, explore, and relax within our facilities, featuring a pool and a beautiful jungle view.'}
          ],
          bookingLink: 'https://reserva.koom-tulum.com/departamento/departamento-4'
        },
        {
        
          id: 'D5',
          title: 'Penthouse D1',
          imageSrc: 'img/hab5.webp',
          rooms: 3, people: 6, size: 95, price: 3600,
          description: 'o Master bedroom: Large room with closet, air conditioning and Maya Stone applications. Access to private terrace.',
          amenities: [
            'Two comfortable bedrooms with double-sized beds and air conditioning.',
            'One bedroom is located on the second floor, it has direct access to the second room, dining bar, grill, plunge pool and full bathroom.',
            'Three full bathrooms with black marble applications. Rain shower. Stocked with personal care products such as toilet paper, shampoo and soap.',
            'Fully equipped kitchen and dining bar. Complete set of pans and basic food supplies.',
            'Living room on the first floor with access to a balcony, equipped with television and double sofa bed.',
            'Second living room on the upper floor with access to plunge pool and jungle view.'
          ],
          gallery: [
            { src: 'img/hab5.webp', text: 'Two comfortable bedrooms with double-sized beds and air conditioning. One bedroom is located on the second floor, it has direct access to the second room, dining bar, grill, plunge pool and full bathroom.' },
            { src: 'img/baño5.webp', text: 'Three full bathrooms with black marble applications. Rain shower. Stocked with personal care products such as toilet paper, shampoo and soap.' },
            { src: 'img/cocina.jpg', text: 'Fully equipped kitchen and dining bar. Complete set of pans and basic food supplies.' },
            { src: 'img/estancia.jpg', text: 'Living room on the first floor with access to a balcony, equipped with television and double sofa bed. Second living room on the upper floor with access to plunge pool and jungle view.' },
            { src: 'img/segundoPiso.jpg', text: 'o Second floor: Second floor equipped with private plunge pool overlooking the jungle, sun terrace and grill.' },
              { src: 'img/balcon.jpg', text: 'o Balcony: Balcony overlooking the street.' },
            { src: 'img/terraza.mp4', text: 'Private terrace with access from the main room. Equipped with chairs and table.'},
             { src: 'video/KOOM.mp4', text: 'Todo lo que puedes desear dentro de un penthouse'}
          ],
          bookingLink: 'https://reserva.koom-tulum.com/departamento/penthouse-1'
        },
        
      ],
      servicesData: {
        'auto': {
          key: 'auto',
          title: 'Car Rental Included',
          image: 'img/Automovil.webp',
          description: 'We offer you a car with no mileage limit so you can move freely during your stay.',
          gallery: [
            { src: 'img/Desayuno.webp', text: 'Start your day with energy. Enjoy a fresh continental breakfast prepared every morning with local ingredients and seasonal fruit.' },
            { src: 'img/InstalacionesEquipadas.webp', text: 'Feel at home. A fully equipped kitchen with utensils, refrigerator, stove, coffee maker, and everything you need to cook your favorite dishes.' }
          ]
        },
        'desayuno': {
          key: 'desayuno',
          title: 'Daily Breakfast',
          image: 'img/Desayuno.webp',
          description: 'Start your day with energy. Enjoy a fresh continental breakfast prepared every morning with local ingredients and seasonal fruit.',
          gallery: [
            { src: 'img/Automovil.webp', text: 'Forget about renting a car. Your reservation includes a Toyota Avanza or a similar vehicle. Basic insurance included.' },
            { src: 'img/InstalacionesEquipadas.webp', text: 'Feel at home. A fully equipped kitchen.' }
          ]
        },
        'equipado': {
          key: 'equipado',
          title: 'Fully Equipped Apartment',
          image: 'img/InstalacionesEquipadas.webp',
          description: 'Feel at home. A fully equipped kitchen with utensils, refrigerator, stove, coffee maker, and everything you need to cook your favorite dishes.',
          gallery: [
            { src: 'img/Automovil.webp', text: 'Forget about renting a car. Toyota Avanza included.' },
            { src: 'img/Desayuno.webp', text: 'Start your day with energy. Fresh continental breakfast.' },
          ]
        }
      }
    }
  };

  // 3. SEÑALES COMPUTADAS (La magia de Angular)
  // Siempre devuelven el dato correcto según el idioma actual
  ui = computed(() => this.db[this.translation.currentLang()].ui);
  apartments = computed(() => this.db[this.translation.currentLang()].apartments);
  servicesData = computed(() => this.db[this.translation.currentLang()].servicesData);


  // --- MÉTODOS VISUALES (Selección y Modales) ---

  selectApartment(apt: Apartment): void {
    this.selectedApartment = apt;
    this.currentAptImage = apt.imageSrc;
    this.currentAptText = apt.description;
    this.viewMode = 'details';
  }

  selectAptGalleryItem(item: GalleryItem) {
    this.currentAptImage = item.src;
    this.currentAptText = item.text;
  }

  resetAptMain() {
    if (this.selectedApartment) {
      this.currentAptImage = this.selectedApartment.imageSrc;
      this.currentAptText = this.selectedApartment.description;
    }
  }

  openServiceDetail(serviceKey: string) {
    // Cast 'as any' o 'Record<string, ServiceDetail>' para evitar error de índice en TS
    const services = this.servicesData() as Record<string, ServiceDetail>;
    
    if (services[serviceKey]) {
      this.selectedService = services[serviceKey];
      this.currentServiceImage = this.selectedService.image;
      this.currentServiceText = this.selectedService.description;
      this.viewMode = 'service';
    }
  }

  selectGalleryItem(item: GalleryItem) {
    this.currentServiceImage = item.src;
    this.currentServiceText = item.text;
  }

  resetToMain() {
    if (this.selectedService) {
      this.currentServiceImage = this.selectedService.image;
      this.currentServiceText = this.selectedService.description;
    }
  }

  backToApartment() {
    this.viewMode = 'details';
    this.selectedService = null;
    this.currentServiceImage = '';
    this.currentServiceText = '';
  }

  closeModal() {
    this.selectedApartment = null;
    this.viewMode = 'details';
    this.selectedService = null;
    this.currentAptImage = '';
    this.currentAptText = '';
    this.currentServiceImage = '';
    this.currentServiceText = '';
  }
}