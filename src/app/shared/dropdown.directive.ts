import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {
  @Input('appDropdown') name: string

  @HostBinding('class.show') dropOpen: boolean = false
  @HostListener('click') toggleDrop() {
      this.dropOpen = !this.dropOpen
      this.dropOpen?this.render.addClass(this.elem.nativeElement.querySelector('.dropdown-menu'),'show'):this.render.removeClass(this.elem.nativeElement.querySelector('.dropdown-menu'),'show')
  }

  constructor(private elem: ElementRef, private render: Renderer2) { }

  ngOnInit() {

  }

}
