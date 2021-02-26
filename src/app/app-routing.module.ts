import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop/shop.component';
import { StockCreateComponent } from './stock/stock-create/stock-create.component';
import { StockEditComponent } from './stock/stock-edit/stock-edit.component';
import { StockHomeComponent } from './stock/stock-home/stock-home.component';

const routes: Routes = [
  {
    path: 'stock', children: [
      { path: '', component: StockHomeComponent },
      { path: 'create', component: StockCreateComponent },
      { path: 'edit/:id', component: StockEditComponent }
    ]
  },
  { path: 'shop', component: ShopComponent },
  { path: '**', redirectTo: 'stock' },
  { path: '', redirectTo: 'stock', pathMatch: 'full' }
]; // กำหนดเส้นทาง URL

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
