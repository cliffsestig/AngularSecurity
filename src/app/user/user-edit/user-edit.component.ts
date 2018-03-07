import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import {TranslateService} from '@ngx-translate/core';


import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent {

  userForm: FormGroup;
  error = '';

  constructor(private userService: UserService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['home']);
    }

    this.initForm();
  }

  private initForm() {

    this.userForm = new FormGroup({
      'email': new FormControl({value: '', disabled: true}, [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      'firstName': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required),
      'address': new FormControl('', Validators.required),
      'city': new FormControl('', Validators.required),
      'province': new FormControl('', Validators.required),
      'postalCode': new FormControl('', Validators.required),
      'country': new FormControl('', Validators.required)
    });

    this.userService.getUser(this.authService.getUserId()).then((user) => {
      user = JSON.parse(user);

      this.userForm.setValue({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        city: user.city,
        province: user.province,
        postalCode: user.postalCode,
        country: user.country
      });
    });
  }

  onEditUser(element) {
    element.setAttribute("disabled", "disabled");

    this.userService.updateUser(this.userForm.value)
      .then(() => {
        element.removeAttribute("disabled");
      });
  }
}