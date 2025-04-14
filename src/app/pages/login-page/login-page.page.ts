import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Import Ionic components and services needed
import {
  IonicModule,
  NavController,
  LoadingController, // To show a loading indicator
  ToastController // To show success/error messages
} from '@ionic/angular';

// Import the AuthService we created
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ]
})
export class LoginPagePage implements OnInit {

  loginCredentials = {
    email: '',
    password: ''
  };

  isLoading = false; // Flag to control loading indicator visibility

  // Inject NavController, AuthService, LoadingController, ToastController
  constructor(
    private navCtrl: NavController,
    private authService: AuthService, // Inject AuthService
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
  }

  /**
   * Handles the login form submission.
   * Calls the AuthService login method.
   */
  async login() {
    console.log('Login button clicked.'); // <-- Log 1
    if (!this.loginCredentials.email || !this.loginCredentials.password) {
      this.presentToast('Please enter both email and password.');
      return;
    }

    await this.showLoading();
    this.isLoading = true;
    console.log('Loading indicator shown.'); // <-- Log 2

    try {
      console.log('Attempting authService.login...'); // <-- Log 3
      const userCredential = await this.authService.login(
        this.loginCredentials.email,
        this.loginCredentials.password
      );
      console.log('Login successful in AuthService:', userCredential); // <-- Log 4

      // Dismiss loading indicator on success
      // Check if loading controller is still presented before dismissing
       try {
         await this.loadingCtrl.dismiss();
       } catch (dismissError) {
         console.warn('Failed to dismiss loading controller (might have been dismissed already):', dismissError);
       }
      this.isLoading = false;
      console.log('Loading indicator dismissed.'); // <-- Log 5

      await this.presentToast('Login successful!', 'success');

      // --- Check and Correct Navigation Path ---
      // The default tabs starter uses paths like 'tab1', 'tab2', 'tab3'
      // Assuming PropertyList should be Tab 1:
      const navigationPath = '/tabs/tab1'; // <-- Ensure this matches your tabs-routing.module.ts
      console.log(`Attempting navigation to: ${navigationPath}`); // <-- Log 6
      // -----------------------------------------

      this.navCtrl.navigateRoot(navigationPath); // Use the corrected path

    } catch (error: any) {
      console.error('Login failed in try-catch block:', error); // <-- Log Error

      // Ensure loading indicator is dismissed on error
      try {
         await this.loadingCtrl.dismiss();
      } catch (dismissError) {
         console.warn('Failed to dismiss loading controller:', dismissError);
      }
      this.isLoading = false;

      await this.presentToast(`Login Failed: ${error.message || 'Please check your credentials.'}`, 'danger');

    } finally {
       this.isLoading = false; // Ensure flag is reset
       console.log('Login function finally block executed.'); // <-- Log Finally
    }
  }

  /**
   * Navigates to the registration page.
   */
  goToRegister() {
    // Use NavController to navigate
    this.navCtrl.navigateForward('/register-page');
  }

  // --- Helper Methods for UI Feedback ---

  /**
   * Displays a loading indicator.
   */
  async showLoading() {
    const existingLoader = await this.loadingCtrl.getTop();
    if (existingLoader) {
        console.warn('Loading controller already active');
        return;
    }
    const loading = await this.loadingCtrl.create({
      message: 'Logging in...',
      spinner: 'crescent',
      translucent: true,
    });
    await loading.present();
  }

  /**
   * Presents a toast message to the user.
   * @param message The message to display.
   * @param color The color of the toast (e.g., 'success', 'danger', 'warning'). Default is 'medium'.
   * @param duration Duration in milliseconds. Default is 3000ms.
   */
  async presentToast(message: string, color: string = 'medium', duration: number = 3000) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: duration,
      color: color,
      position: 'bottom' // Or 'top', 'middle'
    });
    await toast.present();
  }
}