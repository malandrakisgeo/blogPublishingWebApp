import {Injectable} from '@angular/core';
import {Post} from "../models/post";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private findPostUrl: string;
  private saveToDbUrl: string;
  private post: Post;

  constructor(private http: HttpClient) {
    this.findPostUrl = 'http://localhost:4200/verify'
  }


  //creates new or modifies existing post
  savePost(data, post: Post) {
    this.checkIfExists(post);

  }


  fetchPost() {

  }

  fetchPostsOfUser() {

  }

  fetchPostsByKeyword() {

  }

  private checkIfExists(post): Observable<Post> {
    const httpReq = {
      headers: {
        'Content-Type': 'application/json',
      },
      params: post
    };

    return this.http.get<Post>(this.findPostUrl, httpReq);
  }

}
