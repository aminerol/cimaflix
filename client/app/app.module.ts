import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgxPaginationModule } from 'ngx-pagination';

import { FileUploadModule } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HomeComponent } from './home/home.component';
import { SeriesComponent } from './series/series.component';
import { FilmsComponent } from './films/films.component';
import { SerieComponent } from './series/serie/serie.component';
import { SeasonComponent } from './series/season/season.component';
import { EpisodeComponent } from './series/episode/episode.component';
import { FilmComponent } from './films/film/film.component';
import { RamadnComponent } from './ramadn/ramadn.component';

import { SeriesService } from './series/series.service'

import { PostsComponent } from './demo/posts/posts.component';
import { PostsService } from './demo/posts/posts.service';
import { ChatComponent } from './demo/chat/chat.component';
import { HeroFormComponent } from './demo/form/hero-form.component';
import { UploadFileComponent } from './demo/upload-file/upload-file/upload-file.component';
import { FileListComponent } from './demo/upload-file/file-list/file-list.component';
import { FileListService } from './demo/upload-file/file-list/file-list.service';

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
    PostsComponent,
    ChatComponent,
    HeroFormComponent,
    UploadFileComponent,
    FileListComponent,

    SeriesComponent,
    FilmsComponent,
    SerieComponent,
    SeasonComponent,
    EpisodeComponent,
    FilmComponent,
    RamadnComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FileUploadModule,
    AppRoutingModule,
    NgxPaginationModule
  ],
  providers: [
    PostsService,
    FileListService,
    SeriesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
