import { startOfMonth } from 'date-fns';
import { currency } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card';
import { ReturnTypeUseAccount } from '@/features/accounts/hooks/useAccount';
import { useAccountBalance } from '@/features/accounts/hooks/useAccountBalance';

interface IAccountDetailsProps {
  account: ReturnTypeUseAccount;
}

export const AccountDetails: React.FC<IAccountDetailsProps> = ({ account }) => {
  const { accountBalance } = useAccountBalance({ accountId: account.id });
  const { accountBalance: acctBalBeginningOfMonth } = useAccountBalance({
    accountId: account.id,
    toDate: new Date(startOfMonth(Date.now())),
  });

  const acctDifference = accountBalance! - acctBalBeginningOfMonth!; // accountPageLoader ensures data

  const cards = [
    {
      title: 'Account Name',
      content: account.name,
    },
    {
      title: 'Account Bank',
      content: account.bank,
    },
    {
      title: 'Current Balance',
      content: currency(accountBalance!), // accountPageLoader ensures data
    },
    {
      title: 'Diff From Beginning of Month',
      content:
        acctDifference > 0
          ? `+ ${currency(acctDifference)}`
          : currency(acctDifference),
    },
  ];

  return (
    <section className='flex flex-wrap gap-2 justify-center lg:flex-nowrap'>
      {cards.map((card, cardIdx) => (
        <Card
          className='flex flex-col justify-center text-center w-full shadow-md dark:shadow-secondary'
          key={`account-card-${cardIdx + 1}`}
        >
          <CardHeader className='p-2'>
            <CardTitle className='text-lg font-normal'>{card.title}</CardTitle>
          </CardHeader>
          <CardContent className='font-display text-3xl break-words font-bold'>
            {card.content}
          </CardContent>
        </Card>
      ))}
    </section>
  );
};
