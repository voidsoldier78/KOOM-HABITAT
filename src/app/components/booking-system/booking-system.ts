import { Component, ElementRef, ViewChild, AfterViewInit  } from '@angular/core';
import flatpickr from 'flatpickr';

@Component({
  selector: 'app-booking-system',
  standalone: false,
  templateUrl: './booking-system.html',
  styleUrl: './booking-system.css',
})
export class BookingSystem implements AfterViewInit {
  // Conectamos con el input del HTML usando #datePickerInput
  @ViewChild('datePickerInput') datePickerInput!: ElementRef;
  
  huespedes: string = '2'; // Valor por defecto
  flatpickrInstance: any;

  constructor() { }

  ngAfterViewInit(): void {
    // Configuramos el calendario manualmente
    this.flatpickrInstance = flatpickr(this.datePickerInput.nativeElement, {
      mode: 'range',           // Permite seleccionar rango de fechas
      dateFormat: 'Y-m-d',     // Formato para la lógica
      altInput: true,          // Muestra un input más bonito
      altFormat: 'j F, Y',     // Formato visual (ej: 12 Octubre, 2023)
      minDate: 'today',        // No permite fechas pasadas
    });
  }

  // Función para abrir el calendario al dar clic en el icono
  openCalendar() {
    this.flatpickrInstance.open();
  }
}
