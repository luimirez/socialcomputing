import { Component } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular'; // Import NavController
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Remove ExploreContainerComponentModule import if not used
// import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    // ExploreContainerComponentModule // Remove if ExploreContainer is not used
  ]
})
export class Tab2Page {

  // Inject NavController for navigation
  constructor(private navCtrl: NavController) {}

  /**
   * Navigates the user to the Ad Creation page.
   */
  goToAdCreation() {
    console.log('Navigating to Ad Creation page...');
    this.navCtrl.navigateForward('/ad-creation');
    // Ensure '/ad-creation' route is defined in app-routing.module.ts
  }

}
