import { ChangeEvent, FocusEvent, ReactNode } from 'react';

// Calculator component
interface FormState {
  weight : number | null;
  height : number | null;
  age: number | null;
  activityFactor: number | null;
  output: number | null;
}

const InitialFormState: FormState = {
  weight: null,
  height: null,
  age: null,
  activityFactor: null,
  output:null,
};

// Textfield component
interface TextfieldProps {
  label: string;
  type?: string;
  name: string;
  value?: any;
  legend?: string;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
}

// Button component
interface ButtonProps {
  children: ReactNode;
  disabled?: boolean;
  className?: string;
  onClick: () => void;
}

export type { FormState, TextfieldProps, ButtonProps };
export { InitialFormState };
