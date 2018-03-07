import {Component} from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
	selector: 'app-mobile-menu',
	templateUrl: './mobile-menu.component.html',
	styleUrls: ['./mobile-menu.component.css']
})
export class MobileMenuComponent {

	private menu;

	constructor(private router: Router) {}

	ngOnInit() {
		this.router.events.subscribe(event => {
			if(event instanceof NavigationStart) {

				// Close mobile menu
				document.getElementById('mobile-menu-container').classList.remove('open');
				// Close mobile menu button
				document.getElementById('nav-icon').classList.remove('open');
				// Close mobile menu list items
				if (this.menu !== undefined) {
					const menuDropdownItems = this.menu.querySelectorAll('li.has-dropdown');
					for (let i = 0; i < menuDropdownItems.length; i++) {
						menuDropdownItems[i].querySelector('ul').classList.remove('open');
					}
				}
			}
		});
	}

	toggle(element) {
		element.classList.toggle('open');
		document.getElementById('mobile-menu-container').classList.toggle('open');
		
		if (this.menu === undefined) {
			this.menu = document.getElementById('mobile-menu');
			const menuDropdownItems = this.menu.querySelectorAll('li.has-dropdown');
			
			for (let i = 0; i < menuDropdownItems.length; i++) {
				menuDropdownItems[i].querySelector('ul').classList.remove('open');
				menuDropdownItems[i].onclick = () => {
					menuDropdownItems[i].querySelector('ul').classList.toggle('open');
				}
			}
		}
	}
}
