import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {PostService} from "../../services/post.service";
import * as uuid from 'uuid';
import {Post} from "../../models/post";
import {environment} from "../../../environments/environment";
import {ElasticSearchService} from "../../services/elastic-search.service";
import {AuthService} from "../../auth/auth.service";
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
  //public posts: Post[] = []; initial version with arrays.
  public posts =  new Set(); //Will not work if anything included in the Set is not a Post.

  private selectedPosts: Post[] = [];
  private newPostWritten: boolean = false;
  private newPostId: uuid = uuid.v4();
  private newPost: Post = new Post();
  private isDirty = false;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private postService: PostService,
              private auth: AuthService,
              private elasticSearchService: ElasticSearchService) {


  }

  ngOnInit(): void {

    this.loginVerification() //make sure that the credentials are genuine and valid
      .then(result => {
          if (result == true) { //if they are
            this.userPosts(); //fetch  lists of the posts by the user
            this.EditorCreator(); //and create an editor for him to make a new one
            this.newPost.postuuid = this.newPostId;
            this.newPost.userId = localStorage.getItem('userId');
            this.newPost.version = 0;
            localStorage.setItem('panelUrl', this.router.url);
          } else {
            window.location.href = environment.projUrl + '/login'; //else redirect to login page
          }
        }
      )
  }

  private loginVerification(): Promise<boolean> {
    return this.auth.verifyLogIn(
      this.activatedRoute.snapshot.queryParamMap.get('userToken'),
      this.activatedRoute.snapshot.queryParamMap.get('prof'),
      this.activatedRoute.snapshot.queryParamMap.get('nickName')
    )
  }

  private userPosts() {
    this.postService.getPosts(localStorage.getItem('userId')).subscribe(x => {
      x.forEach(post => {
        //this.posts.push(Post.fromJSON(post)); //array version
        this.posts.add(Post.fromJSON(post)); //Set version
      })

    });
  }

  private EditorCreator() {
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
        this.handleDeleteButton();
      }
    );

  }

  public selectPost(post, event: any) {
    if (this.selectedPosts.indexOf(post) !== -1) { //if selected
      this.selectedPosts.splice(this.selectedPosts.indexOf(post), 1);
    } else {
      this.selectedPosts.push(post);
    }
  }


  private handleDeleteButton() {
    const delButton = document.querySelector('#deleteButton');

    delButton.addEventListener('click', evt => {
      evt.preventDefault();
      setTimeout(() => {
        new Promise(() => {
          this.selectedPosts.forEach(selectedPost => {
            this.postService.deletePosts(this.selectedPosts, this.auth.user);
            this.elasticSearchService.removeFromIndexMultiple(this.selectedPosts);
            //this.posts.splice(this.selectedPosts.indexOf(selectedPost), 1);
            this.posts.delete(this.selectedPosts.indexOf(selectedPost));
          })
        }).then(() => {
          this.selectedPosts = [];
        });
      }, 250);
    });
  }

  private handleSaveButton(editor) {
    const pendingActions = editor.plugins.get('PendingActions');
    const saveButton = document.querySelector('#saveData');

    saveButton.addEventListener('click', evt => {
      const data = editor.getData();
      const action = pendingActions.add('Saving changes');
      this.newPostWritten = true;
      evt.preventDefault();

      setTimeout(() => {
        this.newPost.data = data;
        this.newPost.title = ((document.getElementById("title") as HTMLInputElement).value);
        this.postService.savePost(this.newPost, false);
        this.posts.add(this.newPost);
        pendingActions.remove(action);
        this.updateStatus(editor, saveButton)
      }, 250);
    });
  }


  private handlePostButton(editor) {
    const pendingActions = editor.plugins.get('PendingActions');
    const publishButton = document.querySelector('#publish');

    publishButton.addEventListener('click', evt => {
      const data = editor.getData();
      const action = pendingActions.add('Publishing');
      this.newPostWritten = true;
      evt.preventDefault();

      setTimeout(() => {
        this.newPost.data = data;
        this.newPost.title = ((document.getElementById("title") as HTMLInputElement).value);
        this.postService.savePost(this.newPost, true);
        pendingActions.remove(action);
        this.updateStatus(editor, publishButton)
        this.posts.add(this.newPost);

        this.addPostToIndex(this.newPost)
      .then(value => {
            console.log(value);
          });
      }, 250);


      ////////////REDIRECT!!!!


    });
  }

  private handleStatusChanges(editor, button) {
    editor.plugins.get('PendingActions').on('change:hasAny', () => this.updateStatus(editor, button));
    editor.model.document.on('change:data', () => {
      this.isDirty = true;
      this.updateStatus(editor, button);
    });
  }


  private updateStatus(editor, button) {
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

  private addPostToIndex(post: Post) {
    return new Promise<any>((resolve, reject) => {
      this.elasticSearchService.addToIndex({
        index: 'index',
        type: 'post',
        id: post.postuuid,
        body: {
          title: post.title,
          data: post.data
        }
      }).then((result) => {
        return resolve(result);
      }, error => {
        alert('The post could not be added to the search index. Make sure' +
          'that Elasticsearch is running in localhost:9200,' +
          ' and check the log for details.');
        return reject(error);
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
