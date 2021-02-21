import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input("mediaQuery") moblieQueryMax: boolean; // Mom Call For this
  @Output("toggle") navToggle = new EventEmitter(); //Call void For Mom Component 
  @Output() sayHai = new EventEmitter<String>(); //Call Parameter For Mom Component

  demonMailNoti = 50;
  demoNoti = 9;
  constructor() { }

  ngOnInit(): void {
  }

  onClickNavToggle() {
    this.navToggle.emit();
    this.sayHai.emit("Hai");
  }


}
