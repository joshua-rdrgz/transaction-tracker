import { useAccounts } from '@/features/accounts/hooks/useAccounts';

export function AccountsList() {
  const accounts = useAccounts();
  return (
    <div>
      {accounts.map((account) => (
        <div key={account.id}>
          <div>{account.name}</div>
          <div>{account.bank}</div>
          <div>{account.initialBalance}</div>
        </div>
      ))}
    </div>
  );
}
