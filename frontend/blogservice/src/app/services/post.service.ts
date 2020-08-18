import {Injectable} from '@angular/core';
import {Post} from "../models/post";
import {PostI} from "../models/post";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private findPostUrl: string;
  private getPostUrl: string;
  private getVersionsUrl: string;
  private post: Post;
  private getPostsOfUser: string;

  constructor(private http: HttpClient) {
    this.findPostUrl = 'http://localhost:3000/verify/';
    this.getPostUrl = 'http://localhost:3000/getPost/';
    this.getVersionsUrl = 'http://localhost:3000/getVersions/';
    this.getPostsOfUser = 'http://localhost:3000/getPostsOfUser/'
  }


  //creates new or modifies existing post
  public savePost(post: Post, publish: Boolean) {

    if (publish) {
      post.published = true;
      post.datePublished = new Date();
    } else {
      post.published = false;
      post.datePublished = null;
    }

    const httpReq = {
      headers: {
        'Content-Type': 'application/json',
      }, post
    };
    return this.http.post<Boolean>(this.findPostUrl, httpReq)
      .subscribe(
        (response) => {
          console.log('response received')
        });


  }


  public fetchPost(uuid): Observable<Post> {
    return this.http.get<Post>(this.getPostUrl + uuid);

  }

  public fetchPostt(uuid: String, userId: String): Observable<Post> {
    return this.http.get(this.getPostUrl + uuid + '/' + userId).pipe(
      map(data => {
        if (!data) {
          throw new Error('Non-existing post, or belonging to another user');
        } else {
          return Post.fromJSON(data)
        }
      })
    );

  }

  public getVersions(uuid: String): Observable<Number> {
    return this.http.get(this.getVersionsUrl + uuid).pipe(map(data=>{
      return Number(data.toString())}
    ));
  }

  public getPosts(uuid: String): Observable<Post[]> {
    return this.http.get<Post[]>(this.getPostsOfUser + uuid);
  }

  fetchPostsOfUser() {

  }

  fetchPostsByKeyword() {

  }

}
