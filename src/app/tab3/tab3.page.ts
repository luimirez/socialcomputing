import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonicModule,
  NavController,
  ToastController
} from '@ionic/angular';

//Import AuthService
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  // Making sure that  that import ant modules are imported for standalone components
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Tab3Page {

  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) {}

  /**
   * Logs the current user out using Auth Service and navigate to login page
   */
  async logout() {
    console.log('Attempting logout...');
    try{
      //Call the logout method from AuthService
      await this.authService.logout();

      await this.presentToast('You have been logged out.', 'success');

      this.navCtrl.navigateRoot('/login');
    
    } catch (error: any) {
      console.error('Logout failed:', error);
      await this.presentToast(`Logout Failed: ${error.message || 'Please try again.'}`, 'danger');
    }
  }

  /**
   * Helper the method to present toast message
   */
  async presentToast(message: string,  color: string = 'medium', duration: number = 2000) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: duration,
      color: color,
      position: 'bottom'
    });
    await toast.present();
  }

}
