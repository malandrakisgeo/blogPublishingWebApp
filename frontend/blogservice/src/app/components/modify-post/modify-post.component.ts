import {Component, OnInit} from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {ActivatedRoute, Router} from "@angular/router";
import {PostService} from "../../services/post.service";
import {Post} from "../../models/post";
import {Observable} from "rxjs";
import {applySourceSpanToExpressionIfNeeded} from "@angular/compiler/src/output/output_ast";
import {ChangeEvent} from "@ckeditor/ckeditor5-angular";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-modify-post',
  templateUrl: './modify-post.component.html',
  styleUrls: ['./modify-post.component.css']
})
export class ModifyPostComponent implements OnInit {
  private post: Post;
  public exp = '<p>dfd</p>';
  private isDirty = false;
  private uuid;
  private version;
  public published;
  public versions;
  private versionnum;
  public defLocation = environment.projUrl;

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

    this.postService.fetchPostt(this.uuid,
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
        this.postService.savePost(this.post, false);
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


}
