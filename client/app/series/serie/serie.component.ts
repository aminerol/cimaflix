import { Component, OnInit, Input, Inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SerieService } from "./serie.service";
import { Category } from "../../models/categorie";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs/Rx";
import { Meta, Title, DOCUMENT } from "@angular/platform-browser";
import { LinkService } from "../../link.service";

@Component({
  selector: "app-serie",
  templateUrl: "./serie.component.html",
  styleUrls: ["./serie.component.css"]
})
export class SerieComponent implements OnInit {
  @Input("data") serie: any;
  series: any[] = [];
  categorie: Category;
  seasons: any[] = [];
  tags: String;

  constructor(
    @Inject(DOCUMENT) private document: any,
    private _route: ActivatedRoute,
    private _serieService: SerieService,
    private _meta: Meta,
    private _title: Title,
    private linkService: LinkService,
    private router: Router
  ) {}

  ngOnInit() {
    this._route.paramMap.subscribe(param => {
      var serieslug = param.get("serieslug");
      var catslug = param.get("catslug");
      this.categorie = environment.categories.find(cat => cat.slug == catslug);

      let url = document.location.protocol + "//" + document.location.hostname;

      this._meta.updateTag(
        { property: "og:url", content: url + this.router.url },
        `property='og:url'`
      );
      this.linkService.updateTag({
        rel: "canonical",
        href: url + this.router.url
      });

      this._serieService
        .getSerieInfo(serieslug, this.categorie.catId)
        .subscribe(data => {
          this.serie = data.items[0];
          let title =
            "CimaFlix | شاهد مسلسلات اونلاين بدون تقطيع | مسلسل " +
            this.serie.title +
            "";
          this.tags = environment.serietags.replace(
            /{{serie.title}}/g,
            this.serie.title
          );

          this._title.setTitle(title);
          this._meta.updateTag(
            { name: "keywords", content: this.tags.toString() },
            `name='keywords'`
          );
          this._meta.updateTag(
            { property: "og:title", content: title },
            `property='og:title'`
          );
          this._meta.updateTag(
            { property: "og:type", content: "article" },
            `property='og:type'`
          );

          Observable.forkJoin(
            this._serieService.getReleatedSeries(this.categorie.catId),
            this._serieService.getSerieSeasons(this.serie._id)
          ).subscribe(data => {
            this.series = data[0].items;
            this.seasons = data[1].items;
          });
        });
    });
  }
}
