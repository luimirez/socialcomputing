import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Determines if a route can be activated.
   * Checks the user's authentication state using AuthService.
   * Redirects to '/login' if the user is not authenticated.
   * @param next The next route snapshot.
   * @param state The current router state snapshot.
   * @returns Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return this.authService.getAuthState().pipe(
        take(1),
        map(user => !!user),
        tap(isLoggedIn => {
          console.log('AuthGuard: User logged in?', isLoggedIn);
          if (!isLoggedIn) {
            console.log('AuthGuard: Not logged in, redirecting to /login');

            this.router.navigate(['/login']);
          }
        })
      )
    }

}
