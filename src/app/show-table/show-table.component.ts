import { Component, OnInit } from '@angular/core';
import { BankDataService } from '../bank-data.service';
import { Router } from '@angular/router';
import { BankTransaction } from '../bank-transaction';
@Component({
  selector: 'app-show-table',
  templateUrl: './show-table.component.html',
  styleUrls: ['./show-table.component.css']
})
export class ShowTableComponent implements OnInit {
  
  recordtrans:BankTransaction[]=this.data_svc.getRecord();
  transName:string[]=this.data_svc.getTransactionName();
  constructor(private router_srv: Router, private data_svc: BankDataService) { }

  ngOnInit(): void {
    this.data_svc.setMenuVisibility(false);
    if (!this.data_svc.userSignedIn())
      this.router_srv.navigateByUrl("/AccountLogin");
  }
  
}
