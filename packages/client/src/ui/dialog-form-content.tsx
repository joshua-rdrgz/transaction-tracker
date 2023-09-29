import { useRef } from 'react';
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/ui/dialog';
import { Button } from '@/ui/button';
import { DialogClose } from '@radix-ui/react-dialog';

interface IFormDialogContentProps {
  formToRender: React.ForwardRefExoticComponent<
    React.RefAttributes<HTMLButtonElement>
  >;
  formProps?: any;
}

export const DialogFormContent = ({
  formToRender: FormToRender,
  formProps,
}: IFormDialogContentProps) => {
  const submitBtnRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <DialogHeader>
        <DialogTitle>Edit Your Account</DialogTitle>
        <DialogDescription>
          Please choose a new name or bank, or initial balance!
        </DialogDescription>
      </DialogHeader>
      {<FormToRender ref={submitBtnRef} {...formProps} />}
      <DialogFooter>
        <Button variant='outline' asChild>
          <DialogClose>Cancel</DialogClose>
        </Button>
        <Button type='submit' onClick={() => submitBtnRef.current?.click()}>
          Edit Account
        </Button>
      </DialogFooter>
    </>
  );
};
