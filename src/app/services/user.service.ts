import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {User} from '../models/user.model';
import {AuthService} from './auth.service';

@Injectable()
export class UserService {

	private serverUrl = environment.serverUrl + 'user';

	private user: User;
	userChanged: Subject<User>;

	constructor(private http: Http,
							private authService: AuthService,
							private router: Router) {
		this.userChanged = new Subject();
	}

	public createUser(user: User) {
		return this.http.post(this.serverUrl, user)
			.map((response: Response) => {
				return response.status === 201;
			})
			.catch(error => {
				if (error.status === 401) {
					return Observable.throw('UserExists');
				}
			});
	}

	public getUser(id) {
		return this.http.get(this.serverUrl, this.authService.jwt()).toPromise()
			.then((response: any) => {
				return response._body as User;
			})
			.catch(error => {
				return error;
			});
	}

	public getAdmin() {
		return this.authService.isAdmin();
	}

	public updateUser(user: User) {
		return this.http.put(this.serverUrl, user, this.authService.jwt()).toPromise()
			.then((response: Response) => {
				return response;
			})
			.catch(error => {
				return error;
			});
	}
}
