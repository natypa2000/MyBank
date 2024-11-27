import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BankDataService } from '../bank-data.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private data_svc: BankDataService, private router_srv:Router) { }

  ngOnInit(): void {
    this.data_svc.setMenuVisibility(false);
    if (!this.data_svc.userSignedIn())
      this.router_srv.navigateByUrl("/AccountLogin");
  }

}
