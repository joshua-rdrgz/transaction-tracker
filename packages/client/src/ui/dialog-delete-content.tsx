import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/ui/dialog';
import { Button } from '@/ui/button';
import { DialogClose } from '@radix-ui/react-dialog';

interface IDialogDeleteContent {
  handleDeleteAccount(): void;
}

export const DialogDeleteContent: React.FC<IDialogDeleteContent> = ({
  handleDeleteAccount,
}) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your bank
          account and all associated transactions.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button variant='outline' asChild>
          <DialogClose>Cancel</DialogClose>
        </Button>
        <Button onClick={handleDeleteAccount}>Delete</Button>
      </DialogFooter>
    </>
  );
};
