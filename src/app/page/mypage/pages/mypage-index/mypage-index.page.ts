import { Component } from '@angular/core';
import { AuthService, UserService } from 'src/app/service';
import { BasePage, IMetaData, IUserInfo } from 'src/app/shared/interface';

const metaData: IMetaData = {
  breadcrumb: [
    {
      name: 'My Page',
      url: '/mypage'
    },
  ],
  layout:{
    title: 'My Page',
    subtitle: 'Manage your resource.'
  },
  page: {
    title: `FXeater | Mypage`,
    description: 'Manage your resource.'
  }
}

@Component({
  selector: 'app-mypage-index',
  templateUrl: './mypage-index.page.html',
  styleUrls: ['./mypage-index.page.css']
})
export class MypageIndexPage extends BasePage {

  protected override metaData: IMetaData = metaData

  constructor(
    private authService: AuthService,
    private userService: UserService
  ){
    super()
  }
  
  logOut(){
    this.authService.clean()
    this.userService.updateUserStorage()
    this.userService.userInfoStorage.next({} as IUserInfo)
  }

}
