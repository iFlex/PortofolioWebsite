import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TravelsComponent } from './travels.component';
import { TravelsRoutingModule } from './travels-routing.module';
import { ProjectListService } from '../shared/project-list/project-list.service';

@NgModule({
  imports: [CommonModule, TravelsRoutingModule],
  declarations: [TravelsComponent],
  exports: [TravelsComponent],
  providers: [ProjectListService]
})
export class TravelsModule { }
