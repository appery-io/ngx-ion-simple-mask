import { NgModule } from '@angular/core';
import { SimpleMaskDirective } from './simple-mask.directive';
import { SimpleMaskPipe } from './simple-mask.pipe';

@NgModule({
  declarations: [
    SimpleMaskDirective,
    SimpleMaskPipe
  ],
  exports: [
    SimpleMaskDirective,
    SimpleMaskPipe
  ]
})

export class SimpleMaskModule {}
