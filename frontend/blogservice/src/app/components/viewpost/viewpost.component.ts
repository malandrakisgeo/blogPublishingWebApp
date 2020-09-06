import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PostService} from "../../services/post.service";
import {Post} from "../../models/post";

@Component({
  selector: 'app-viewpost',
  templateUrl: './viewpost.component.html',
  styleUrls: ['./viewpost.component.css']
})
export class ViewpostComponent implements OnInit {
  public post: Post;
  private uuid;


  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private postService: PostService) {
    this.uuid = this.activatedRoute.snapshot.params.postuuid;

  }

  ngOnInit(): void {
    this.postService.fetchPublicPost(this.uuid).subscribe(data => {
      this.post = data;
    });


  }

}
