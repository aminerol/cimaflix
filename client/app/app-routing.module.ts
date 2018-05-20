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

import { SerieComponent } from './series/serie/serie.component';
import { SeasonComponent } from './series/season/season.component';
import { EpisodeComponent } from './series/episode/episode.component';

import { FilmComponent } from './films/film/film.component';
import { RamadnComponent } from './ramadn/ramadn.component';

const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'posts',
    component: PostsComponent
  },
  {
    path: 'chat',
    component: ChatComponent
  },
  {
    path: 'form',
    component: HeroFormComponent
  },
  {
    path: 'upload-file',
    component: UploadFileComponent
  },
  {
    path: 'file-list',
    component: FileListComponent
  },
  {
    path: 'مسلسلات',
    component: SeriesComponent
  },
  {
    path: 'مسلسلات-رمضان',
    component: RamadnComponent
  },
  {
    path: 'افلام',
    component: FilmsComponent
  },

  {
    path: 'مسلسل/:slug',
    component: SerieComponent
  },
  {
    path: 'موسم/:slug',
    component: SeasonComponent
  },
  {
    path: 'الحلقة/:slug',
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
