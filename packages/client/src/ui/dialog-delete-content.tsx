import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/ui/dialog';
import { Button } from '@/ui/button';
import { DialogClose } from '@radix-ui/react-dialog';

interface IDialogDeleteContent {
  handleDelete(): void;
  dialogDescription: string;
}

export const DialogDeleteContent: React.FC<IDialogDeleteContent> = ({
  handleDelete,
  dialogDescription,
}) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogDescription>{dialogDescription}</DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button variant='outline' asChild>
          <DialogClose>Cancel</DialogClose>
        </Button>
        <Button onClick={handleDelete}>Delete</Button>
      </DialogFooter>
    </>
  );
};
