import {Http, Response} from '@angular/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import {Coupon} from '../models/coupon.model';
import {AuthService} from './auth.service';

export class CouponService {

	private serverUrl = environment.serverUrl + 'coupon';
	private error: string = '';

	private coupon: Coupon;
	couponChanged: Subject<Coupon>;

	constructor(private http: Http,
							private authService: AuthService,
							private router: Router) {
		this.couponChanged = new Subject();
	}

	public createCoupon(coupon: Coupon) {
		return this.http.post(this.serverUrl, coupon)
			.map((response: Response) => {
				return response.status === 201;
			})
			.catch(error => {
				if (error.status === 401) {
					return Observable.throw('CouponExists');
				}
			});
	}

	public getCoupon(id) {
		return this.http.get(this.serverUrl)
			.toPromise()
			.then((response: any) => {
				return response._body as Coupon;
			})
			.catch(error => {
				return error;
			});
	}

	public updateCoupon(coupon: Coupon) {
		return this.http.put(this.serverUrl, coupon, this.authService.jwt())
			.toPromise()
			.then((response: Response) => {
				return response;
			})
			.catch(error => {
				return error;
			});
	}

	public deleteCoupon(coupon: Coupon) {
		return this.http.delete(this.serverUrl, this.authService.jwt())
			.toPromise()
			.then((response: Response) => {
				return response;
			})
			.catch(error => {
				return error;
			});
	}
}
