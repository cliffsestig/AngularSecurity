import { Component} from '@angular/core';
import { Router, Params } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    template: `{{ 'auth.be_patient' | translate }}`,
    selector: 'app-user-logout'
})
export class UserLogoutComponent {

    constructor(private authService: AuthService, private router: Router) {
        if (this.authService.isAuthenticated()) {
            this.authService.logout();
        }

        this.router.navigate(['home']);
    }
}