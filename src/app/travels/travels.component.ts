import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectListService } from '../shared/project-list/project-list.service';
import { Observable } from 'rxjs/Rx';
import {} from '@types/googlemaps';

/**
 * This class represents the lazy loaded TravelsComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-travels',
  templateUrl: 'travels.component.html',
  styleUrls: ['travels.component.css']
})

export class TravelsComponent implements OnInit {
  @ViewChild("travelMap") gmap: any;
  map: google.maps.Map;
  RES_NAME: string = "travels.json";

  errorMessage: string;
  travels: any[] = [];

  /**
   * Creates an instance of the TravelsComponent with the injected
   * ProjectListService.
   *
   * @param {ProjectListService} projectListService - The injected ProjectListService.
   */
  constructor(public projectListService: ProjectListService) {}

  //todo: stop time alltogether after init
  timer = Observable.timer(0, 100);
  subscription

  initGmaps(){
    console.log("Initialising Map");
    this.subscription.unsubscribe();
    
    var mapProp = {
      center: new google.maps.LatLng(48.23610, 21.22574),
      zoom: 4
    }
    this.map = new google.maps.Map(this.gmap.nativeElement, mapProp);
    this.getTravels();
  }

  deferedInit(){
     this.subscription = this.timer.subscribe((t) => {if(window["google"] instanceof Object) this.initGmaps();})
  }

  /**
   * Get the names OnInit
   */
  ngOnInit() {
    this.deferedInit();
  }

  placeMarkers(items: any[]){
    for (var i = 0; i < items.length; i++) {
      var coords = items[i].latlng;
      var latLng = new google.maps.LatLng(coords[0],coords[1]);
      var marker = new google.maps.Marker({
        position: latLng,
        map: this.map
      });
    }
  }

  getTravels(){
    this.projectListService.get(this.RES_NAME)
      .subscribe(
        items => this.placeMarkers(items),
        error => this.errorMessage = <any>error
      )
  }
}
