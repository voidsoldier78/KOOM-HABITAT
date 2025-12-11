import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
declare var M: any;

interface SpaceSlide {
  imageSrc: string;
  title: string;
  subtitle: string;
  linkText: string;
}

@Component({
  selector: 'app-space-carousel',
  standalone: false,
  templateUrl: './space-carousel.html',
  styleUrl: './space-carousel.css',
})
export class SpaceCarousel implements AfterViewInit {

  @ViewChild('materializeCarousel') carouselElement: ElementRef | undefined;
  
  private carouselInstance: any;

  slides: SpaceSlide[] = [
    {
      imageSrc: 'img/alberca-nocturna.jpg', // Ruta en /public/img/
      title: 'Alberca Planta Baja',
      subtitle: 'Espacio de relajación con vista a la naturaleza',
      linkText: 'Ver más'
    }/*
    {
      imageSrc: '/img/habitacion-koom.jpg',
      title: 'Habitación Principal',
      subtitle: 'Diseño y confort en cada rincón',
      linkText: 'Ver más'
    },
    {
      imageSrc: '/img/Fachada.jpg', 
      title: 'Fachada',
      subtitle: 'Una bienvenida excepcional',
      linkText: 'Ver más'
    }*/
  ];

  constructor() { }

  ngAfterViewInit(): void {
    if (this.carouselElement) {
      const options = {
        fullWidth: true, 
        indicators: true ,
        duration: 50
      };

      this.carouselInstance = M.Carousel.init(this.carouselElement.nativeElement);
      console.log('Opciones del carrusel:', this.carouselInstance.options);
    }
  }

  public prevSlide(): void {
    if (this.carouselInstance) {
      this.carouselInstance.prev();
    }
  }

  public nextSlide(): void {
    if (this.carouselInstance) {
      this.carouselInstance.next();
    }
  }

}
