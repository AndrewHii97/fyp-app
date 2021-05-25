import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appLoginError]'
})

export class LoginErrorDirective {

  @Input() public appLoginError : boolean = true;

  constructor(private el: ElementRef) {
    this.highlight();

  }

  private highlight(){ 
    console.log("directive called once")
    if(this.appLoginError){ 
      this.el.nativeElement.style.backgroundColor = 'red';
    }else{ 
      this.el.nativeElement.style.backgroundColor = 'blue';
    }
  }



}
