import { Routes } from '@angular/router';
import { HomeComponent } from './modules/pages/home/home.component';
import { MediaListComponent } from './modules/media/media-list/media-list.component';
import { MediaDetailComponent } from './modules/media/media-detail/media-detail.component';
import { GenresComponent } from './modules/media/genres/genres.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'list/:type', component: MediaListComponent },
  { path: 'detail/:id/:type', component: MediaDetailComponent },
  { path: 'genres', component: GenresComponent },
  { path: 'genres/:genreId', component: GenresComponent },
];
