export enum TransactionType { openAcount, deposit, withdraw }

export class BankTransaction {
    constructor(public amount: number, public trnDate: Date = new Date(), public asmachta: string, public trnTyp: TransactionType,public numerator:number,public currentBalance:number,public note?:string) { }
    toString(): string {
        return `on ${this.trnDate.toDateString()} a ${TransactionType[this.trnTyp]} of ${this.amount} NIS`;
    }

}
//let t2: BankTransaction = new BankTransaction(1000, undefined, "opening", TransactionType.openAcount);
//console.log(t2.toString());
