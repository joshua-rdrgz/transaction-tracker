import { ControllerRenderProps, FieldPath, FieldValues } from 'react-hook-form';

export interface IDialogFormProps {
  /** Receives from DialogFormContent component */
  setDialogOpen?: React.Dispatch<React.SetStateAction<boolean>>;

  /** Receives from DialogFormContent component */
  setDropdownOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IDialogFormPropsReceivesAccount extends IDialogFormProps {
  /** Receives from DialogFormContent component */
  accountId?: string;
}

export interface IDialogFormPropsReceivesTransaction extends IDialogFormProps {
  /** Receives from DialogFormContent component */
  transactionId?: string;
}

export interface ICustomFormComponentProps<
  T extends FieldValues,
  U extends FieldPath<T>
> {
  field?: ControllerRenderProps<T, U>;
}

export interface IRechartsPieData {
  value: number;
  label: string;
  color: string;
  [key: string]: any;
}

export interface IRechartsAreaData {
  name: string;
  [key: string]: any;
}
