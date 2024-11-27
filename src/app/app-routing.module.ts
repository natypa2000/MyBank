import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountLoginComponent } from './account-login/account-login.component';
import { AccountOwnerComponent } from './account-owner/account-owner.component';
import { BankAccountComponent } from './bank-account/bank-account.component';
import { ChangeBankDetailsComponent } from './change-bank-details/change-bank-details.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ShowTableComponent } from './show-table/show-table.component';
import { DeleteRowComponent } from './delete-row/delete-row.component';



const routes: Routes = [
  //{path: 'ShowStudent', component: ShowStudentComponent},
  { path: 'AccountLogin', component: AccountLoginComponent },
  {path: 'ShowTable', component: ShowTableComponent},
  {path: 'DeleteRow', component: DeleteRowComponent},
  { path: 'BankAccount', component: BankAccountComponent },
  {path: 'ChangeBankDetails' , component: ChangeBankDetailsComponent},
  { path: 'ChangePassword', component: ChangePasswordComponent },
  { path: 'AccountOwner', component: AccountOwnerComponent },
  { path: '', redirectTo: 'ShowStudent', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
