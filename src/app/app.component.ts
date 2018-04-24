
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
  listForm:FormGroup
  cardForm:FormGroup
  public story;
  public isDisplay = true;
  public isError = false;
  public error: string;
  public source = ["key","fields.summary"];
  public userstoryColorValue;subtaskColorValue;defectColorValue;
 public confirmed = [];
  public test =[{fields:{key:2}},{fields:{key:3}},{fields:{key:4}}]
  public attr(issue){
    return issue["fields"]["key"];
  }
  constructor(private _serviceHandler: ServiceHandler, private formBuilder: FormBuilder) {
    this.createForm();
    this.createListForm();
    this.createCardForm();
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
onAdd(){
  this.source.push(this.listForm.controls.addfield.value);
  this.listForm.reset();
}
onGenerate(){
  this.userstoryColorValue = this.cardForm.controls.userstoryColor.value;
  this.subtaskColorValue = this.cardForm.controls.subtaskColor.value;
  this.defectColorValue = this.cardForm.controls.defectColor.value;
 console.log(this.userstoryColorValue);
 console.log(this.subtaskColorValue);
 console.log(this.defectColorValue);
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
      ])],
      fieldname: ['', Validators.compose([
        Validators.required
      ])]
    })
  }

  createListForm() {
    this.listForm = this.formBuilder.group({
      addfield: ['',{}]
    })
  }

  createCardForm() {
    this.cardForm = this.formBuilder.group({
      userstoryColor: ['',{}],
      subtaskColor: ['',{}],
      defectColor: ['',{}]
    })
  }
  private errorMessage(err: any) {
    this.error = err.message as string;
    this.isDisplay = true;
    this.isError = true;
  }
}

