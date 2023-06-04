import { Component, OnInit } from '@angular/core';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill'
import { ApiService } from 'src/app/service';

import Quill from 'quill';
import { VideoHandler, ImageHandler, Options } from 'ngx-quill-upload';
import BlotFormatter from 'quill-blot-formatter';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TITLE_LIST } from 'src/app/utils';
import { Message } from 'primeng/api';
import { map, tap } from 'rxjs';

Quill.register('modules/imageHandler', ImageHandler);
Quill.register('modules/videoHandler', VideoHandler);
Quill.register('modules/blotFormatter', BlotFormatter);

@Component({
  selector: 'app-new-blog',
  templateUrl: './new-blog.component.html',
  styleUrls: ['./new-blog.component.css']
})
export class NewBlogComponent implements OnInit {

  isPreviewContent = false
  currentDate = new Date();

  seriesUrl = 'v1/api-series/'
  seriesData$ = this.apiService.getDataWithUrl(this.seriesUrl).pipe(
    map(data => data.results),
    tap(data => console.log(data)),
  )
  

  form: any = {
    title: '',
    sub_title: '',
    description: '',
    series: null,
  }

  isFormError = false
  formErrorMsg  = [{ severity: 'error', summary: 'Error', detail: 'Các mục cần thiết chưa được điền đủ.' }] as Message[]

  blurred = false
  focused = false
  htmlstring = ''
  file: File | null = null; // Variable to store file
  modules: any
  thumbnailFile: File | null = null;



  constructor(
    private apiService:ApiService,
    private router:Router,
    private titleService: Title
  ) { 
    this.titleService.setTitle(TITLE_LIST.NEW_BLOG)
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
    };
  }

  changedEditor(event: EditorChangeContent | EditorChangeSelection) {
    // tslint:disable-next-line:no-console
    // console.log('editor-change', event)
    if ('html' in event){
      event.html && (this.htmlstring = event.html)
      // console.log(event)
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
    if (!this.form.title || !this.htmlstring || !this.thumbnailFile){
      this.isFormError = true
      return
    }

    this.form.html_string = this.htmlstring
    this.form.name = this.form.title
    this.form.thumbnail_image = this.thumbnailFile

    this.apiService.postBlog(this.form).subscribe(
      data => {
        this.router.navigateByUrl(`/blog/${data.id}`)
      },
      error => console.log(error)
    )
  }

  cancelForm(){
    console.log('handle delete uploaded file before cancel')
    this.router.navigateByUrl("/blog/overview")
  }

  selectedSeries(value:any){
    this.form.series = value
  }

}
