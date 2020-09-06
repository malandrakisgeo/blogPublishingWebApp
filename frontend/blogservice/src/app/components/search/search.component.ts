import { Component, OnInit } from '@angular/core';
import {ElasticSearchService} from "../../services/elastic-search.service";
import {of} from "rxjs";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private elasticSearchService: ElasticSearchService) { }

  ngOnInit(): void {
  }

  search($event) {
    let term = $event.target.value;
    if (term === '') {
      return of([]);
    }

    return this.elasticSearchService
      .fullTextSearch('index', 'post','title', term);

    /*return this.http
      .get(WIKI_URL, {params: PARAMS.set('search', term)}).pipe(
        map(response => response[1])
      );*/
  }

}
