// shared/components/shared-ui.ts
import { ButtonComponent } from '@shared/components/button/button.component';
import { ControlFeedbackComponent } from '@shared/components/inputs/control-feedback/control-feedback.component';
import { InputTextComponent } from '@shared/components/inputs/input-text/input-text.component';
import { InputPasswordComponent } from '@shared/components/inputs/input-password/input-password.component';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';

export {
  ButtonComponent,
  InputTextComponent,
  InputPasswordComponent,
  ThemeToggleComponent,
  ControlFeedbackComponent,
};

export const SharedUi = [
  ButtonComponent,
  InputTextComponent,
  InputPasswordComponent,
  ThemeToggleComponent,
  ControlFeedbackComponent,
];
