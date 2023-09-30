import { useRef } from 'react';
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/ui/dialog';
import { Button } from '@/ui/button';
import { DialogClose } from '@radix-ui/react-dialog';

interface IDialogFormContentProps {
  formToRender: React.ForwardRefExoticComponent<
    React.RefAttributes<HTMLButtonElement>
  >;
  formProps?: any;
  dialogTitle: string;
  actionBtnText: string;
  dialogDescription?: string;
  cancelBtnText?: string;
}

export const DialogFormContent = ({
  formToRender: FormToRender,
  formProps,
  dialogTitle,
  actionBtnText,
  dialogDescription,
  cancelBtnText = 'Cancel',
}: IDialogFormContentProps) => {
  const submitBtnRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <DialogHeader>
        <DialogTitle>{dialogTitle}</DialogTitle>
        {dialogDescription && (
          <DialogDescription>{dialogDescription}</DialogDescription>
        )}
      </DialogHeader>
      {<FormToRender ref={submitBtnRef} {...formProps} />}
      <DialogFooter>
        <Button variant='outline' asChild>
          <DialogClose>{cancelBtnText}</DialogClose>
        </Button>
        <Button type='submit' onClick={() => submitBtnRef.current?.click()}>
          {actionBtnText}
        </Button>
      </DialogFooter>
    </>
  );
};
