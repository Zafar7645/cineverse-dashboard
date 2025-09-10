import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { LoaderComponent } from './loader/loader.component';
import { ErrorComponent } from './error/error.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [AppComponent, MovieCardComponent, MovieListComponent, NotFoundComponent, MovieDetailsComponent, LoaderComponent, ErrorComponent, HeaderComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
