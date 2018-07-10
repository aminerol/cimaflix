import { Component, OnInit, Input, Inject } from "@angular/core";
import { Meta, Title, DOCUMENT } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { ISerie } from "../../../../server/models/series";
import { CategorieService } from "./categorie.service";
import { environment } from "../../../environments/environment";
import { Category } from "../../models/categorie";
import { LinkService } from "../../link.service";

@Component({
  selector: "",
  templateUrl: "./categorie.component.html",
  styleUrls: ["./categorie.component.css"]
})
export class CategorieComponent implements OnInit {
  categorie: Category;
  currentpage: number = 1;
  total: number;
  @Input("data") series: ISerie[] = [];

  constructor(
    private route: ActivatedRoute,
    private _categorieService: CategorieService,
    private _meta: Meta,
    private _title: Title,
    private linkService: LinkService,
    private router: Router,
    @Inject(DOCUMENT) private document: any
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(param => {
      this.categorie = environment.categories.find(
        cat => cat.slug == param.get("slug")
      );

      let url = document.location.protocol + "//" + document.location.hostname;
      let title = 'CimaFlix | شاهد مسلسلات اونلاين بدون تقطيع | '+this.categorie.name+'';
      this._title.setTitle(title);
      this._meta.updateTag(
        { property: "og:title", content: title },
        `property='og:title'`
      );
      this._meta.updateTag(
        { property: "og:type", content: "article" },
        `property='og:type'`
      );
      this._meta.updateTag(
        { property: "og:url", content: url + this.router.url },
        `property='og:url'`
      );
      this.linkService.updateTag({ rel: "canonical", href: url + this.router.url });

      this.getPage(1, this.categorie.catId);
    });
  }

  getPage(page: number, catid: Number) {
    this._categorieService.getSerieOfCategorie(page, catid).subscribe(data => {
      this.total = data.total;
      this.series = data.items;
      this.currentpage = page;
    });
  }
}
