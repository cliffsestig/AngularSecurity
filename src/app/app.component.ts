import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	defaultLang = 'nl-NL';

	constructor(private translate: TranslateService) {
		if (localStorage.currentLang) {
			translate.setDefaultLang(localStorage.currentLang);
		} else {
			localStorage.currentLang = this.defaultLang;
			translate.setDefaultLang(this.defaultLang);
		}
	}
}
