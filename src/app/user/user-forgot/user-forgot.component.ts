import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule , FormsModule} from '@angular/forms';
import { Http,Headers, RequestOptions } from "@angular/http";
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-user-forgot',
  templateUrl: './user-forgot.component.html',
  styleUrls: ['./user-forgot.component.css']
})
export class UserForgotComponent implements OnInit {

  forgotForm: FormGroup;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private http: Http) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.forgotForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
    });
  }

  onForgotPassword() { 
  	this.http.post(environment.serverUrl + 'auth/forgot', {"email": this.forgotForm.value.email})
            .toPromise()
            .then(response => {
              
            })
            .catch(error => {
                     
                }
            );
  }

}
