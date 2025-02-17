import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './pages/product/product.component';
import { ScraperComponent } from './pages/scraper/scraper.component';

const routes: Routes = [
  { path: 'product', component: ProductComponent },
  { path: 'scraper', component: ScraperComponent },
  { path: '', pathMatch: 'full', redirectTo: '/product'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
