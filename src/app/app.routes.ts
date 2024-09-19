import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { MediaListComponent } from './features/media/components/media-list/media-list.component'
import { MediaDetailComponent } from './features/media/components/media-detail/media-detail.component'
import { GenresComponent } from './features/media/components/genres/genres.component'

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'list/:type', component: MediaListComponent },
  { path: 'detail/:id/:type', component: MediaDetailComponent },
  { path: 'genres', component: GenresComponent },
  { path: 'genres/:genreId', component: GenresComponent },
]
