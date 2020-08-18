import * as uuid from 'uuid';
import {Account} from "./account";

export interface PostI{
  postuuid: uuid;
  data: any;
  title: any;
  userId: Account;
  version: number;
  published: Boolean;
  datePublished: any;
  dateLastModified: any;
  associatedSession: any;
}

export class Post {

 /* constructor(data: PostI){
    this.postuuid = data.postuuid;
    this.data = data.data;
    this.version = data.version;
  };*/

  //To ensure that unknown values are ignored.
  static fromJSON(json) {
    const post: Post = new Post();
    post.postuuid = json.postuuid;
    post.data = json.data;
    post.version = json.version;
    post.title = json.title;
    return post;
  }


  postuuid: uuid;
  data: any;
  title: string;
  //userId: Account;
  userId: String;
  version: number;
  published: Boolean;
  datePublished: any;
  dateLastModified: any;
  associatedSession: any;
}
