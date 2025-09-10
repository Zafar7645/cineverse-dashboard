import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailsComponent } from './movie-details.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [{ path: ':id', component: MovieDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  exports: [RouterModule],
})
export class MovieDetailsRoutingModule {}
