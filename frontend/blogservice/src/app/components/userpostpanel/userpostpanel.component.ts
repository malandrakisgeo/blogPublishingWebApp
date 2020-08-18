import {Component, OnInit, Optional} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {ChangeEvent} from "@ckeditor/ckeditor5-angular";
import {PostService} from "../../services/post.service";
import * as uuid from 'uuid';
import {Post} from "../../models/post";
import {AuthService} from "../../auth/auth.service";
import {environment} from "../../../environments/environment";
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
  public defLocation = environment.projUrl;
  public posts = [] ;

  private htmltext;
  private newPostWritten: boolean = false;
  private newPostId: uuid = uuid.v4();
  private newPost: Post = new Post();
  private isDirty = false;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private postService: PostService,
              private auth: AuthService) {


  }

  ngOnInit(): void {
    /*
      This is exactly where the user is redirected after a successful login.
      The backend sends a request with the token and the profile id.
      The AuthService makes sure that those are kept and used across the components,
      and prevents a user from accessing another's panel.
 */

    //This ought to be promisified,
    //and the lines below it should not be run only if the verifyLogIn is
    // completed AND returns true, or something similar
    this.auth.verifyLogIn(
      this.activatedRoute.snapshot.queryParamMap.get('userToken'),
      this.activatedRoute.snapshot.queryParamMap.get('prof'),
      this.activatedRoute.snapshot.queryParamMap.get('nickName')
    )
    localStorage.setItem(this.router.url, "userPanelLink")

    this.postService.getPosts(localStorage.getItem('userId')).subscribe(x => {
      this.posts.push(x)
    });


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
        this.handleStatusChanges(editor, document.querySelector('#saveData'));

        this.handleSaveButton(editor);
        this.handlePostButton(editor);
      }
    );

    this.newPost.postuuid = this.newPostId;
    this.newPost.userId = localStorage.getItem('userId');
    this.newPost.version=0;

  }


  public save(editor) {
    this.htmltext = this.Editor.getData();
    console.log(this.htmltext);
  }


  public handleSaveButton(editor) {
    const pendingActions = editor.plugins.get('PendingActions');
    const saveButton = document.querySelector('#saveData');

    saveButton.addEventListener('click', evt => {
      const data = editor.getData();
      const action = pendingActions.add('Saving changes');
      this.newPostWritten = true;
      evt.preventDefault();

      setTimeout(() => {
        this.newPost.data = data;
        this.newPost.title = document.getElementById('title').innerText;
        this.postService.savePost(this.newPost, false);
        pendingActions.remove(action);
        this.updateStatus(editor, saveButton)
      }, 250);
    });
  }


  public handlePostButton(editor) {
    const pendingActions = editor.plugins.get('PendingActions');
    const publishButton = document.querySelector('#publish');

    publishButton.addEventListener('click', evt => {
      const data = editor.getData();
      const action = pendingActions.add('Publishing');
      this.newPostWritten = true;
      evt.preventDefault();

      setTimeout(() => {
        this.newPost.data = data;
        this.postService.savePost(this.newPost, true);
        pendingActions.remove(action);
        this.updateStatus(editor, publishButton)
        window.location.href = environment.projUrl+this.newPostId;
      }, 250);


      ////////////REDIRECT!!!!


    });
  }

  public handleStatusChanges(editor, button) {
    editor.plugins.get('PendingActions').on('change:hasAny', () => this.updateStatus(editor, button));
    editor.model.document.on('change:data', () => {
      this.isDirty = true;
      this.updateStatus(editor, button);
    });
  }


  public updateStatus(editor, button) {
    // Disables the  button when the data on the server is up to date.
    if (this.isDirty) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }

    // Shows the spinner animation.
    if (editor.plugins.get('PendingActions').hasAny) {
      button.classList.add('saving');
    } else {
      button.classList.remove('saving');
    }
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
