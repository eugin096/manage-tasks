import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild  } from '@angular/core';
import { Toast } from 'bootstrap';
import { fromEvent, take } from 'rxjs';
import { EventTypes } from '../modals/event-types';
@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {
  @Output() disposeEvent = new EventEmitter();

  //Getting the toastElement as a child and taking the reference
  @ViewChild('toastElement', { static: true })
  toastEl!: ElementRef;

  //getting data from the component
  @Input()
  type!: EventTypes;

  @Input()
  title!: string;

  @Input()
  message!: string;

  toast!: Toast;

  ngOnInit(){
    //On component load load the show function
    this.show();
  }

  //Triggered on toast called from the component
  show(){
    //Give the toast configurations
    this.toast = new Toast(
      this.toastEl.nativeElement,
      this.type === EventTypes.Error
        ? {
            autohide: true,
          }
        : {
            delay: 3000,
          }
    );

    //Getting the element and triggering hide function after delay
    fromEvent(this.toastEl.nativeElement, 'hidden.bs.toast')
      .pipe(take(1))
      .subscribe(() => this.hide());

    this.toast.show();
  }

  //destroying the toast after the time finishes
  hide() {
    this.toast.dispose();
    this.disposeEvent.emit();
  }
}
