import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { catchError, Observable } from 'rxjs';

//Remove 'catchError' is not used yet
//import { catchError } from 'rxjs/operators';

// Import the data service and property interfaces
import { FirebaseDataService, Property } from 'src/app/services/firebase-data.service';
// Optional: Importing AuthService if adding logout button here
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.page.html',
  styleUrls: ['./property-list.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ]
})
export class PropertyListPage implements OnInit {

  //Observable to hold the stream of properties
  public properties$!: Observable<Property[]>;

  //public errorLoadingProperties = false; //Optional for error state

  //Injecting FirebaseDataService and NavController

  constructor(
    private dataService: FirebaseDataService,
    private navCtrl: NavController
    //private authService: AuthService  //I'm going to inject to add logout here
  ) { }

  ngOnInit() {
    //Assign the Observable from the service
    this.properties$ = this.dataService.getProperties();
    //optional: Add error handling
    //.pipe(
      //catchError(error => {
        //console.error('Error loading properties:', error);
        //this.errorLoadingProperties = true;
        //return of ([]);
      //})
    //);
  }

  /**
   * navigate to the property detail page
   * @param propertyId  The ID of the property to navigate to.
   */
  goToPropertyDetail(propertyId: string) {
    if (!propertyId) {
      console.error('Property ID is missing');
      return;
    }
    console.log(`Navitating to detail page for property ID: ${propertyId}`);
    // navigate using navcontroller, passing the ID as part of the url
    // making sure  the route 'property-detail/:id' is defined as app-routing.module.ts
    this.navCtrl.navigateForward(`/property-detail/${propertyId}`);
  }

  //Optional: We can add the logout method if the button is added to the page's header
  //async logout() {
    //try {
      //await this.authService.logout();
      //this.navCtrl.navigateRoot('/login');
    //} catch (error) {
      //console.error('Logout failed:', error);
      //it is showing the toast message
    //}
  //}

}
