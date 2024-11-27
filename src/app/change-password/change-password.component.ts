import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BankDataService } from '../bank-data.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  crntPwd: string = "";
  nwPwd: string = "";
  reNwPwd: string = "";
  jobDone: boolean = false;
  constructor(private router_srv: Router, private data_svc: BankDataService) { }

  ngOnInit(): void {
    this.data_svc.setMenuVisibility(true);
    if (!this.data_svc.userSignedIn())
      this.router_srv.navigateByUrl("/AccountLogin");
  }

  updIt(): void {
    if (this.crntPwd.trim() == "" || this.nwPwd.trim() == "" || this.reNwPwd.trim() == "") {
      alert("אחד או יותר משדות הקלט ריקים");
      return;
    }
    if (!this.data_svc.isPwdOk(this.crntPwd.trim())) {
      alert("סיסמא נוכחת שגויה");
      return;
    }
    if (this.nwPwd.trim() != this.reNwPwd.trim()) {
      alert("סיסמא מבוקשת שונה מוידוא מבוקשת ");
      return;
    }
    if (this.nwPwd.trim() == this.crntPwd.trim()) {
      alert("סיסמא מבוקשת חייבת להיות שונה מנוכחית ");
      return;
    }
    this.jobDone = true;
    this.data_svc.changePwd(this.nwPwd.trim());

  }
}
