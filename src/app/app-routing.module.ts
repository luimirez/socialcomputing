import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard]
  },
  //{
    //path: 'property-list',
    //loadChildren: () => import('./pages/property-list/property-list.module').then( m => m.PropertyListPageModule)
  //},
  {
    path: 'property-detail/:id',
    loadComponent: () => import('./pages/property-detail/property-detail.page').then( m => m.PropertyDetailPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login-page/login-page.page').then( m => m.LoginPagePage)
  },
  {
    path: 'register-page',
    loadComponent: () => import('./pages/register-page/register-page.page').then( m => m.RegisterPagePage)
  },
  {
    path: 'booking-form/:id',
    loadComponent: () => import('./pages/booking-form/booking-form.page').then( m => m.BookingFormPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'ad-creation',
    loadComponent: () => import('./pages/ad-creation/ad-creation.page').then( m => m.AdCreationPage),
    canActivate: [AuthGuard]
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules,
      enableTracing: true
     })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
