import { Injectable } from "@angular/core";
import slugify from 'slugify';
import { IBlogData } from "../shared/interface";

@Injectable({
    providedIn: 'root'
})
export class SlugService {

    getSlug(str: string){
        return slugify(str, {locale: 'vi'}).toLowerCase()
    }

    gerateBlogUrl(blogData: IBlogData){
        return '/blog/'+ blogData.id+'-'+ this.getSlug(blogData.name)
    }

}