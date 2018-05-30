import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PostsComponent } from './demo/posts/posts.component';
import { ChatComponent } from './demo/chat/chat.component';
import { HeroFormComponent } from './demo/form/hero-form.component';
import { UploadFileComponent } from './demo/upload-file/upload-file/upload-file.component';
import { FileListComponent } from './demo/upload-file/file-list/file-list.component';

import { SeriesComponent } from './series/series.component';
import { FilmsComponent } from './films/films.component';
import { CategorieComponent } from './series/categorie/categorie.component';

import { SerieComponent } from './series/serie/serie.component';
import { SeasonComponent } from './series/season/season.component';
import { EpisodeComponent } from './series/episode/episode.component';

import { FilmComponent } from './films/film/film.component';

const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent
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
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    // component: PageNotFoundComponent
    redirectTo: '/home'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
