import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import * as jwt_decode from 'jwt-decode';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from '../models/user.model';


@Injectable()
export class AuthService {

	private serverUrl = environment.serverUrl;
	private responseToken;
	statChanged = new BehaviorSubject<string>(this.responseToken);
	statChanges = this.statChanged.asObservable();

	constructor(private http: Http) {
	}

	public login(email: string, password: string): Observable<boolean> {
		return this.http.post(this.serverUrl + 'auth/login', {email: email, password: password})
			.map((response: Response) => {

				// login successful if there's a jwt token in the response
				 this.responseToken = response.json().token;
				if (this.responseToken) {
					this.setToken(this.responseToken);

					// return true to indicate successful login
					this.statChanged.next(this.responseToken);
					return true;
				} else {
					// return false to indicate failed login
					return false;
				}
			});
	}

	public isAuthenticated(): boolean {
		if (this.getToken()) {
			const expiresAt = this.getTokenExpirationDate(this.getToken());
			return new Date().getTime() < expiresAt.getTime();
		} else {
			return false;
		}
		
	}

	public getUserId(): string {
		if (this.getToken()) {
			const decoded = jwt_decode(this.getToken());
			if (decoded.userId === undefined) {
				return null;
			}
			return decoded.userId;
		}
	}

	public isAdmin() {
		if (this.getToken()) {
			const decoded = jwt_decode(this.getToken());
			if (decoded.userId === undefined) {
				return null;
			}
			return decoded.admin;
		}
	}

	public jwt() {
		if (this.getToken()) {
			const headers = new Headers();
			const token = {access_token: this.getToken()};
			headers.set('Authorization', 'Bearer ' + token.access_token);
			return new RequestOptions({headers: headers});
		}
	}

	private setToken(token: string) {
		localStorage.setItem('jwt_token', token);
	}

	private getToken(): string {
		return localStorage.getItem('jwt_token');
	}

	private getTokenExpirationDate(token: string): Date {
		const decoded = jwt_decode(token);

		if (decoded.iat === undefined) {
			return null;
		}

		const date = new Date();
		date.setUTCSeconds(decoded.iat);
		return date;
	}

	public logout(): void {
		localStorage.removeItem('jwt_token');
		this.statChanged.next(null);
		this.responseToken = null;

	}
}
