import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EducationComponent } from './education.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'education', component: EducationComponent }
    ])
  ],
  exports: [RouterModule]
})
export class EducationRoutingModule { }
