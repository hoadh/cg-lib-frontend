import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message/message.component';
import { ModalComponent } from './modal/modal.component';


@NgModule({
  declarations: [MessageComponent, ModalComponent],
  imports: [
    CommonModule
  ],
  exports: [MessageComponent]
})
export class SharedModule { }
