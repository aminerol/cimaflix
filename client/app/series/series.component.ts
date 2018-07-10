import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  Inject
} from "@angular/core";
import { Meta, Title, DOCUMENT } from "@angular/platform-browser";
import { SeriesService } from "./series.service";
import { Category } from "../models/categorie";
import { environment } from "../../environments/environment";
import { LinkService } from "../link.service";
import { Router } from "@angular/router";

@Component({
  selector: "",
  templateUrl: "./series.component.html",
  styleUrls: ["./series.component.css"]
})
export class SeriesComponent implements OnInit {
  categories: Category[] = [];

  constructor(
    @Inject(DOCUMENT) private document: any,
    private _serieService: SeriesService,
    private _meta: Meta,
    private _title: Title,
    private linkService: LinkService,
    private router: Router
  ) {
    let url = document.location.protocol + "//" + document.location.hostname;
    let title = "CimaFlix | شاهد مسلسلات اونلاين بدون تقطيع | المسلسلات";
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
    linkService.updateTag({ rel: "canonical", href: url + this.router.url });
  }

  ngOnInit() {
    this.categories = environment.categories;
    for (let categorie of this.categories) {
      this._serieService
        .getSeries(categorie.catId)
        .subscribe(data => (categorie.series = data.items));
    }
  }
}
