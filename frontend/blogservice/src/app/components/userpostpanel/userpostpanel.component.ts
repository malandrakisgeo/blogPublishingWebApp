import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {ChangeEvent} from "@ckeditor/ckeditor5-angular";
import {PostService} from "../../services/post.service";
import * as uuid from 'uuid';
import {Post} from "../../models/post";
//import {ChangeEvent} from "@ckeditor/ckeditor5-angular";
//import {UploadAdapter} from "./imageupload.class";
//import {ClassicEditorClass} from "./classicEditor.class";

@Component({
  selector: 'app-userpostpanel',
  templateUrl: './userpostpanel.component.html',
  styleUrls: ['./userpostpanel.component.css']
})

export class UserpostpanelComponent implements OnInit {

  public Editor;
  private htmltext;
  private newPostWritten: boolean = false;
  private newPostId: uuid = uuid.v4();
  private newPost: Post;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private postService: PostService) {
  }

  ngOnInit(): void {
    this.newPost.postuuid = this.newPostId;

    ClassicEditor
      .create(document.querySelector('#editorr'), {
        simpleUpload: {
          uploadUrl: 'http://localhost:3000/saveimg',

          headers: {
            'X-CSRF-TOKEN': 'CSFR-Token',
            'Access-Control-Allow-Origin': '*',
            Authorization: 'Bearer <JSON Web Token>'
          }
        }
      }).then(editor => {
        this.handleSaveButton(editor);
      }
    );

  }


  public save(editor) {
    this.htmltext = this.Editor.getData();
    console.log(this.htmltext);
  }


  public handleSaveButton(editor) {
    const saveButton = document.querySelector('#saveData');
    const pendingActions = editor.plugins.get('PendingActions');

    saveButton.addEventListener('click', evt => {
      const data = editor.getData();
      const action = pendingActions.add('Saving changes');
      this.newPostWritten = true;
      console.log(data);
      console.log(pendingActions.hasAny);
      evt.preventDefault();

      // Save the data to a fake HTTP server.
      setTimeout(() => {
        this.postService.savePost(data, this.newPost);
        pendingActions.remove(action);
      });
    });


  }


}


/*public onReady(eventData) {
  eventData.plugins.get('FileRepository').createUploadAdapter = function (loader) {
    console.log(btoa(loader.file));
    return new UploadAdapter(loader);
  };
  return null;
}*/


/* public onChange({editor}: ChangeEvent) {
   this.htmltext = editor.getData();
   console.log(this.htmltext);
 }*/
