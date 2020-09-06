import {Injectable} from '@angular/core';
import {Client} from 'elasticsearch-browser';
import * as elasticsearch from 'elasticsearch-browser';
import {Post} from "../models/post";

@Injectable({
  providedIn: 'root'
})
export class ElasticSearchService {
  private client: Client;

  constructor() {
    if (!this.client) {
      this._connect();
    }
  }

  public addToIndex(value): any {
    return this.client.create(value);
  }

  private removeFromIndex(value): any {
    return this.client.delete({index: 'index', type:'post',  id: value});
  }

  public removeFromIndexMultiple(values: Post[]): any {
    values.forEach(value => {
      this.removeFromIndex(value.postuuid);
    })


  }

  public fullTextSearch(_index, _type, _field, _queryText): [] {
    return this.client.search({
      index: _index,
      type: _type,
      //filterPath: ['hits.hits._source', 'hits.total', '_scroll_id'],
      body: {
        'query': {
          'match_phrase_prefix': {
            title: _queryText,
          }
        }
      },
      // response for each document with only 'fullname' and 'address' fields
      '_source': ['title']
    });
  }

  private connect() {
    this.client = new Client({
      host: 'http://localhost:9200',
      log: 'trace'
    });
  }

  private _connect() {
    this.client = new elasticsearch.Client({
      host: 'localhost:9200',
      log: 'trace'
    });
  }

  isAvailable(): any {
    return this.client.ping({
      requestTimeout: Infinity,
      body: 'hello grokonez!'
    });
  }

}
