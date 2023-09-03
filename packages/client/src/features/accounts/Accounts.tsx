import { useState } from 'react';
import zodSchemas from 'shared-zod-schemas';

import { Input } from '@/ui/input';

interface IAddAccountsProps {
  accounts?: string[];
}

export function Accounts({
  accounts: accountsFromProps = [],
}: IAddAccountsProps) {
  return <div>Adding Accounts</div>;
}
