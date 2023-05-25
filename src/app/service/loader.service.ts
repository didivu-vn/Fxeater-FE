import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  isLoading = new Subject<boolean>();
  constructor() { }

  startLoader(){
    this.isLoading.next(true)
  }

  stopLoader(){
    this.isLoading.next(false)
  }

}