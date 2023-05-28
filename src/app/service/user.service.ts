import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, of, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { IUserInfo } from '../shared/interface/common.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userInfoStorage:BehaviorSubject<IUserInfo> = new BehaviorSubject({} as IUserInfo)
  isHasUserInfo$: BehaviorSubject<any> = new BehaviorSubject(false)
  isHasUserInfo = false

  constructor(
    private authService: AuthService,
    private httpClient: HttpClient,
  ) { }

  update_userInfo(info:IUserInfo){
    this.userInfoStorage.next(info)
  }

  updateUserStorage(){
    this.authService.checkAndGetNewToken()

    if(Boolean(this.authService.getUser().access)){
      this.httpClient.get<IUserInfo>(this.authService.handShakeUrl).subscribe(
        data => {
          this.userInfoStorage.next(data),
          this.isHasUserInfo$.next(true)
          this.isHasUserInfo = true
        }
      )
      return
    }

    // console.log('updateUserStorage -- no info')
    this.userInfoStorage.next({} as IUserInfo)
    this.isHasUserInfo$.next(false)
    this.isHasUserInfo = false
  }
}
