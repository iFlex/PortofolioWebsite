import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TravelsComponent } from './travels.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'travels', component: TravelsComponent }
    ])
  ],
  exports: [RouterModule]
})
export class TravelsRoutingModule { }
