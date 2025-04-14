import { GoogleMapsModule } from '@angular/google-maps';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, catchError, tap, filter, map } from 'rxjs/operators';

// Importing the data service and property interface
import { FirebaseDataService, Property } from 'src/app/services/firebase-data.service';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.page.html',
  styleUrls: ['./property-detail.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterLink,
    GoogleMapsModule
  ]

})
export class PropertyDetailPage implements OnInit {

  public property$!: Observable<Property>;
  public isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private dataService: FirebaseDataService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.isLoading = true;

    this.property$ =  this.route.paramMap.pipe(

      map(params => params.get('id')),
      switchMap(id => {
        if (!id) {
          console.error('Property ID missing from route');
          this.isLoading = false;
          return of(undefined);
        }
        console.log(`Fetching details for property ID: ${id}`);
        return this.dataService.getPropertyById(id);
      }),

      catchError(error => {
        console.error('Error loading property details:', error);
        this.isLoading = false;

        return of(undefined);  //or of(undefined)
      }),

      filter((property): property is Property => property !== undefined),

      tap(() => this.isLoading = false),

      //startWith(undefined)
    );
  }

  /**
   * Navigate to the booking form page for the current property.
   * @param propertyId the id  of the property to book a viewing
   */
  goToBookingForm(propertyId: string) {
    console.log(`Navigating to booking form for property ID: ${propertyId}`);

    this.navCtrl.navigateForward(`/booking-form/${propertyId}`);
  }



}
