import { Injectable} from '@angular/core';
import { UserCredentials } from './user-credentials';
import * as CryptoJS from 'crypto-js';
import { BankTransaction, TransactionType } from './bank-transaction';
import { BankAccountDetails } from './bank-account-details';
import { AccountOwner } from './account-owner';

const USER_CREDENTIALS_KY: string = "USER_CREDENTIALS";
const TARNSACTION_ARRAY_KY: string = "TRANSACTION_ARRAY";
const nomertor_KY: string = "NOMERTOR_KEY";
const BANK_CREDENTIALS_KY:string="BANK_CREDENTIALS";
const USER_DETAILS_KY:string="USER_DETAILS_KY";
const SALT: string = "mko)9Ijn8UhErtb";
const SECRET: string="fdsgsghpafsaf4!f";
@Injectable({
  providedIn: 'root'
})
export class BankDataService {
  private validAction:BankTransaction[] = [];
  private transactionName:string[]=[];
  private numerator:number=0;
  private bank_data:BankAccountDetails=new BankAccountDetails("Big Bank Inc",762,113344);
  private user_details:AccountOwner=new AccountOwner("plonit almonit", "ta", 129387465);
  private counter:number=0;
  currentUser?: UserCredentials;
  theUserCredential: UserCredentials | null = null;// = new UserCredentials("siteAdmin@bigbank.com", "1234");
  private menuVisible:Boolean=false;
  constructor() {
    this.loadFillUser();
    this.loadFillNumerator();
    this.loadFillArray();
    this.loadFillBank();
    this.loadFillUserDetails();
  }
  getMenuVisibility():Boolean
  {
      return this.menuVisible;
  }
  setMenuVisibility(nwStat:Boolean):void
  {
      this.menuVisible=nwStat;
  }
  getNumeratorLength():number{
    return this.validAction[this.validAction.length-1].numerator;
  }
  getRow(num :number):BankTransaction
  {
    for(let i=0;i<this.validAction.length;i++)
    {
      if(this.validAction[i].numerator==num)
      {
        return this.validAction[i];
      }
    }
    alert("לא קיים ערך נומרטור זה אנא נסה שוב");
    return this.validAction[0];
  }
  deleteRow(num:number):boolean|void
  {
    const newTransactionArray:BankTransaction[]=[];
    let balance=this.validAction[num-1].currentBalance;
    for(let i=num+1; i< this.validAction.length;i++)
    {
      const transAction=this.validAction[i];

      balance += transAction.trnTyp==TransactionType.withdraw ? -transAction.amount:transAction.amount;
      if(balance<-2000)
      {
        return alert('לא ניתן לבצע את הפעולה כי היא חורגת מגבולות המותר.')
      }
      newTransactionArray.push(new BankTransaction(transAction.amount, transAction.trnDate, 
        transAction.asmachta, transAction.trnTyp, transAction.numerator , balance, transAction.note));
    }
    this.validAction.splice(num);
    this.validAction=this.validAction.concat(newTransactionArray);
    this.updateArrayStorage();
    return true;
  }
  getCurrentAmount():number
  {
    if(this.validAction.length==0)
    {
      return 0;
    }
    return this.validAction[this.validAction.length-1].currentBalance;
  }
  getCurrentDate():Date{
    if(this.validAction.length==0)
    {
      return new Date();
    }
    return this.validAction[this.validAction.length-1].trnDate;
  }
  updateCounter():number{
    this.counter++;
    //this.updateNumeratorStorage();
    return this.counter;
  }
  
  addTransactionName(transName:string):void{
     this.transactionName.push(transName);
     this.getTransactionName();
  }
  getTransactionName():string[]
  {
    return this.transactionName;
  }
  
  getRecord():BankTransaction[]{
    return this.validAction;
  }
  
  addToArray(trans:BankTransaction):void
  {
    
    this.validAction.push(trans);
    this.updateArrayStorage();
  }
  getNumerator():number
  {
    this.numerator++;
    this.updateNumeratorStorage();
    return this.numerator;
  }
  getNumeratorForTable():number
  {
    return this.numerator;
  }
  
  private loadFillNumerator():void{
    const parmanentStr=this.getDecryptFromLocalStorage(nomertor_KY);
    if(!parmanentStr){
      this.loadInitNumerator();
    }
    else
      try{
          this.numerator=parmanentStr;
      }
      catch(prblm)
      {
        alert("בעיה במקור הנתונים, טוען נתוני Mock");
        this.loadInitNumerator();
      }
  }
  private loadFillUser(): void {
    const parmanentStr: string | null = localStorage.getItem(USER_CREDENTIALS_KY);// the preferd syntax
    //same as const parmanentStr=localStorage[this.parmanentKy];
    if (!parmanentStr) {//אין אחסון של נתונים בלוקל סטורג
      this.loadInitUserCredentialsData();
    }
    else
      try {//ניסיון לטעון הנתונים מהלוקל סטורג
        this.theUserCredential = JSON.parse(parmanentStr);
      }
      catch (prblm) {//הנתונים בלוקל סטורג לא תקינים
        alert("בעיה במקור הנתונים, טוען נתוני Mock");
        this.loadInitUserCredentialsData();
      }
  }
  private loadFillArray(): void {
    const parmanentStr=this.getDecryptFromLocalStorage(TARNSACTION_ARRAY_KY);// the preferd syntax
    //same as const parmanentStr=localStorage[this.parmanentKy];
    if (!parmanentStr) {//אין אחסון של נתונים בלוקל סטורג
      this.loadInitUserArrayData();
    }
    else
      try {//ניסיון לטעון הנתונים מהלוקל סטורג
        this.validAction = parmanentStr;
      }
      catch (prblm) {//הנתונים בלוקל סטורג לא תקינים
        alert("בעיה במקור הנתונים, טוען נתוני Mock");
        this.loadInitUserArrayData();
      }
  }
  private loadFillBank():void 
  {
    const parmanentStr=this.getDecryptFromLocalStorage(BANK_CREDENTIALS_KY);// the preferd syntax
    //same as const parmanentStr=localStorage[this.parmanentKy];
    if (!parmanentStr) {//אין אחסון של נתונים בלוקל סטורג
      this.loadInitBankCredentialsData();
    }
    else
      try {//ניסיון לטעון הנתונים מהלוקל סטורג
        this.bank_data = parmanentStr;
      }
      catch (prblm) {//הנתונים בלוקל סטורג לא תקינים
        alert("בעיה במקור הנתונים, טוען נתוני Mock");
        this.loadInitBankCredentialsData();
      }
  }
  private loadFillUserDetails():void{
    const parmanentStr=this.getDecryptFromLocalStorage(USER_DETAILS_KY);// the preferd syntax
    //same as const parmanentStr=localStorage[this.parmanentKy];
    if (!parmanentStr) {//אין אחסון של נתונים בלוקל סטורג
      this.loadInitUserDetailsData();
    }
    else
      try {//ניסיון לטעון הנתונים מהלוקל סטורג
        this.user_details = parmanentStr;
      }
      catch (prblm) {//הנתונים בלוקל סטורג לא תקינים
        alert("בעיה במקור הנתונים, טוען נתוני Mock");
        this.loadInitUserDetailsData();
      }
  }
  isCredentialOk(inVlus: UserCredentials): boolean {
    return (inVlus.eml == this.theUserCredential?.eml && this.encrptPwd(inVlus.pwd) == this.theUserCredential.pwd);
  }
  encrptPwd(pwd: string): string {
    return CryptoJS.SHA3(pwd + SALT, { outputLength: 512 }).toString();
  }
  loadInitNumerator():void{
    const x:number=0;
    const t=JSON.stringify(x);
    this.numerator=JSON.parse(t);
    this.updateNumeratorStorage();
  }
  loadInitUserCredentialsData(): void {
    const t: string = JSON.stringify(new UserCredentials("siteAdmin@bigbank.com", this.encrptPwd("1234")));
    this.theUserCredential = JSON.parse(t);
    this.updateUSerStorage();
  }
  loadInitUserArrayData(): void {
    const x:BankTransaction[] = [];
    const t: string = JSON.stringify(x);
    this.validAction = JSON.parse(t);
    this.updateArrayStorage();
  }
 
  loadInitBankCredentialsData():void
  {
    const t:string=JSON.stringify(new BankAccountDetails(this.bank_data.branchName,this.bank_data.branchNumber,113344));
    
    this.bank_data=JSON.parse(t);
    this.updateBankStorage();
  }
  loadInitUserDetailsData():void{
    const t: string = JSON.stringify(new AccountOwner(this.user_details.name, this.user_details.address, 129387465));
    this.user_details = JSON.parse(t);
    this.updateUSerDetailsStorage();
  }
  updateNumeratorStorage():void{
    this.updateLocalStorage(nomertor_KY,this.numerator);
  }
  updateArrayStorage(): void {
    this.updateLocalStorage(TARNSACTION_ARRAY_KY, this.validAction);
  }
  updateUSerStorage(): void {
    const savedStr = JSON.stringify(this.theUserCredential);
    try {
      localStorage.setItem(USER_CREDENTIALS_KY, savedStr); // the preferd syntax
      // same as localStorage[this.parmanentKy]=savedStr
    }
    catch (prblm) {
      alert("שמירת הנתונים נכשלה");
    }
  }
  updateBankStorage():void
  {
    this.updateLocalStorage(BANK_CREDENTIALS_KY,this.bank_data);
  }
  updateUSerDetailsStorage():void
  {
    this.updateLocalStorage(USER_DETAILS_KY,this.user_details);
  }
  encryptStorage(value: string){
    return CryptoJS.AES.encrypt(value,SECRET).toString();
  }
  decryptStorage(value:string):string{
    return CryptoJS.AES.decrypt(value,SECRET).toString(CryptoJS.enc.Utf8);
  }
  updateLocalStorage(key:string, value:any){
    try{
      const json= JSON.stringify(value);
      const encrypted=this.encryptStorage(json);
      localStorage.setItem(key,encrypted);
    }
    catch(prblm){
      alert("שמירת נתונים נכשלה");
    }
  }
  getDecryptFromLocalStorage(key: string)
  {
    try{
      const encryptJson=localStorage.getItem(key);
      if(!encryptJson){
        return;
      }
      const decryptJson = this.decryptStorage(encryptJson);
      return JSON.parse(decryptJson);
    }
    catch(err)
    {
      alert("טעינת הנתונים נכשלה");
    }
  }
  setCurrentUsr(usr: UserCredentials): void {
    this.currentUser = usr;

  }

  userSignedIn(): boolean {
    return this.currentUser != undefined;
  }

  userDisconnect(): void {
    this.currentUser = undefined;
  }

  isPwdOk(typdPwd: string): boolean {
    return (this.theUserCredential?.pwd + "" == this.encrptPwd(typdPwd));
  }

  changePwd(nwPwd: string): void {
    if (this.theUserCredential)
    {
      this.theUserCredential.pwd = this.encrptPwd(nwPwd);
      this.updateUSerStorage();
    }

  }
  changeOwnerDetails(name:string, address:string):void{
    this.user_details.name=name;
    this.user_details.address=address;
    this.updateUSerDetailsStorage();
  }
  getName():string{
    return this.user_details.name;
  }
  getAddress():string{
    return this.user_details.address;
  }
  changeBankDetails(name:string, number:number):void{
    this.bank_data.branchName=name;
    this.bank_data.branchNumber=number;
    this.updateBankStorage();
  }
  getBranchNumber():number {
   
      return this.bank_data.branchNumber;
    
  }
  getBranchName():string{
    
      return this.bank_data.branchName;
    
  }
  getAccountNumber():number{return this.bank_data.accountNumber;}
}
