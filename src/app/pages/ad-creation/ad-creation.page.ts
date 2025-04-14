import { Component, OnInit, ViewChild } from '@angular/core'; // Import ViewChild
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms'; // Import NgForm
import { IonicModule, NavController, LoadingController, ToastController } from '@ionic/angular';

// Import service and types
import { FirebaseDataService, Property } from '../../services/firebase-data.service';

// Define type for the form model, excluding the Firestore ID
type NewPropertyForm = Omit<Property, 'id'>;

@Component({
  selector: 'app-ad-creation',
  templateUrl: './ad-creation.page.html',
  styleUrls: ['./ad-creation.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule] // Ensure imports are correct
})
export class AdCreationPage implements OnInit {

  // Reference to the form in the template
  @ViewChild('adForm') adForm!: NgForm;

  isLoading = false; // For loading indicator

  // Initialize the form model object
  newProperty: NewPropertyForm = {
    title: '',
    price: null as any, // Initialize number fields carefully, null or undefined
    address: '',
    description: '',
    bedrooms: null as any,
    bathrooms: null as any,
    imageUrl: ''
  };

  constructor(
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private dataService: FirebaseDataService // Inject data service
  ) { }

  ngOnInit() {
    // Ensure this page is protected by AuthGuard in app-routing.module.ts
  }

  /**
   * Handles the submission of the new property ad form.
   */
  async submitAd() {
    if (this.adForm.invalid) {
      this.presentToast('Please fill in all required fields correctly.', 'warning');
      return;
    }

    await this.showLoading();
    this.isLoading = true;

    // Prepare data, ensuring numbers are numbers or omitted if null/empty
    const propertyData: NewPropertyForm = {
      ...this.newProperty,
      // Convert price to number, default to 0 if invalid (or handle differently)
      price: Number(this.newProperty.price) || 0,
      // Convert bedrooms/bathrooms, omit if null or undefined
      bedrooms: this.newProperty.bedrooms ? Number(this.newProperty.bedrooms) : undefined,
      bathrooms: this.newProperty.bathrooms ? Number(this.newProperty.bathrooms) : undefined,
      // Ensure imageUrl is an empty string if not provided, or omit if desired
      imageUrl: this.newProperty.imageUrl || ''
    };

    try {
      console.log('Submitting new property data:', propertyData);

      // Call the service method to add the property
      const docRef = await this.dataService.addProperty(propertyData);
      console.log('Property added successfully with ID:', docRef.id);

      await this.loadingCtrl.dismiss();
      this.isLoading = false;
      await this.presentToast('Property Ad created successfully!', 'success');

      // Reset the form
      this.resetForm();

      // Navigate back to the property list (or stay on page?)
      this.navCtrl.navigateBack('/tabs/tab1');

    } catch (error: any) {
      console.error('Failed to create property ad:', error);
      // Dismiss loader if it's still active
      try { await this.loadingCtrl.dismiss(); } catch (e) {}
      this.isLoading = false;
      await this.presentToast(`Error creating ad: ${error.message || 'Unknown error'}`, 'danger');
    } finally {
      this.isLoading = false;
    }
  }

  /**
   * Resets the form to its initial state.
   */
  resetForm() {
     if (this.adForm) {
       this.adForm.resetForm(); // Use NgForm's resetForm method
       // Re-initialize the model object if needed after reset
        this.newProperty = {
          title: '', price: null as any, address: '', description: '',
          bedrooms: null as any, bathrooms: null as any, imageUrl: ''
        };
     }
  }


  // --- Helper Methods ---
  async showLoading() {
    const existingLoader = await this.loadingCtrl.getTop();
    if (existingLoader) return;

    const loading = await this.loadingCtrl.create({
      message: 'Saving property...',
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