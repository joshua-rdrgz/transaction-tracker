import { ControllerRenderProps, FieldPath, FieldValues } from 'react-hook-form';
import { Transaction, Target } from '@prisma/client';

type QueryFn<T> = () => Promise<T>;

type Awaited<T> = T extends Promise<infer U> ? U : T;

export type QueryFnTypecast<QueryFns extends QueryFn<any>[]> = {
  [K in keyof QueryFns]: Awaited<ReturnType<QueryFns[K]>>;
};

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

export interface IHookOptions {
  useReactRouterLoader: boolean;
}

export type ReceivedTarget = Omit<Target, 'date'> & { date: string };
export type ReceivedTransaction = Omit<Omit<Transaction, 'date'>, 'amount'> & {
  date: string;
  amount: string;
};
