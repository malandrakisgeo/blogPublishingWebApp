import * as uuid from 'uuid';
import {Account} from "./account";


export class Post {
  postuuid: uuid;
  data: any;
  creator: Account;
  datePublished: any;
  dateLastModified: any;
}
