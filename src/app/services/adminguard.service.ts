import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {UserService} from './user.service';
import {AuthService} from './auth.service';

@Injectable()
export class AdminGuard implements CanActivate {
	constructor(private userService: UserService, private authService: AuthService) {
	}

	public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const isAuth = this.userService.getAdmin();
		return isAuth;
	}
}
