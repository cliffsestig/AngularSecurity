import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule , FormsModule} from '@angular/forms';

import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

	userForm: FormGroup;
  error = '';

  constructor(private userService: UserService,
              private authService: AuthService,
  						private router: Router) { }

  ngOnInit() {
  	if (this.authService.isAuthenticated()) {
      this.router.navigate(['home']);
    }

    this.initForm();
  }

  private initForm() {
  	this.userForm = new FormGroup({
  		'email': new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])),
  		'firstName': new FormControl('', Validators.required),
  		'lastName': new FormControl('', Validators.required),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
  		'address': new FormControl(''),
  		'city': new FormControl(''),
  		'province': new FormControl(''),
  		'postalCode': new FormControl(''),
  		'country': new FormControl('')
  	});
  }

  onRegister() {
  	this.userService.createUser(this.userForm.value)
      .subscribe(result => {
        if (result) {
          this.authService.login(this.userForm.value.email, this.userForm.value.password)
            .subscribe(result => {
              this.router.navigate(['home']);
            }, (error) => {
              this.error = 'Er is een fout met de server. Probeer het later opnieuw';
            });
        } else {
          this.error = 'Gebruiker met deze email bestaat al';
        }
      }, (error) => {
        if (error === 'UserExists') {
          this.error = 'Gebruiker met deze email bestaat al';
        } else {
          this.error = 'Er is een fout met de server. Probeer het later opnieuw';
        }
      });
  }
}