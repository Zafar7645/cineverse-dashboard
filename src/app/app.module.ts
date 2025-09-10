import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    MovieCardComponent,
    MovieListComponent,
    NotFoundComponent,
    HeaderComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
