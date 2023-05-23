import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl:string =  environment.apiUrl
  header = new HttpHeaders({'Content-Type':'multipart/form-data'})
  constructor(
    private http:HttpClient
  ) { }

  getDataWithUrl(requestUrlPath:string, header:any = '') {   
    const baseUrl = `${this.apiUrl}/${requestUrlPath}`
    if (!header){
      return this.http.get<any>(baseUrl)
    }
    
    return this.http.get<any>(baseUrl,{headers:header})
  } 

  patchDataWithUrl(requestUrlPath:string,data:any) {   
    const baseUrl = `${this.apiUrl}/${requestUrlPath}`
    return this.http.patch<any>(baseUrl,data)
  } 

  putDataWithUrl(requestUrlPath:string,data:any) {   
    const baseUrl = `${this.apiUrl}/${requestUrlPath}`
    return this.http.put<any>(baseUrl,data)
  } 

  postDataWithUrl(requestUrlPath:string,data:any) {   
    const baseUrl = `${this.apiUrl}/${requestUrlPath}`
    return this.http.post<any>(baseUrl,data)
  } 

  deleteDataWithUrl(requestUrlPath:string) {   
    const baseUrl = `${this.apiUrl}/${requestUrlPath}`
    return this.http.delete<any>(baseUrl)
  } 

  postImg(data:any){
    const formData = new FormData();
    formData.append('display_name', 'testing');
    formData.append('img_file', data);
    return this.http.post<any>(`${this.apiUrl}/v1/api-img/`,formData)
  }
}
