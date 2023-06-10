import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { IUserInfo } from 'src/app/interface/user.interface';
import { ApiService, UserService } from 'src/app/service';
import {MatDialog} from '@angular/material/dialog';
import { GENDER_MAP, TITLE_LIST } from 'src/app/utils';
import { Title } from '@angular/platform-browser';
import { tap } from 'rxjs';

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
export class AllInfoComponent implements OnInit {

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

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private userService:UserService,
    public dialog: MatDialog,
    private titleService: Title
  ) {

    this.titleService.setTitle(TITLE_LIST.ME_INFO)

    this.formUser = this.formBuilder.group({
      'username': [null],
      'email': [null, [Validators.email,Validators.required]],
      'gender': [null],
    });
   }

  ngOnInit(): void { }

  openDialog() {
    const dialogRef = this.dialog.open(DialogUploadAvatarDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
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


@Component({
  selector: 'dialog-upload-avatar',
  templateUrl: 'dialog-upload-avatar.html',
})
export class DialogUploadAvatarDialog {  
  file: File | null = null; // Variable to store file

  constructor(
    private apiService:ApiService,
    private userService:UserService
  ){}

  onFileChange(event:any) {  
    if (event.target.files.length > 0) {
      console.log('update file')
      this.file = event.target.files[0];
    }
  }

  onSubmit(){
    const userInfo = this.userService.userInfoStorage.value
    const requestURL = `v1/me/${userInfo?.id}/`
    const formData = new FormData();   
    this.file &&  formData.append('avatar',this.file)    
    this.apiService.patchDataWithUrl(requestURL,formData).subscribe(
      result => this.userService.update_userInfo(result),
      err => console.log(err)
    )
  }  
}