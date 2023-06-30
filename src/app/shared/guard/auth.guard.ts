import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from 'src/app/service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private userService: UserService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.checkCurrentUser()) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/'], { queryParams: { lg: 1 }});
        return false;
    }

    checkCurrentUser(){
        return this.userService.isHasUserInfo$.getValue()
    }
}