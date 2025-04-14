import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page'; // Import TabsPage if needed for guards/resolvers on children, otherwise often not needed here

// Define ONLY the child routes for the tabs interface
const routes: Routes = [
  // Removed the wrapper: { path: 'tabs', component: TabsPage, children: [...] }
  // These routes are children of the '/tabs' path defined in app-routing.module.ts

  {
    // Configure Tab 1 path ('tab1')
    path: 'tab1',
    // Use loadComponent to load the standalone PropertyListPage
    loadComponent: () => import('../pages/property-list/property-list.page').then(m => m.PropertyListPage)
  },
  {
    // Configure Tab 2 path ('tab2')
    path: 'tab2',
    // Assuming Tab2Page is also standalone (adjust if needed)
    loadComponent: () => import('../tab2/tab2.page').then(m => m.Tab2Page) // Default starter Tab2Page
  },
  {
    // Configure Tab 3 path ('tab3')
    path: 'tab3',
    // Use loadComponent to load the standalone Tab3Page (where logout is)
    loadComponent: () => import('../tab3/tab3.page').then(m => m.Tab3Page)
  },
  {
    // Default redirect *within* the tabs interface if '/tabs' is accessed directly
    path: '',
    redirectTo: 'tab1', // Redirect to the property list tab by default
    pathMatch: 'full'
  }
  // Note: The final redirect from '' to '/tabs/tab1' might be better placed
  //       within the children array in app-routing.module.ts where TabsPageModule is loaded,
  //       or handled by the default redirect within this file as shown above.
  //       Let's keep the default redirect within tabs pointing to 'tab1'.
];

@NgModule({
  // Use RouterModule.forChild() for feature routing modules
  imports: [RouterModule.forChild(routes)],
  // No exports needed usually
})
export class TabsPageRoutingModule {}
