import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule , FormsModule} from '@angular/forms';
import { Http,Headers, RequestOptions } from "@angular/http";
import {environment} from '../../../environments/environment';

import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  userForm: FormGroup;
  error = '';
  url1: string;
  url2: string;
  captcha: boolean = false;

  private headers = new Headers({ 'Content-Type': 'application/json;'});
  private options = new RequestOptions({ headers: this.headers });

  constructor(private userService: UserService,
              private authService: AuthService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private http: Http) { }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['home']);
    }

      this.activatedRoute.queryParams.subscribe((params: Params) => {
        this.url1 = params['url1'];
        this.url2 = params['url2'];
      });

    this.initForm();
  }

  private initForm() {
    this.userForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  onLoginUser() {
    if (this.captcha) { 
 
      this.authService.login(this.userForm.value.email, this.userForm.value.password)
        .subscribe(result => {
          if (result === true) {
            if (this.url1 && this.url2) { 
              this.router.navigate([this.url1, this.url2]);
            } else if (this.url1) {
              this.router.navigate([this.url1])
            } else {
              this.router.navigate(['home']);
            }
          } else {
            this.error = 'Gebruikersnaam of wachtwoord is incorrect';
          }
        }, (error) => {
            this.error = 'Gebruikersnaam of wachtwoord is incorrect';
        });
             
    }
  }

  public handleCorrectCaptcha(event){
    var param = {"event" : event};

  this.http.post(environment.serverUrl + 'auth/captcha', param)
            .toPromise()
            .then(response => {
              this.captcha = response.json().success;
            })
            .catch(error => {
                     
                }
            );

  }
}