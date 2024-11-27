import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountOwner } from '../account-owner';
import { BankAccountDetails } from '../bank-account-details';
import { BankDataService } from '../bank-data.service';
import { TransactionType, BankTransaction } from '../bank-transaction';

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.css']
})

export class BankAccountComponent implements OnInit {
  currentAmount: number = 0;
  currentBalance: number = this.data_svc.getCurrentAmount();
  transaction?: BankTransaction = undefined;
  accountDetails: BankAccountDetails= new BankAccountDetails(this.data_svc.getBranchName(), this.data_svc.getBranchNumber(), 113344);
  currentTransactionType: TransactionType = -1;
  allDates:Date[]=[];
  //counter:number=this.data_svc.getCounter();
  currentNumerator:number=this.data_svc.getNumeratorForTable();
  currentTransactionAsmachta: string = "";
  currentTransactionDateS: string = "";
  currentNote?:string;
  currentOwner: AccountOwner = new AccountOwner("plonit almonit", "ta", 129387465);
  transactionTypeNames: string[] = [];
  lastActionFail: boolean = false
 
  
  constructor(private router_srv: Router, private data_svc: BankDataService) {
    //this.transaction = new BankTransaction(1000, undefined, "opening", TransactionType.openAcount);
    //this.accountDetails = new BankAccountDetails(this.accountDetails.branchName);

    for (let optn in TransactionType)
      if (isNaN(Number(optn)))
      {
        this.transactionTypeNames.push(optn);
        this.data_svc.addTransactionName(optn);
      }

  }

  doTransaction(): void {
    this.lastActionFail = false;
    this.currentNumerator=this.data_svc.getNumerator();
    if(this.currentTransactionType*1!=0 && this.currentNumerator==1)
    {
      this.currentTransactionType=TransactionType.openAcount;
      this.transactionTypeNames[0]="openAcount";
      alert("הפיכת פעולת הפקדה ליצירת חשבון.");
    }

    if (this.currentAmount == null || this.currentAmount < 0) {
      showErrorFocus("סכום חייב להיות מספר לא שלילי", "amount");
      return;
    }
    
    if (this.currentTransactionDateS == "") {
      showErrorFocus("תאריך חובה", "taarich");
      return;
    }
    let achshav: Date = new Date();
    let typedDt: Date = new Date(this.currentTransactionDateS);
    if (typedDt > achshav) {
      showErrorFocus("תאריך מאוחר מהיום אסור", "taarich");
      return;
    }
    this.allDates.push(typedDt);
    if(this.allDates[this.currentNumerator-2]>typedDt)
    {
      showErrorFocus("תעריך מוקדם מהתאריך של הפעולה הקודמת אסור","taarich");
      return;
    }
    switch (this.currentTransactionType * 1) {
      case TransactionType.openAcount: this.currentBalance = this.currentAmount;
        break;
      case TransactionType.deposit: this.currentBalance += this.currentAmount;
        break;
      case TransactionType.withdraw: if ((this.currentBalance - this.currentAmount) < this.accountDetails.limit) {
        this.lastActionFail = true;
        return;
      }
        this.currentBalance -= this.currentAmount;
        break;
      default: alert('לא בחרת סוג פעולה');
        return;

    }
    
    if(this.currentTransactionAsmachta.trim()=="")
    {
      this.currentTransactionAsmachta=this.currentNumerator.toString();
    }
    
    this.transaction = new BankTransaction(this.currentAmount, new Date(this.currentTransactionDateS), this.currentTransactionAsmachta.trim(), this.currentTransactionType,this.currentNumerator,this.currentBalance,this.currentNote);
    this.data_svc.addToArray(this.transaction);
    this.currentAmount=0;
    this.currentTransactionDateS="";
    if(parseInt(this.currentTransactionAsmachta)+1==this.currentNumerator)
    {
      this.currentTransactionAsmachta=this.currentNumerator.toString();
    }
    this.currentNote="";
    document.getElementById("amount")?.focus();
  }
  
  toString(): string {
    let ezer = `${this.transaction} into ${this.accountDetails}`;
    return ezer;
  }

  ngOnInit(): void {
    this.data_svc.setMenuVisibility(false);
    if (!this.data_svc.userSignedIn())
      this.router_srv.navigateByUrl("/AccountLogin");

  }
}
function showErrorFocus(msg: string, id: string): void {
  alert(msg);
  document.getElementById(id)?.focus();
}
