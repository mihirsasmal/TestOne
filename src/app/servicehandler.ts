import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
 
// const httpOptions = {
//     headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Basic '+ btoa(this.username+':'+this.password),'X-Atlassian-Token':'no-check'})
// };
 
const jiraRestEndPoint ="/jira/rest/api/2/";
@Injectable()
export class ServiceHandler {
 
    public username:string; password : string;
    constructor(private http:HttpClient) {}
  public httpOptions;
    // Uses http.get() to load data from a single API endpoint
    getResult() {
    //     httpOptions.headers.append('Authorization', 'Basic '+ btoa('mihirsasmal:W3!com3mks'));
    //     httpOptions.headers.append('X-Atlassian-Token', 'no-check');
    //     httpOptions.headers.append('User-Agent', 'no-check');
    //     let header = new HttpHeaders({ 'Content-Type': 'application/json' });
    //     header.append('Authorization', 'Basic '+ btoa('mihirsasmal:W3!com3mks'));
    //     //return this.http.post("https://aumel-atlassian.leicabio.com:443/jira/rest/auth/1/session","",httpOptions);
    //     var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}};
    //    console.log(btoa('mihirsasmal:W3!com3mks'));
    //    console.log(Base64.encode('mihirsasmal : W3!com3mks'));
    //     return this.http.get("https://aumel-atlassian.leicabio.com:443/jira/rest/api/2/search?jql=Sprint=\"Automation Sprint 17\" AND status not in (Rejected,Complete,Verified)", httpOptions);
    }

    searchJql(url:string,jql :string) {
        this.httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Basic '+ btoa(this.username+':'+this.password),'X-Atlassian-Token':'no-check'})
        };
        // if (url.startsWith("https"))
        // url = url+':443/';
        // else
        // url = url+':80/';
        // console.log(url.startsWith("https"));
        // console.log(url);
        let jqlendpoint = url+jiraRestEndPoint+"search?jql="+jql;
        // console.log(jqlendpoint);
        // console.log(this.username);
        // console.log(this.password);
        // console.log(btoa('mihirsasmal:W3!com3mks'));
        // console.log(btoa('this.username : this.password'));
        // console.log(btoa(this.username+':'+this.password));
              return this.http.get(jqlendpoint, this.httpOptions);
    }

    // convertToBase64(){
    //     encodedbase64 = btoa(this.username+':'+this.password);
    // }
}