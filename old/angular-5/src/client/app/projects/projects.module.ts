import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectListService } from '../shared/project-list/project-list.service';

@NgModule({
  imports: [CommonModule, ProjectsRoutingModule],
  declarations: [ProjectsComponent],
  exports: [ProjectsComponent]
  providers: [ProjectListService]
})
export class ProjectsModule { }
