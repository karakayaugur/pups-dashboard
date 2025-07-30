import {
  Component,
  computed,
  Input,
  Optional,
  Self,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ControlFeedbackComponent } from '@shared/components/inputs/control-feedback/control-feedback.component';

@Component({
  selector: 'ui-input-text',
  imports: [CommonModule, ControlFeedbackComponent],
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css'],
})
export class InputTextComponent {
  @Input() type: string = 'text';
  @Input() label?: string;
  @Input() icon?: string;
  @Input() tooltip?: string;
  @Input() placeholder?: string;
  @Input() required: boolean = false;
  @Input() autocomplete: 'on' | 'off' = 'off';

  disabled = false;

  value: any;

  error = computed(() => {
    const errors = this.control?.errors;
    if (!errors) return null;

    if (errors['required']) {
      return 'This field is required.';
    }
    if (errors['email']) {
      return 'Please enter a valid email address.';
    }
    if (errors['minlength']) {
      return `Minimum length is ${errors['minlength'].requiredLength} characters.`;
    }
    if (errors['maxlength']) {
      return `Maximum length is ${errors['maxlength'].requiredLength} characters.`;
    }
    if (errors['pattern']) {
      return 'Invalid format.';
    }
    return null;
  });

  private onChange = (value: any) => {};
  public onTouched = () => {};

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  updateValue(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
    this.onTouched();
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  get control(): FormControl | null {
    return this.ngControl?.control as FormControl;
  }
}
