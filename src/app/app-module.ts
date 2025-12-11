import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { AparmentGallery } from './components/aparment-gallery/aparment-gallery';
import { BookingSystem } from './components/booking-system/booking-system';
import { Footer } from './components/footer/footer';
import { Hero } from './components/hero/hero';
import { Location } from './components/location/location';
import { Service } from './components/service/service';
import { SpaceCarousel } from './components/space-carousel/space-carousel';
import { Galeria } from './components/galeria/galeria';
import { LanguageToggleComponent } from './components/language-toggle/language-toggle';


@NgModule({
  declarations: [
    App,
    AparmentGallery,
    BookingSystem,
    Footer,
    Hero,
    Location,
    Service,
    SpaceCarousel,
    Galeria,
    LanguageToggleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection()
  ],
  bootstrap: [App , Hero, Galeria, AparmentGallery, Location, Service, Footer, SpaceCarousel, LanguageToggleComponent]
})
export class AppModule { }
