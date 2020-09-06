import {Component, OnInit} from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {ActivatedRoute, Router} from "@angular/router";
import {PostService} from "../../services/post.service";
import {Post} from "../../models/post";


              /*
                If the user is authenticated, this page will display an editor with
                the most recent version of the post, and a list of the previous versions below.
                Every time the user "saves" a post, a new version is added.
              */

@Component({
  selector: 'app-modify-post',
  templateUrl: './modify-post.component.html',
  styleUrls: ['./modify-post.component.css']
})
export class ModifyPostComponent implements OnInit {
  private post: Post;
  private isDirty = false;
  private uuid;
  private version;
  private versionnum;

  public published;
  public versions;
  private editorr;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private postService: PostService) {
    this.uuid = this.activatedRoute.snapshot.params.postuuid;
    this.version = this.activatedRoute.snapshot.params.version;

  }

  ngOnInit(): void {

    this.postService.getVersions(this.uuid).subscribe(x => {
      this.versionnum = x;
      this.versions = Array(x.valueOf()).fill(0).map((x, i) => i);
    });
    this.postService.fetchPostForModification(this.uuid,
      localStorage.getItem('userId')).subscribe(data => {
      this.post = data;
      this.createEditor();
    });
  }

  public createEditor() {

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
        this.published = this.post.published;
        editor.setData(this.post.data);
        this.updatePost(editor);
        this.publishPost(editor);
        this.editorr = editor;
      }
    );
  }

  public updatePost(editor) {
    const pendingActions = editor.plugins.get('PendingActions');
    const saveButton = document.querySelector('#saveData');

    saveButton.addEventListener('click', evt => {
      const data = editor.getData();
      const action = pendingActions.add('Saving changes');
      evt.preventDefault();

      setTimeout(() => {
        this.post.userId = localStorage.getItem('userId');
        this.post.data = data;
        this.post.version += 1;
        this.postService.savePost(this.post, this.post.published);
        pendingActions.remove(action);
        this.updateStatus(editor)
      }, 250);
    });

  }

  public updateStatus(editor) {
    const saveButton = document.querySelector('#saveData');
    if (this.isDirty) {
      saveButton.classList.add('active');
    } else {
      saveButton.classList.remove('active');
    }
    if (editor.plugins.get('PendingActions').hasAny) {
      saveButton.classList.add('saving');
    } else {
      saveButton.classList.remove('saving');
    }
  }

  public publishPost(editor) {
    const pendingActions = editor.plugins.get('PendingActions');
    const publishButton = document.querySelector('#publish');

    publishButton.addEventListener('click', evt => {
      const data = editor.getData();
      const action = pendingActions.add('Saving changes');
      evt.preventDefault();

      setTimeout(() => {
        this.post.userId = localStorage.getItem('userId');
        this.post.data = data;
        this.postService.savePost(this.post, true);
        pendingActions.remove(action);
        this.updateStatus(editor)
      }, 250);
    });

  }

  public getVersion($event) {

    $event.preventDefault(); //do not redirect!
    let postVersion = $event.target.id;
    this.postService.fetchVersionOfPost(this.uuid,
      localStorage.getItem('userId'), postVersion).subscribe(data => {
      this.post = data;
      this.editorr.setData(this.post.data);
    });

  }


}
