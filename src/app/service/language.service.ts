import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DEFAULT_LANG, SUPPORT_LANG } from '../util';

export const USER_LANG = 'fx-lang';
type LANG = 'en' | 'ja' | 'es' | 'cn'
interface ILang {
  lang: LANG
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  
  langArray: Array<LANG> = SUPPORT_LANG as LANG[];

  targetStorage: typeof sessionStorage | typeof localStorage = localStorage
  lang$: BehaviorSubject<ILang> = new BehaviorSubject({lang:DEFAULT_LANG} as ILang)
  constructor() {
    this.lang$.next({
      lang: this.getLangFromStorage()
    })
  }

  getLangFromStorage () {
    const localLang =  localStorage.getItem(USER_LANG) as LANG
    return localLang
  }

  setLangToStorage (inLang: LANG) {
    const targetLang = this.langArray.includes(inLang) 
      ? inLang
      : DEFAULT_LANG

    this.targetStorage.setItem(USER_LANG, targetLang)
    this.lang$.next({
      lang: inLang
    })
  }
}
