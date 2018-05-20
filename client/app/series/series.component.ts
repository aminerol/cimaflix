import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { SeriesService } from './series.service';

@Component({
  selector: '',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeriesComponent implements OnInit {

  @Input('data') series: any[] = [];
  p: number = 1;
  total: number;
  loading: boolean;

  constructor(private _homeService: SeriesService) {

  }

  ngOnInit() {
    this.getPage(1);
  }

  getPage(page: number) {
    this.loading = true;
      this._homeService.getSeries(page).subscribe(
        data => {
          this.total = data.length;
          this.p = page;
          this.loading = false;
          for (let i = 0; i < data.length; i++) {
            this.series.push(data[i]);
          }
        }
      )
  }

}
