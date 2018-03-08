import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {HttpModule} from '@angular/http';
import {DropdownDirective} from './directive/dropdown.directive';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {HomePageComponent} from './home-page/home-page.component';
import {ProductComponent} from './product/product.component';
import {ProductDetailComponent} from './product/product-detail/product-detail.component';
import {
	IconCheck,
	IconFacebook,
	IconInstagram,
	IconPlusCircle,
	IconShoppingCart,
	IconTrash2,
	IconUser
} from 'angular-feather';
import {UserComponent} from './user/user.component';
import {UserRegistrationComponent} from './user/user-registration/user-registration.component';
import {UserLoginComponent} from './user/user-login/user-login.component';
import {UserLogoutComponent} from './user/user-logout/user-logout.component';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {ShoppingCartDropdownComponent} from './header/shopping-cart-dropdown/shopping-cart-dropdown.component';
import {MobileMenuComponent} from './header/mobile-menu/mobile-menu.component';
import {AuthService} from './services/auth.service';
import {UserService} from './services/user.service';
import {ShoppinglistService} from './services/shoppinglist.service';
import {ProductService} from './services/product.service';
import {UserEditComponent} from './user/user-edit/user-edit.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {AdmindashboardComponent} from './admindashboard/admindashboard.component';
import {AdminOrderComponent} from './admindashboard/admin-order/admin-order.component';
import {AdminProductComponent} from './admindashboard/admin-product/admin-product.component';
import {AdminGuard} from './services/adminguard.service';
import {ProductListComponent} from './admindashboard/admin-product/product-list/product-list.component';
import {ProductStartComponent} from './admindashboard/admin-product/product-start/product-start.component';
import {ProductEditComponent} from './admindashboard/admin-product/product-edit/product-edit.component';
import {ProductItemComponent} from './admindashboard/admin-product/product-list/product-item/product-item.component';
import {ProductDetailAdminComponent} from './admindashboard/admin-product/product-detail/product-detail.component';
import {OrderService} from './services/order.service';
import {ProductCategoryComponent} from './product/product-category/product-category.component';

import {ShoppingCartGuard} from './services/shopping-cartguard.service';

import {OrderDetailComponent} from './admindashboard/admin-order/order-detail/order-detail.component';
import {OrderListComponent} from './admindashboard/admin-order/order-list/order-list.component';
import { ProfileComponent } from './user/profile/profile.component';
import { ProcessingComponent } from './processing/processing.component';
import { ShoppingCartConfirmationComponent } from './shopping-cart/shopping-cart-confirmation/shopping-cart-confirmation.component';
import { ShoppingCartConfirmationFormComponent } from './shopping-cart/shopping-cart-confirmation/shopping-cart-confirmation-form/shopping-cart-confirmation-form.component';
import { imageService } from './services/image.service';
import { ProcessingPaymentService } from './services/processing-payment.service';
import { ReCaptchaModule } from 'angular2-recaptcha';
import { UserForgotComponent } from './user/user-forgot/user-forgot.component';
import { UserResetComponent } from './user/user-reset/user-reset.component';

export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
	declarations: [
		AppComponent,
		DropdownDirective,
		FooterComponent,
		HeaderComponent,
		HomePageComponent,
		ProductComponent,
		ProductDetailComponent,
		UserComponent,
		ProductDetailAdminComponent,
		UserRegistrationComponent,
		UserLoginComponent,
		UserLogoutComponent,
		ShoppingCartComponent,
		ShoppingCartDropdownComponent,
		MobileMenuComponent,
		UserEditComponent,
		AdmindashboardComponent,
		AdminOrderComponent,
		AdminProductComponent,
		ProductCategoryComponent,
		OrderDetailComponent,
		OrderListComponent,
		ProductListComponent,
		ProductStartComponent,
		ProductEditComponent,
		ProductItemComponent,
		ProfileComponent,
		ShoppingCartConfirmationComponent,
		ShoppingCartConfirmationFormComponent,
		ProcessingComponent,
		UserForgotComponent,
		UserResetComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpModule,
		HttpClientModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient]
			}
		}),
		FormsModule,
		ReactiveFormsModule,
		IconFacebook,
		IconInstagram,
		IconCheck,
		IconTrash2,
		IconPlusCircle,
		IconShoppingCart,
		IconUser,
		ReCaptchaModule
	],
	providers: [ShoppinglistService, AuthService, UserService, AdminGuard, ProductService, OrderService, ShoppingCartGuard ,imageService, ProcessingPaymentService],
	bootstrap: [AppComponent]
})
export class AppModule {
}
