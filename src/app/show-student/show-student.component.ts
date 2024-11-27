import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BankDataService } from '../bank-data.service';

@Component({
  selector: 'app-show-student',
  templateUrl: './show-student.component.html',
  styleUrls: ['./show-student.component.css']
})
export class ShowStudentComponent implements OnInit {
  constructor(private router_srv: Router, private data_svc: BankDataService){}

  getCounter():boolean
  {
    if(this.data_svc.getNumeratorForTable()!=0)
    {
      return true;
    }
    return false;
  }

  ngOnInit(): void {
    this.data_svc.setMenuVisibility(true);
  }
}
