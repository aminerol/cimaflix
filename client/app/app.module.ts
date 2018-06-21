import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { OwlModule } from 'ngx-owl-carousel';

import { FileUploadModule } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HomeComponent } from './home/home.component';
import { SeriesComponent } from './series/series.component';
import { FilmsComponent } from './films/films.component';
import { CategorieComponent } from './series/categorie/categorie.component';

import { SerieComponent } from './series/serie/serie.component';
import { SeasonComponent } from './series/season/season.component';
import { EpisodeComponent } from './series/episode/episode.component';
import { FilmComponent } from './films/film/film.component';

import { SeriesService } from './series/series.service'
import { CategorieService } from './series/categorie/categorie.service'
import { SerieService } from './series/serie/serie.service'
import { EpisodeService } from './series/episode/episode.service';
import { SearchComponent } from './search/search.component'


const config = {
  apiKey: 'AIzaSyAT_uz_TBSay3NJwkyfuvEq7pRxZptZfL0',
  authDomain: 'voirflix.firebaseapp.com',
  databaseURL: 'https://voirflix.firebaseio.com',
  projectId: 'voirflix',
  storageBucket: 'voirflix.appspot.com',
  messagingSenderId: '250468181520'
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,

    SeriesComponent,
    FilmsComponent,
    CategorieComponent,

    SerieComponent,
    SeasonComponent,
    EpisodeComponent,
    FilmComponent,
    SearchComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FileUploadModule,
    AppRoutingModule,
    NgxPaginationModule,
    OwlModule
  ],
  providers: [
    SeriesService,
    CategorieService,
    SerieService,
    EpisodeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
