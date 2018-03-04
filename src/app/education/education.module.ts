import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducationComponent } from './education.component';
import { EducationRoutingModule } from './education-routing.module';

@NgModule({
  imports: [CommonModule, EducationRoutingModule],
  declarations: [EducationComponent],
  exports: [EducationComponent]
})
export class EducationModule { }
