import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BankDataService } from '../bank-data.service';
import { BankTransaction } from '../bank-transaction';
import { TransactionType } from '../bank-transaction';

@Component({
  selector: 'app-delete-row',
  templateUrl: './delete-row.component.html',
  styleUrls: ['./delete-row.component.css']
})
export class DeleteRowComponent implements OnInit {
  
  transaction:BankTransaction=new BankTransaction(0,new Date(),"",TransactionType.openAcount,0,0);
  rowNum:number=0;
  transName:string="";
  flag:boolean=false;

  constructor(private router_srv: Router, private data_svc: BankDataService) { }

  ngOnInit(): void {
    this.data_svc.setMenuVisibility(true);
    if (!this.data_svc.userSignedIn())
      this.router_srv.navigateByUrl("/AccountLogin");
  }
  findRow():BankTransaction{

    if(this.rowNum>this.data_svc.getNumeratorLength())
    {
      alert("המספר שהכנסת גדול ממספר הנומרטורים בטבלה");
      this.router_srv.navigateByUrl("/ShowTable");
    }
    this.transaction=this.data_svc.getRow(this.rowNum);
    if(this.transaction.trnTyp==0)
    {
      this.transName="openAcount";
    }
    if(this.transaction.trnTyp==1)
    {
      this.transName="deposit";
    }
    if(this.transaction.trnTyp==2)
    {
      this.transName="withdraw";
    }
    this.flag=true;
    return this.transaction;
  }
  deleteRow():void{
    if(this.flag==false)
    {
      alert("אנא תלחץ על הראה שורה לפני שאתה מעוניין למחוק שורה.");
      return;
    }
    if(this.rowNum>this.data_svc.getNumeratorLength())
    {
      alert("המספר שהכנסת גדול ממספר השורות בטבלה");
      this.router_srv.navigateByUrl("/ShowTable");
    }
    if(this.rowNum==1 || this.transName=="OpenAcount")
    {
      alert("את/ה לא יכול/ה למחוק את השורה הראשונה כי היא פותחת את החשבון.");
      return;
    }
    if(confirm(`האם למחוק תנועה ${this.rowNum} זו?`))
    {
    this.data_svc.deleteRow(this.rowNum-1);
    this.flag=false;
    }
    else
      return;
  }
}
