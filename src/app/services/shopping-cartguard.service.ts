import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable()
export class ShoppingCartGuard implements CanActivate {
	constructor(private authService: AuthService, private router: Router) {
	}

	public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot, ) {
		const isAdmin = this.authService.isAuthenticated();

		if (!isAdmin) {
			this.router.navigate(['user/login'], {queryParams: {url1: 'shoppingcart', url2: 'checkout'}});
		}

		return isAdmin;
	}
}
