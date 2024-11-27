import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BankDataService } from '../bank-data.service';
import { UserCredentials } from '../user-credentials';

@Component({
  selector: 'app-account-login',
  templateUrl: './account-login.component.html',
  styleUrls: ['./account-login.component.css']
})
export class AccountLoginComponent implements OnInit {
  doel:string="";
  sisma:string="";
  constructor(private data_svc:BankDataService,private router_srv:Router) { }

  ngOnInit(): void {
    this.data_svc.setMenuVisibility(true);
    if (!this.data_svc.userSignedIn())
      this.router_srv.navigateByUrl("/AccountLogin");
  }
  login():void{
    const tUser=new UserCredentials(this.doel.trim(),this.sisma.trim());
    if (this.data_svc.isCredentialOk(tUser))
    {
      this.data_svc.setCurrentUsr(tUser);
      this.router_srv.navigateByUrl("/BankAccount");
    }
    else
    {
      alert("שם המשתמש או הסיסמא או הצירוף שגוי");
      document.getElementById("uid")?.focus();
    }
  }
}