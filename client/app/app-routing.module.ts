import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';

import { SeriesComponent } from './series/series.component';
import { FilmsComponent } from './films/films.component';
import { CategorieComponent } from './series/categorie/categorie.component';

import { SerieComponent } from './series/serie/serie.component';
import { SeasonComponent } from './series/season/season.component';
import { EpisodeComponent } from './series/episode/episode.component';

import { FilmComponent } from './films/film/film.component';


import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';

const appRoutes: Routes = [
  {
    path: 'search/:query',
    component: SearchComponent
  },
  {
    path: 'مسلسلات',
    component: SeriesComponent
  },
  {
    path: 'افلام',
    component: FilmsComponent
  },
  {
    path: ':slug',
    component: CategorieComponent
  },

  {
    path: ':catslug/:serieslug',
    component: SerieComponent
  },
  {
    path: ':catslug/:serieslug/:seasonslug',
    component: SeasonComponent
  },
  {
    path: ':catslug/:serieslug/:seasonslug/:episodeslug',
    component: EpisodeComponent
  },
  {
    path: 'فيلم/:slug',
    component: FilmComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  },
  {
    path: '**',
    // component: PageNotFoundComponent
    redirectTo: '/'
}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
