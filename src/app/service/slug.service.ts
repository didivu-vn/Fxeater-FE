import { Injectable } from "@angular/core";
import slugify from 'slugify';
import { IBlogData, IBlogSlugData } from "../shared/interface";

@Injectable({
    providedIn: 'root'
})
export class SlugService {

    getSlug(str: string){
        return slugify(str, {locale: 'vi'}).toLowerCase()
    }

    gerateBlogUrl(blogData: IBlogSlugData){
        return '/blog/'+ blogData.id+'-'+ this.getSlug(blogData.name)
    }

}