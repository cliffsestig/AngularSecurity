import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { ProductComponent } from './product/product.component';
import { ProductCategoryComponent } from './product/product-category/product-category.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { UserComponent } from './user/user.component';
import { UserRegistrationComponent } from './user/user-registration/user-registration.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserLogoutComponent } from './user/user-logout/user-logout.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { AdminOrderComponent } from './admindashboard/admin-order/admin-order.component';
import { AdminProductComponent } from './admindashboard/admin-product/admin-product.component';
import { OrderDetailComponent} from './admindashboard/admin-order/order-detail/order-detail.component';
import { AdminGuard } from './services/adminguard.service';
import { ShoppingCartGuard } from './services/shopping-cartguard.service';
import { ProductStartComponent } from './admindashboard/admin-product/product-start/product-start.component';
import { ProductEditComponent } from './admindashboard/admin-product/product-edit/product-edit.component';
import { ProductDetailAdminComponent } from './admindashboard/admin-product/product-detail/product-detail.component';
import { ProcessingComponent } from './processing/processing.component';
import { ProfileComponent } from './user/profile/profile.component';
import { ShoppingCartConfirmationComponent } from './shopping-cart/shopping-cart-confirmation/shopping-cart-confirmation.component';

const appRoutes: Routes = [
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
	{ path: 'home', component: HomePageComponent },
	{ path: 'admindashboard', component: AdmindashboardComponent, canActivate: [AdminGuard] },
	{ path: 'admindashboard/admin-order', component: AdminOrderComponent, canActivate: [AdminGuard] },
	{ path: 'admindashboard/admin-product', component: AdminProductComponent, canActivate: [AdminGuard],children: [
		{ path: '', component: ProductStartComponent },
		{ path: 'new', component: ProductEditComponent },
		{ path: ':id', component: ProductDetailAdminComponent },
		{ path: ':id/edit', component: ProductEditComponent },
	  ] },
	{ path: 'admindashboard/admin-order/:id', component: OrderDetailComponent, canActivate: [AdminGuard] },
	{
		path: 'user', component: UserComponent, children: [
			{ path: 'register', component: UserRegistrationComponent },
			{ path: 'login', component: UserLoginComponent },
			{ path: 'logout', component: UserLogoutComponent },
			{ path: 'edit', component: UserEditComponent },
			{ path: 'profile', component: ProfileComponent},
			{ path: 'profile/:id', component: OrderDetailComponent}
		]
	},
	{ path: 'shoppingcart', component: ShoppingCartComponent },
	{ path: 'shoppingcart/confirm', component: ShoppingCartConfirmationComponent },
 	{ path: 'shop', component: ProductComponent },
	{ path: 'shop/:gender', component: ProductComponent },
	{ path: 'shop/:gender/:category', component: ProductCategoryComponent },
	{ path: 'shop/:gender/:category/:id', component: ProductDetailComponent },
	{ path: 'processing/:id', component: ProcessingComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule]
})
export class AppRoutingModule {

}
