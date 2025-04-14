import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController, LoadingController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

// Importing  Services (user ID, Data for saving)
import { AuthService } from '../../services/auth.service';
import { FirebaseDataService } from '../../services/firebase-data.service';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.page.html',
  styleUrls: ['./booking-form.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule] // making sure that the imports look correct
})
export class BookingFormPage implements OnInit {

  propertyId: string | null = null; // storing the property ID from route
  isLoading = false; //  to fetch the indicator
  minDate: string; // prevent booking past dates

  
  bookingDetails = {
    selectedDateTime: null, // Will hold ISO string date
    notes: ''
  };

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService, // obtaining the user ID
    private dataService: FirebaseDataService // saving the booking
  ) {
     //set the ion-datetime to today
     this.minDate = new Date().toISOString();
  }

  ngOnInit() {
    // the property ID from the route settings
    this.propertyId = this.route.snapshot.paramMap.get('id');
    console.log('Booking form for Property ID:', this.propertyId);
  }

  /**
   * scheduling for submitting the booking request.
   */
  async submitBooking() {
    if (!this.propertyId) {
      this.presentToast('Error: Property ID is missing.', 'danger');
      return;
    }
    if (!this.bookingDetails.selectedDateTime) {
       this.presentToast('Please select a date and time.', 'warning');
       return;
    }

    await this.showLoading();
    this.isLoading = true;

    try {
      // 1. Get Current User ID
      const user = await this.authService.getCurrentUser();
      if (!user) {
        throw new Error('User not logged in.');
      }
      const userId = user.uid;

      // 2. Preparing the Booking Data
      const bookingData = {
        userId: userId,
        propertyId: this.propertyId,
        requestedDateTime: this.bookingDetails.selectedDateTime, //String format
        notes: this.bookingDetails.notes || '', // Ensure notes is not null
        status: 'pending', // Initial status
        createdAt: new Date().toISOString() // Timestamp
      };

      console.log('Submitting booking data:', bookingData);

      // 3. Retrieve the Data Service (Method to be created)
      // await this.dataService.addBooking(bookingData); // <-- Need to implement this

      // --- Placeholder for now ---
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
      console.log('Placeholder: Booking submitted successfully (no actual save yet)');
      // --- End Placeholder ---


      await this.loadingCtrl.dismiss();
      this.isLoading = false;
      await this.presentToast('Booking request submitted successfully!', 'success');

      // Navigate back to property detail page
      this.navCtrl.back(); // Or navigate specifically: this.navCtrl.navigateBack(`/property-detail/${this.propertyId}`);

    } catch (error: any) {
      console.error('Booking submission failed:', error);
      await this.loadingCtrl.dismiss();
      this.isLoading = false;
      await this.presentToast(`Error submitting request: ${error.message}`, 'danger');
    } finally {
      this.isLoading = false;
    }
  }

  // --- Helper Methods ---
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Submitting request...',
      spinner: 'crescent'
    });
    await loading.present();
  }

  async presentToast(message: string, color: string = 'medium', duration: number = 3000) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: duration,
      color: color,
      position: 'bottom'
    });
    await toast.present();
  }
}