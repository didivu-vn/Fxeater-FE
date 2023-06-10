import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { ApiService, UserService } from 'src/app/service';
import { BasePage, IMetaData, IUserInfo } from 'src/app/shared/interface';

const metaData: IMetaData = {
  breadcrumb: [
    {
      name: 'My Page',
      url: '/mypage'
    },
    {
      name: 'Profile',
    }
  ],
  layout:{
    title: 'My Profile',
    subtitle: 'Manage your resource.'
  },
  page: {
    title: `FXeater | My Profile`,
    description: 'Manage your resource.'
  }
}

@Component({
  selector: 'app-all-info',
  templateUrl: './all-info.component.html',
  styleUrls: ['./all-info.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AllInfoComponent,
      multi: true
    }
  ]
})
export class AllInfoComponent extends BasePage {

  formUser: FormGroup
  userInfo: IUserInfo = {
    avatar:'',
    gender:'N',
    id:0,
  }

  // set up subscribe first
  userInfo$ =  this.userService.userInfoStorage.pipe(
    tap(data => {
      this.userInfo = data
      this.userInfo.base_user && this.formUser.setValue({
        'username':this.userInfo.base_user.username,
        'email':this.userInfo.base_user.email,
        'gender':this.userInfo.gender,
      })
    })
  )

  protected override metaData: IMetaData = metaData;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private userService:UserService,
  ) {
    super()
    this.formUser = this.formBuilder.group({
      'username': [null],
      'email': [null, [Validators.email,Validators.required]],
      'gender': [null],
    });
  }

  onSubmit(){
    const requestURL = `v1/me/${this.userInfo?.id}/`

    const formData = {
      gender:this.formUser.value.gender,
      base_user:{
        email:this.formUser.value.email,
        username:this.formUser.value.username
      }
    }

    this.apiService.patchDataWithUrl(requestURL,formData)
    .subscribe(
      result => this.userService.userInfoStorage.next(result),
      error => console.log(error)
    )
  }

  onTouch() { }

  writeValue(obj: any): void {
    obj && this.formUser.setValue(obj, { emitEvent: false });
  }
  registerOnChange(fn: any): void {
    this.formUser.valueChanges.subscribe(fn);
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.formUser.disabled : this.formUser.enabled;
  }

}

