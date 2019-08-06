import { Component, OnInit } from '@angular/core';
import { T1Service } from './t1.service'

@Component({
  selector: 'app-t1',
  templateUrl: './t1.component.html',
  styleUrls: ['./t1.component.css'],
  providers:[T1Service]
})
export class T1Component implements OnInit {
  guessNumber:number;
  message:String="";
  enteredNumbers:any
  isTable= false;
  constructor(private t1Service:T1Service) { }

  ngOnInit() {
    this.t1Service.setValue().subscribe(data => {
      console.log(data)
    })
  }

  checkMyGN() {
    if ( this.guessNumber > 100 || this.guessNumber < 1) {
      this.message = "Do you really think "+ this.guessNumber+" is valid. Entered valid Number between 1 - 100"
    }else{
      //alert(this.guessNumber)
      this.t1Service.checkGN(this.guessNumber).subscribe(data => {
        console.log(data)
        this.guessNumber=null
        this.message = data['result']
        if ( this.message == "Congratulations") {
            this.message = " Congrats You got it Correct :)"
            this.isTable = false;
        }else{
          this.entered()
        }
      },err=>{console.log(err);})
    }
  }

  entered() {
    this.t1Service.getEntered().subscribe(data => {
      console.log(data)
      this.enteredNumbers = data['result']
      this.isTable = true;
      console.log("entered",this.enteredNumbers)
    },err=>{console.log(err);})
  }

}
