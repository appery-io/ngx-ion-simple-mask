import { Directive, HostListener, Input, Self, Optional, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';
import { SimpleMask } from './simple-mask';

@Directive({
  selector: '[simpleMask]',
  standalone: false
})
export class SimpleMaskDirective extends SimpleMask {
  @Input('simpleMask') override mask: string = "";
  @Input() clearIfNotMatch: boolean = false;
  @Input() override fillWithExpected: boolean = false;

  constructor(
    private renderer: Renderer2,
    @Self() @Optional() private ngControl: NgControl | null
  ) {
    super();
    console.log("SimpleMaskDirective");
  }

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const el: HTMLInputElement = <HTMLInputElement>event.target;
    const value = this.fitToMask(el.value);
    this.writeValue(value, event.target);
  }

  @HostListener('blur', ['$event'])
  onBlur(event: Event) {
    const el: HTMLInputElement = <HTMLInputElement>event.target;
    if (el.value && !this.matchMask(el.value) && this.clearIfNotMatch) {
      this.writeValue(null, event.target);
    }
  }

  @HostListener('ionBlur', ['$event'])
  inputOnblur(event: Event): void {
    this.onBlur(event);
  }

  @Input('addPatterns')
  set addPatterns(values: any) {
    this.setPatterns(values);
  }

  @Input('newPatterns')
  set newPatterns(values: any) {
    this.setPatterns(values, true);
  }

  private writeValue(value: string | null, target: any): void {
    this.renderer.setProperty(target, 'value', value);
    if (this.ngControl && this.ngControl.control) {
      this.ngControl.control.setValue(value);
      this.ngControl.control.markAsDirty();
      this.ngControl.control.updateValueAndValidity();
    }
  }

  private matchMask(value: string): boolean {
    const size = this.mask.replace(/\\(?!\\)/g, '').length;
    value = value.substring(0, size);
    return value.length === size;
  }
}
