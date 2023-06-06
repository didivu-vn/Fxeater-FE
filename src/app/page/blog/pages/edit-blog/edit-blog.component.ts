import { Component, OnInit } from '@angular/core';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill'
import { ApiService } from 'src/app/service';

import Quill from 'quill';
import { VideoHandler, ImageHandler, Options } from 'ngx-quill-upload';
import BlotFormatter from 'quill-blot-formatter';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { map, tap } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { END_POINT_URL_LIST } from 'src/app/util';
import { IBlogRelatedData } from '../../interfaces/blog-reply.interface';
import { BlogService } from '../../services/blog.service';

Quill.register('modules/imageHandler', ImageHandler);
Quill.register('modules/videoHandler', VideoHandler);
Quill.register('modules/blotFormatter', BlotFormatter);

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.scss']
})
export class EditBlogComponent implements OnInit {

  quillInitValue = ''
  htmlstring = ''

  isPreviewContent = false
  currentDate = new Date();

  seriesUrl = END_POINT_URL_LIST.BLOG_SERIES
  seriesData$ = this.apiService.getDataWithUrl(this.seriesUrl).pipe(
    map(data => data.results),
  )  

  form: any = {
    title: '',
    sub_title: '',
    description: '',
    thumbnail_image_url: '',
    series: null,
  }

  isFormError = false

  file: File | null = null; // Variable to store file
  modules: any
  thumbnailFile: File | null = null;

  blogId?:number
  blogData: any

  constructor(
    private apiService:ApiService,
    private blogService: BlogService,
    private router:Router,
    private route: ActivatedRoute,
    private titleService: Title
  ) { 
    this.titleService.setTitle('Edit blog')
  }

  ngOnInit(): void {
    this.modules = {
      blotFormatter: {
        // empty object for default behaviour.
      },
      toolbar: [
        [{ 'font': [] }],

        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'align': [] }],

        ['link','image'],

        ['clean'],                                         // remove formatting button

      ],
      imageHandler: {
        upload: (file) => {
         return new Promise((resolve, reject) =>{
          return this.apiService.postImg(file)
          .toPromise()
          .then(result => {
            resolve(result.img_file); 
           })
          .catch(error => {
            reject('Upload failed'); 
            // Handle error control
            console.error('Error:', error);
            })
         })
        },
        accepts: ['png', 'jpg', 'jpeg', 'jfif'] 
      } as Options
    }

    this.route.params.subscribe(
      data => {
        this.blogId = data['id'].split('-')[0]
        this.getBlogData(false)
      }
    )
  }

  changedEditor(event: EditorChangeContent | EditorChangeSelection) {
    if ('html' in event){
      event.html && (this.htmlstring = event.html)
    }
  }

  onFileChange(event:any,type:'thumbnail') {  
    if (event.target.files.length > 0) {

      if(type == 'thumbnail') {
        this.thumbnailFile = event.target.files[0];
        return
      }    
    }
  }

  sendForm(){
    // bad code here, sorry
    if (!this.form.title || !this.htmlstring){
      this.isFormError = true
      return
    }

    this.form.html_string = this.htmlstring
    this.form.name = this.form.title
    this.form.thumbnail_image = this.thumbnailFile

    if (Object.keys(this.form).length > 0 && this.blogId) {
      this.blogService.putBlog(this.form, this.blogId).subscribe(
        data => {
          this.router.navigateByUrl(`/blog/${this.blogId}`)
        },
        error => console.log(error)
      )
    } else {
      this.isFormError = true
    }
  }

  cancelForm(){
    console.log('handle delete uploaded file before cancel')
    this.router.navigateByUrl(`/blog/${this.blogId}`)
  }

  selectedSeries(value:any){
    this.form.series = value
  }

  updateHttmlString(htmlstring:string){
    this.htmlstring = htmlstring
  }

  getBlogData(is_no_cache = false){
    const header = new HttpHeaders({'x-refresh':'true'})
    let data$ = is_no_cache 
      ? this.apiService.getDataWithUrl(`${END_POINT_URL_LIST.BLOG}${this.blogId}/`,header) 
      : this.apiService.getDataWithUrl(`${END_POINT_URL_LIST.BLOG}${this.blogId}/`)

    data$.subscribe(
      (data:IBlogData) => {
        this.blogData = data
        this.updateDataToForm(data)
      }
    )
  }

  updateDataToForm(data:IBlogData){
    this.quillInitValue = data.html_string
    this.form.title = data.name
    this.form.sub_title = data.sub_title
    this.form.description = data.description
    this.form.thumbnail_image_url = data.thumbnail_image_url
    this.updateHttmlString(data.html_string)
  }
}

export interface Author_info {
	author_id: number;
	avatar: string;
}

export interface Author {
	user: string;
	avatar: string;
}

export interface Reply {
	content: string;
	created_at: string;
	author: Author;
}

export interface IBlogData {
	id: number;
	created_at: string;
	author: string;
	author_info: Author_info;
	related_blog: IBlogRelatedData[];
	thumbnail_image_url: string;
	description: string;
	html_string: string;
	name: string;
	sub_title: string;
	view_count: number;
	replies: Reply[];
}