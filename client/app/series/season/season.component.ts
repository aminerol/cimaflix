import { Component, OnInit, Inject } from "@angular/core";
import { Category } from "../../models/categorie";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "../../../environments/environment";
import { SerieService } from "../serie/serie.service";
import { Observable } from "rxjs/Observable";
import { DOCUMENT, Meta, Title } from "@angular/platform-browser";
import { LinkService } from "../../link.service";

@Component({
  selector: "",
  templateUrl: "./season.component.html",
  styleUrls: ["./season.component.css"]
})
export class SeasonComponent implements OnInit {
  categorie: Category;
  serie: any;
  season: any;
  seasons: any[] = [];
  episodes: any[] = [];
  tags: String;

  serieslug: any;
  catslug: any;
  seasonslug: any;

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
      this.serieslug = param.get("serieslug");
      this.catslug = param.get("catslug");
      this.seasonslug = param.get("seasonslug");

      this.categorie = environment.categories.find(
        cat => cat.slug == this.catslug
      );

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
        .getSerieInfo(this.serieslug, this.categorie.catId)
        .subscribe(data => {
          this.serie = data.items[0];

          this._serieService.getSerieSeasons(this.serie._id).subscribe(data => {
            this.seasons = data.items;
            this.season = this.seasons.find(se => se.slug == this.seasonslug);
            this.tags = environment.seasontags
              .replace(/{{serie.title}}/g, this.serie.title)
              .replace(/{{season.number}}/g, this.season.number);

            let title =
              "CimaFlix | شاهد مسلسل " +
              this.serie.title +
              " الموسم " +
              this.season.number +
              " اونلاين بدون تقطيع";
            this._title.setTitle(title);

            let description = environment.description.replace(
              /{{description}}/g,
              `مسلسل ${this.serie.title} الموسم ${this.season.number}`
            );
            this._meta.updateTag(
              { name: "description", content: description },
              `name='description'`
            );
            this._meta.updateTag(
              { property: "og:description", content: description },
              `property='og:description'`
            );

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

            this._serieService
              .getSerieEpisodes(this.season._id)
              .subscribe(data => {
                this.episodes = data.items;
              });
          });
        });
    });
  }
}
