import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone: true,
  imports: []
})
export class MapComponent implements AfterViewInit {
  @ViewChild('mapElement', { static: false }) mapElement!: ElementRef;
  @Input() lat: number = 53.3498; // Default: Dublin
  @Input() lng: number = -6.2603;

  map: google.maps.Map | undefined;

  ngAfterViewInit() {
    const mapOptions: google.maps.MapOptions = {
      center: { lat: this.lat, lng: this.lng },
      zoom: 15
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    // Add marker
    new google.maps.Marker({
      position: { lat: this.lat, lng: this.lng },
      map: this.map,
      title: 'Property Location'
    });
  }
}

