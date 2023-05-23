import { Injectable } from "@angular/core";
import slugify from 'slugify';

@Injectable({
    providedIn: 'root'
})
export class SlugService {

    getSlug(str: string){
        return slugify(str, {locale: 'vi'}).toLowerCase()
    }

}