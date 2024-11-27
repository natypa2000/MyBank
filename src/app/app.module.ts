import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { BankAccountComponent } from './bank-account/bank-account.component';
import { AccountOwnerComponent } from './account-owner/account-owner.component';
import { AccountLoginComponent } from './account-login/account-login.component';
import { ChangeBankDetailsComponent } from './change-bank-details/change-bank-details.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MenuComponent } from './menu/menu.component';
import { ShowTableComponent } from './show-table/show-table.component';
import { DeleteRowComponent } from './delete-row/delete-row.component';
import { ShowStudentComponent } from './show-student/show-student.component';



@NgModule({
  declarations: [
    AppComponent,
    AccountOwnerComponent,
    BankAccountComponent,
    AccountLoginComponent,
    ChangeBankDetailsComponent,
    ChangePasswordComponent,
    PageNotFoundComponent,
    MenuComponent,
    ShowTableComponent,
    DeleteRowComponent,
    ShowStudentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
