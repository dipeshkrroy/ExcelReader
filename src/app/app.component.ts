import { ReadKeyExpr } from '@angular/compiler';
import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'excelReader';
  data:[][];
  onFileUpload(evt:any){
    const target : DataTransfer = <DataTransfer> (evt.target);

    if(target.files.length !=1) throw new Error("Please upload single file at once");
    const reader:FileReader = new FileReader();
    reader.onload = (e:any) =>{
      const bstr:string = e.target.result;

      const wb: XLSX.WorkBook = XLSX.read( bstr,{type: 'binary'});
      const wsname = wb.SheetNames[0];
      const ws:XLSX.WorkSheet = wb.Sheets[wsname];
      console.log(ws);
      this.data =(XLSX.utils.sheet_to_json(ws,{header: 1}));
      console.log(this.data)
    }
    reader.readAsBinaryString(target.files[0]);
  }
}
