import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreHorizontal } from 'lucide-react';
import { UpdateAccountForm } from '@/features/accounts/components/UpdateAccountForm';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu';
import { DialogFormContent } from '@/ui/dialog-form-content';
import { DialogDeleteContent } from '@/ui/dialog-delete-content';
import { Button } from '@/ui/button';
import { DialogItem } from '@/ui/dialog';

interface IAccountsDropDownProps {
  accountId: string;
}

export const AccountsDropdown: React.FC<IAccountsDropDownProps> = ({
  accountId,
}) => {
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='h-8 w-8 p-0'>
          <span className='sr-only'>Open menu</span>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => navigate(`accounts/${accountId}`)}>
          🔍 See Details
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DialogItem
          triggerChildren='✏️ Edit'
          open={updateDialogOpen}
          onOpenChange={setUpdateDialogOpen}
        >
          <DialogFormContent
            formToRender={UpdateAccountForm}
            formProps={{ accountId, setUpdateDialogOpen }}
          />
        </DialogItem>
        <DialogItem
          triggerChildren='🗑️ Delete'
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
        >
          <DialogDeleteContent
            handleDeleteAccount={() => {
              console.log('delete account');
              setDeleteDialogOpen(false);
            }}
          />
        </DialogItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
