import { Component } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

@Component({
    selector: 'app-language-toggle',
    standalone: false,
    templateUrl: './language-toggle.html',
    styleUrl: './language-toggle.css'
})
export class LanguageToggleComponent {
    constructor(public translationService: TranslationService) { }
}
