import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule , FormsModule} from '@angular/forms';
import { Http,Headers, RequestOptions } from "@angular/http";
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-user-reset',
  templateUrl: './user-reset.component.html',
  styleUrls: ['./user-reset.component.css']
})
export class UserResetComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private http: Http) { }
  private id : String;
  resetForm: FormGroup;

  ngOnInit() {
  	this.route.params
		.subscribe(
			(params: Params) => {
				this.id = params['id'];
			}
		);
		  this.initForm();
  }

    private initForm() {
	    this.resetForm = new FormGroup({
	     'password': new FormControl('', [Validators.required, Validators.minLength(6)])
	    });
	}

	onResetPassword() { 
  		this.http.post(environment.serverUrl + 'auth/reset', {"password": this.resetForm.value.password, "passwordReset": this.id})
            .toPromise()
            .then(response => {
              
            })
            .catch(error => {
                     
                }
            );
  }
}
