import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/compat/auth'; // We are importing the AngularFireAuth
import firebase from 'firebase/compat/app'; //we are importing the firebase type whether important somewhere

@Injectable({
  providedIn: 'root'
})
export class AuthService {
// we are going to apply the injection in AngularFireAuth in the constructor
  constructor(private afAuth: AngularFireAuth) { }

  /**
   * Log in a user  with email and password using firebase authentication
   * user's email
   * password
   * return promising if the access was successfull or failed in Firebase
   */
  login(email: string, password: string): Promise<firebase.auth.UserCredential> {
    console.log(`AuthService: Attempting login for ${email}`);
    // Using the Sign in the the email and password method from AngularFireAuth
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  /**
   * REgistering a new user email and password using firebase auth
   * email user
   * password
   * response if the access was accepted or rejected
   */

  register(email: string, password: string): Promise<firebase.auth.UserCredential> {
    console.log(`AuthService: Attempting registration for ${email}`);
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }
  /**
   * Logging out  the user session
   * the return is making sure that  logout is complete
   */
  logout(): Promise<void> {
    console.log('AuthService: Logging out');
    return this.afAuth.signOut();
  }

  /**
   * making  sure  that authentication is noticeable
   * triggering that firebase is logged in, out or null
   * the login status through the app
   */

  getAuthState() {
    return this.afAuth.authState;
  }

  /**
   * obtains the synch process
   * Note: it's almost better to check the AuthState
   * returns a promising resolving  with a firebase authentication access sucessfully or null
   */
  getCurrentUser(): Promise<firebase.User | null> {
    return this.afAuth.currentUser;
  }
}
