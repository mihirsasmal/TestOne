
import { Component,Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import {ServiceHandler} from './servicehandler';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
title = 'test';
loginForm : FormGroup
  public story;
  public isDisplay = true;
  constructor(private _serviceHandler: ServiceHandler,private formBuilder : FormBuilder) {
    this.createForm();
   }

  onFormSubmit(form )
  {
    this.isDisplay = false;
    this._serviceHandler.username = form.value.username;
    this._serviceHandler.password = form.value.password;
  
    this._serviceHandler.searchJql(form.value.url,form.value.jql).subscribe(
      data=> {this.story = data},
      err=>console.error(err)
    );    

  }

  onSubmit()
  {
    this.isDisplay = false;
    this._serviceHandler.username = this.loginForm.controls.username.value;
    this._serviceHandler.password = this.loginForm.controls.password.value;
  
    this._serviceHandler.searchJql(this.loginForm.controls.url.value,this.loginForm.controls.jql.value).subscribe(
      data=> {this.story = data},
      err=>console.error(err)
    );    

  }

  ngOnInit(){
   //  this.title == 'Jira Web Sprint Card Generator!Test';
   //this.getResults();
  }

  getResults(){
    this._serviceHandler.getResult().subscribe(
      data=> {this.story = data},
      err=>console.error(err),
      ()=>console.log('Loaded Results : '+ this.story.issues[0].self)
    );
  }

 
  
   createForm(){
     this.loginForm = this.formBuilder.group({
       url:['', Validators.compose([
            Validators.required, Validators.pattern("^(https?:\/\/).*")
       ])],
       username:['', Validators.compose([
        Validators.required
   ])],
   password:['', Validators.compose([
    Validators.required
])],
jql:['', Validators.compose([
 Validators.required
])]
     })

   }
}

