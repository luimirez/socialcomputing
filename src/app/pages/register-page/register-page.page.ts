import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonicModule,
  NavController,
  LoadingController,
  ToastController
 } from '@ionic/angular';
 import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.page.html',
  styleUrls: ['./register-page.page.scss'],
  imports: [
      IonicModule,
      CommonModule,
      FormsModule
    ]
})
export class RegisterPagePage implements OnInit {

  registerCredentials = {
    email: '',
    password: '',
    confirmPassword: '' //Added for password confirmation
  };

  isLoading = false; //trigger for the loading indicator

  constructor(
    private navCtrl: NavController,
    private AuthService: AuthService, //Triggering the AuthService
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
  }

  /**
   * we are going to handle to the registration for submission
   */
  async register() {
    //creating a basic validation (mostly handling the form disabling)
    if (this.registerCredentials.password !== this.registerCredentials.confirmPassword) {
      this.presentToast('Passwords do not match.', 'danger');
      return;
    }
    if (!this.registerCredentials.email || !this.registerCredentials.confirmPassword) {
      this.presentToast('Please enter email and password', 'warning');
      return;
    }

    await this.showLoading();
    this.isLoading = true;

    try{
      //we are going to call the AuthService register method
      const userCredential = await this.AuthService.register(
        this.registerCredentials.email,
        this.registerCredentials.password
      );
      console.log('Registration successful:', userCredential);

      await this.loadingCtrl.dismiss();
      this.isLoading = false;

      //show success message
      await this.presentToast('Account created successfully! You can now log in.', 'success');

      //nacivating the back of the login page after a successful registration
      this.navCtrl.navigateBack('/login');
    } catch (error: any) {
      console.error('Registration failed:', error);
      await this.loadingCtrl.dismiss();
      this.isLoading = false;

      await this.presentToast(`Registration Failed: ${error.message || 'Please try again.'}`, 'danger' );
    }finally {
      this.isLoading = false;
    }
  }

  /**
   * Navigates back to the login page.
   */
  goToLogin() {
    this.navCtrl.navigateBack('/login');
  }

  // --- Helper Methods ---

  /**
   * Displays a loading indicator.
   */
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Creating account...',
      spinner: 'crescent',
      translucent: true,
    });
    await loading.present();
  }

  /**
   * Presents a toast message to the user.
   */
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

