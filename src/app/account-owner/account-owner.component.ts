import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountOwner } from 'src/app/account-owner';
import { BankDataService } from '../bank-data.service';


@Component({
  selector: 'app-account-owner',
  templateUrl: './account-owner.component.html',
  styleUrls: ['./account-owner.component.css']
})
export class AccountOwnerComponent implements OnInit {
  @Input() owner:AccountOwner=new AccountOwner(this.data_svc.getName(),this.data_svc.getAddress(),129387465);
  @Input() edit?:boolean;
 action:boolean=false;
  name:string=this.data_svc.getName();
  address:string=this.data_svc.getAddress();
  nameOrig:string="";
  addressOrig:string="";

  constructor(private data_svc: BankDataService, private router_srv:Router) { 
   }
   changeButton():void{this.action=!this.action;}

   changeDetails():void
   {
    this.data_svc.changeOwnerDetails(this.name.trim(),this.address.trim());
   }
   revert():void{
    this.name=this.nameOrig;
    this.address=this.addressOrig;
    this.data_svc.changeOwnerDetails(this.name,this.address);
  }
  ngOnInit(): void {
    this.data_svc.setMenuVisibility(false);
    if (!this.data_svc.userSignedIn())
      this.router_srv.navigateByUrl("/AccountLogin");
    this.nameOrig=this.name;
    this.addressOrig=this.address;
  }
}
