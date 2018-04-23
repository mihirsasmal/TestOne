
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { ServiceHandler } from './servicehandler';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  loginForm: FormGroup
  public story;
  public isDisplay = true;
  public isError = false;
  public error: string;
  constructor(private _serviceHandler: ServiceHandler, private formBuilder: FormBuilder) {
    this.createForm();
  }

  onSubmit() {
    this.isDisplay = false;
    this.isError = false;
    this._serviceHandler.username = this.loginForm.controls.username.value;
    this._serviceHandler.password = this.loginForm.controls.password.value;

    this._serviceHandler.searchJql(this.loginForm.controls.url.value, this.loginForm.controls.jql.value).subscribe(
      data => { this.story = data },
      err => {
        this.errorMessage(err);
      }
    );
  }

  ngOnInit() {
  }
  createForm() {
    this.loginForm = this.formBuilder.group({
      url: ['', Validators.compose([
        Validators.required, Validators.pattern("^(https?:\/\/).*")
      ])],
      username: ['', Validators.compose([
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.required
      ])],
      jql: ['', Validators.compose([
        Validators.required
      ])]
    })
  }
  private errorMessage(err: any) {
    this.error = err.message as string;
    this.isDisplay = true;
    this.isError = true;
  }
}

