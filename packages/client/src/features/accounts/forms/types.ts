export interface IDialogAccountFormProps {
  /** Receives from DialogFormContent component */
  accountId?: string;

  /** Receives from DialogFormContent component */
  setDialogOpen?: React.Dispatch<React.SetStateAction<boolean>>;

  /** Receives from DialogFormContent component */
  setDropdownOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}
