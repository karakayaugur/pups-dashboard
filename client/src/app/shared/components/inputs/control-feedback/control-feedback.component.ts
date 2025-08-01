import { Component, computed, Input, Optional, Self } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ui-control-feedback',
  templateUrl: './control-feedback.component.html',
  styleUrls: ['./control-feedback.component.css'],
})
export class ControlFeedbackComponent {
  @Input() control!: FormControl;

  visible(): boolean {
    return (
      !!this.control &&
      this.control.invalid &&
      (this.control.touched || this.control.dirty)
    );
  }

  get feedback(): String | null {
    const errors = this.control?.errors;
    if (!errors) return null;

    if (errors['required']) return 'This field is required.';
    if (errors['email']) return 'Please enter a valid email address.';
    if (errors['minlength'])
      return `Minimum length is ${errors['minlength'].requiredLength} characters.`;
    if (errors['maxlength'])
      return `Maximum length is ${errors['maxlength'].requiredLength} characters.`;
    if (errors['pattern']) return 'Invalid format.';
    return 'Invalid input.';
  }

  // TODO : Formcontrol signal olmadigi icin bu alani computed ile yapamadim.
}
