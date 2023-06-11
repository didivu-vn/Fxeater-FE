import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/service';
import { LayoutService } from 'src/app/service/layout.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  isCollapsed = false;
  breadcrumb$ = this.layoutService.getBreadcrumbData()
  header$ = this.layoutService.getHeaderData()
  isHandset$ = this.layoutService.getIsHandset()

  isLoggedIn: boolean = false
  isShowLoginModal = false

  isLoading = false
  isLoginFailed = false
  errorMessage = ''

  userInfo$ = this.userService.userInfoStorage.pipe(
    tap(data => {
      if (data && Object.keys(data).length !== 0){
        this.isLoggedIn = true
      }
    })
  )

  validateForm!: UntypedFormGroup;

  constructor( 
    private layoutService: LayoutService,
    private userService: UserService,
    private authService: AuthService,
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
  ) {}    

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });

    this.route.queryParams.pipe(
      tap(data => {
        if ('lg' in data && !this.isLoggedIn ){
            this.isShowLoginModal = data['lg'] === '1'
        }
      })
    ).subscribe()
  }

  onBack(in_data = '/') {
    console.log('onBack to -- ', in_data);
  }

  submitForm(): void {
    this.isLoading = true
    this.isLoginFailed = false
    const { username, password } = this.validateForm.value;

    this.authService.login(username, password).pipe(
      tap(data => {
        this.authService.saveUser(data);
        this.userService.updateUserStorage()
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.isLoading = false;
        this.isShowLoginModal = false;
      })
    )
    .subscribe({
      error: err => {
        console.log(err)
        this.errorMessage = err.error.detail;
        this.isLoginFailed = true;
        this.isLoading = false;
      },
    });
  }
}
