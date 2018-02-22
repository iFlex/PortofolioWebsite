import { Component } from '@angular/core';
import { ProjectListService } from '../shared/project-list/project-list.service';

/**
 * This class represents the lazy loaded ProjectsComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-projects',
  templateUrl: 'projects.component.html',
  styleUrls: ['projects.component.css']
})

export class ProjectsComponent implements OnInit {

  errorMessage: string;
  projects: any[] = [];

  /**
   * Creates an instance of the ProjectsComponent with the injected
   * ProjectListService.
   *
   * @param {ProjectListService} projectListService - The injected ProjectListService.
   */
  constructor(public projectListService: ProjectListService) {}

  /**
   * Get the names OnInit
   */
  ngOnInit() {
    this.getProjects();
  }

  /**
   * Handle the ProjectListService observable
   */
  getProjects() {
    this.projectListService.get()
      .subscribe(
        projects => this.projects = projects,
        error => this.errorMessage = <any>error
      );
  }

}
