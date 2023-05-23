import { HttpClient, HttpBackend, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment'
import { CredentialResponse } from 'google-one-tap';

export const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAccessValidToken: boolean = false
  isRefreshValidToken: boolean = false  
  authStorage$:BehaviorSubject<any>
  targetStorage: typeof sessionStorage | typeof localStorage = localStorage

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private apiUrl:string =  environment.apiUrl
  private registerUrl: string = `${this.apiUrl}/v1/auth/register/`
  private loginUrl: string = `${this.apiUrl}/v1/auth/login/`
  private refreshUrl: string = `${this.apiUrl}/v1/auth/refresh/`
  private googleAuthUrl: string = `${this.apiUrl}/auth/google/`
  
  public handShakeUrl: string = `${this.apiUrl}/v1/me/`


  private httpBackEnd: HttpClient;  
  constructor(
    private httpBackendhandler: HttpBackend,
  ) { 
    this.httpBackEnd = new HttpClient(this.httpBackendhandler);
    this.targetStorage = localStorage 

    this.targetStorage 
      ? this.authStorage$ = new BehaviorSubject(JSON.parse(this.targetStorage.getItem(USER_KEY) || '{}')) 
      : this.authStorage$ = new BehaviorSubject({})

    this.authStorage$ = new BehaviorSubject({})

    this.checkAndGetNewToken()
  }

  register(username: string, email:string, password: string) {
    return this.httpBackEnd.post<any>(this.registerUrl,{username, email, password}, this.httpOptions)
  }

  login(email: string, password: string) {
    return this.httpBackEnd.post<any>(this.loginUrl, { email, password }, this.httpOptions)
  }

  registerAndLoginByGoogle(response: CredentialResponse){
    return this.httpBackEnd.post<any>(this.googleAuthUrl, { auth_token: response.credential}, this.httpOptions)
  }

  refresh(refresh: string) {
    return this.httpBackEnd.post<any>(this.refreshUrl, { refresh}, this.httpOptions)
  }

  logout() {
    // remove user from local storage to log user out
    this.clean()
  }

  clean(): void {
    this.targetStorage && this.targetStorage.removeItem(USER_KEY);
    this.authStorage$.next({})
  }

  isTokenExpired(token:string):boolean{
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) <= expiry
  }

  saveUser(user: any): void {
    if (this.targetStorage){
      this.targetStorage.removeItem(USER_KEY);
      this.targetStorage.setItem(USER_KEY, JSON.stringify(user));
      this.authStorage$.next(user)

      if(user?.refresh && user?.access){
        this.isAccessValidToken =  this.isTokenExpired(user.access)  
        this.isRefreshValidToken =  this.isTokenExpired(user.refresh)
      }
    }
  }

  getUser(): any {
    if (this.targetStorage){
      const user = this.targetStorage.getItem(USER_KEY);
      if (user) {
        this.authStorage$.next(JSON.parse(user))
        return JSON.parse(user);
      }
      return {};
    }
    return {}
  }

  updateToken(result:any){
    const user = this.getUser()
    const newUser = {
      'access':result.access,
      'refresh':user.refresh,
      'user':user.user
    }
    this.saveUser(newUser)
  }
 
  checkAndGetNewToken(){
    const user = this.getUser()
    // console.log(user)
    try{
      if(user?.refresh && user?.access){
        this.isAccessValidToken =  this.isTokenExpired(user.access)  
        this.isRefreshValidToken =  this.isTokenExpired(user.refresh)
      }
    }catch(e){
      console.log('checkAndGetNewToken -- ',e)
    }

    if(this.isAccessValidToken && this.isRefreshValidToken){
      return user
    }
    else if(!this.isRefreshValidToken){
      this.clean()
      return
    }      
    else if(!this.isAccessValidToken && this.isRefreshValidToken ){
      return this.updateToken(user)
    }
  }
}
