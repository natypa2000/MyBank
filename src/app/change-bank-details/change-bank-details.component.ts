import { Component, Input,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BankDataService } from '../bank-data.service';
import { BankAccountDetails } from '../bank-account-details';

@Component({
  selector: 'app-change-bank-details',
  templateUrl: './change-bank-details.component.html',
  styleUrls: ['./change-bank-details.component.css']
})
export class ChangeBankDetailsComponent implements OnInit {
  @Input() bank:BankAccountDetails=new BankAccountDetails(this.data_svc.getBranchName(),this.data_svc.getBranchNumber(),this.data_svc.getAccountNumber());
  

  branchName:string=this.data_svc.getBranchName();
  branchNumber:number=this.data_svc.getBranchNumber();
  branchNameOrig:string="";
  branchNumberOrig:number=0;
  action:boolean=false;
  
  constructor(private router_srv: Router, private data_svc: BankDataService) { }
  changeButton():void{this.action=!this.action;}
changeDetails():void{
  this.data_svc.changeBankDetails(this.branchName,this.branchNumber);
}
revert():void{
  this.branchName=this.branchNameOrig;
  this.branchNumber=this.branchNumberOrig;
  this.data_svc.changeBankDetails(this.branchName,this.branchNumber);
}
  ngOnInit(): void {
    this.data_svc.setMenuVisibility(false);
    if (!this.data_svc.userSignedIn())
      this.router_srv.navigateByUrl("/AccountLogin");
    this.branchNameOrig=this.branchName;
    this.branchNumberOrig=this.branchNumber;
  }
}
