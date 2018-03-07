import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';

@Component({
	selector: 'app-home-page',
	templateUrl: './home-page.component.html',
	styleUrls: ['./home-page.component.css']
})
@Injectable()
export class HomePageComponent implements OnInit, OnDestroy {

	_id: string;

	constructor() {
	}

	ngOnInit() {
		document.body.className += 'home';
	}

	ngOnDestroy() {
		document.body.classList.remove('home');
	}
}
