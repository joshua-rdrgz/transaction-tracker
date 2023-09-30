import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UpdateAccountForm } from '@/features/accounts/forms/UpdateAccountForm';
import { DeleteAccount } from '@/features/accounts/components/DeleteAccount';
import { DialogFormContent } from '@/ui/dialog-form-content';
import { DialogDropdownItem } from '@/ui/dialog';
import { TableDropdown } from '@/ui/table-dropdown';
import { DropdownMenuItem, DropdownMenuSeparator } from '@/ui/dropdown-menu';

interface IAccountsDropDownProps {
  accountId: string;
}

export const AccountsDropdown: React.FC<IAccountsDropDownProps> = ({
  accountId,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <TableDropdown open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenuItem onClick={() => navigate(`accounts/${accountId}`)}>
        🔍 See Details
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DialogDropdownItem
        triggerChildren='✏️ Edit'
        open={updateDialogOpen}
        onOpenChange={setUpdateDialogOpen}
      >
        <DialogFormContent
          formToRender={UpdateAccountForm}
          formProps={{
            accountId,
            setDialogOpen: setUpdateDialogOpen,
            setDropdownOpen,
          }}
          dialogTitle='Edit Your Account'
          dialogDescription='Choose a new name, bank, and initial balance for your account.'
          actionBtnText='Edit Account'
        />
      </DialogDropdownItem>
      <DialogDropdownItem
        triggerChildren='🗑️ Delete'
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
      >
        <DeleteAccount
          onClose={() => {
            setDeleteDialogOpen(false);
            setDropdownOpen(false);
          }}
          accountId={accountId}
        />
      </DialogDropdownItem>
    </TableDropdown>
  );
};
