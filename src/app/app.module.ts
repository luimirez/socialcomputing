import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

// --- AngularFire Imports ---
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
// Optional: Import AngularFireStorageModule if using Storage
// import { AngularFireStorageModule } from '@angular/fire/compat/storage';

// --- Environment Config ---
// Make sure your environment file contains your firebaseConfig object
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent], // AppComponent is usually not standalone
  imports: [
    BrowserModule,
    IonicModule.forRoot(), // Standard Ionic setup
    AppRoutingModule,

    // --- Initialize AngularFire ---
    // Use your actual config from environment.ts
    AngularFireModule.initializeApp(environment.firebaseConfig),

    // --- Import AngularFire Feature Modules ---
    AngularFireAuthModule,    // Needed for Authentication
    AngularFirestoreModule, // Needed for Firestore Database
    // AngularFireStorageModule // Add if using Firebase Storage

    // Other modules your app might need globally
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}