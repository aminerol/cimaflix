import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SerieService } from "../series/serie/serie.service";
import { Serie } from "../models/serie";
import { environment } from "../../environments/environment";

@Component({
  selector: "",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"]
})
export class SearchComponent implements OnInit {

  query = "";
  currentpage: Number = 1;
  total: number;
  @Input('data') series: Serie[] = [];

  constructor(private _route: ActivatedRoute, private _serieService: SerieService) {}

  ngOnInit() {
    this._route.paramMap.subscribe(param =>
    {
      this.query = param.get('query');
      this.getPage(this.query, 1);
    });
  }

  getPage(query: String, page: Number) {
    this._serieService.searchSeries(query, page).subscribe(
      data => {
        this.total = data.total;
        this.series = data.items;
        this.currentpage = page;
        this.series.forEach(se => {
          se.catSlug = environment.categories.find(cat => cat.catId == se.type).slug;
        });
      }
    )
  }
}
