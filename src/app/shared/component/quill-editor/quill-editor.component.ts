import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import Quill from 'quill';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill'
import { ImageHandler, Options } from 'ngx-quill-upload';
import BlotFormatter from 'quill-blot-formatter';
import { ApiService } from 'src/app/service';
Quill.register('modules/imageHandler', ImageHandler);
Quill.register('modules/blotFormatter', BlotFormatter);

@Component({
  selector: 'app-quill-editor',
  templateUrl: './quill-editor.component.html',
  styleUrls: ['./quill-editor.component.scss']
})
export class QuillEditorComponent implements OnInit {

  quillModules: any

  @Input() inHtmlString = ''
  @Output() htmlstring = new EventEmitter<string>();

  constructor(
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.initQuill()
  }
  initQuill(){
    this.quillModules = {
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
      event.html && (
        this.htmlstring.emit(event.html)
      )
    }
  }
}
