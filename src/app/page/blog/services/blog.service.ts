import { Injectable } from "@angular/core";
import { TNewBlogData } from "../interfaces/blog.interface";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";


@Injectable({
    providedIn: 'root'
})
export class BlogService{

    apiUrl:string =  environment.apiUrl
    header = new HttpHeaders({'Content-Type':'multipart/form-data'})
    constructor(
      private http:HttpClient
    ) { }

    postImg(data:any){
        const formData = new FormData();
    
        formData.append('display_name', 'testing');
        formData.append('img_file', data);
        
        return this.http.post<any>(`${this.apiUrl}/v1/api-img/`,formData)
      }
    
      postBlog(data:TNewBlogData){
        
        const formData = new FormData();
        formData.append('name',data.name)
        formData.append('sub_title',data.sub_title)
        formData.append('description',data.description)
        formData.append('html_string',data.html_string)
        formData.append('thumbnail_image',data.thumbnail_image)
        data.series && formData.append('series', data.series.toString())
        return this.http.post<any>(`${this.apiUrl}/v1/api-blog/`,formData)
      }
    
      getBlog(id:number){
        return this.http.get<any>(`${this.apiUrl}/v1/api-blog/${id}/`)
      }
    
      putBlog(data:TNewBlogData, id:number){
        
        const formData = new FormData();
        formData.append('name',data.name)
        formData.append('sub_title',data.sub_title)
        formData.append('description',data.description)
        formData.append('html_string',data.html_string)
        data.thumbnail_image && formData.append('thumbnail_image',data.thumbnail_image)
        data.series && formData.append('series', data.series.toString())
        return this.http.put<any>(`${this.apiUrl}/v1/api-blog/${id}/`,formData)
      }
}