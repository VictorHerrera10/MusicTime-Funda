import { Routes } from '@angular/router';
import { HomePageComponent } from './public/pages/home-page/home-page.component';
import { ProfileComponent } from './public/pages/profile/profile.component';
import { LoginComponent } from './public/pages/login/login.component';
import { RegisterComponent } from './public/pages/register/register.component';
import { ContractViewComponent } from './public/pages/contract-view/contract-view.component';
import { SuscriptionComponent } from './public/pages/suscription/suscription.component';
import { ContractCreateComponent } from './public/pages/contract-create/contract-create.component';
import { ContractEditComponent } from './public/pages/contract-edit/contract-edit.component';
import { EnterpriceViewComponent } from './public/pages/enterprice-view/enterprice-view.component';
import { RegisterEnterpriceComponent } from './public/pages/register-enterprice/register-enterprice.component';
import { RegisterMusicalComponent } from './public/pages/register-musical/register-musical.component';
import { MusicViewComponent } from './public/pages/music-view/music-view.component';
import { CustomerViewComponent } from './public/pages/customer-view/customer-view.component';
import { RegisterCustomerComponent } from './public/pages/register-customer/register-customer.component';


export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'home', component: HomePageComponent },
    { path: 'profile/:id', component: ProfileComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'contract-view', component: ContractViewComponent },
    { path: 'contract-create/:id', component: ContractCreateComponent },
    { path: 'contract-edit/:id', component: ContractEditComponent },
    { path: 'suscription', component: SuscriptionComponent },
    { path: 'musical-view', component: MusicViewComponent },
    { path: 'customer-view', component: CustomerViewComponent },
    { path: 'register-customer', component: RegisterCustomerComponent },
    { path: 'register-enterprice', component: RegisterEnterpriceComponent },
    { path: 'register-musical', component: RegisterMusicalComponent },
    { path: 'enterprice-view', component: EnterpriceViewComponent },
];
