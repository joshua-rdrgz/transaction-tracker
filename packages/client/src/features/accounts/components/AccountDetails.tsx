import { currency } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card';
import { Prisma } from '@prisma/client';
import { useAccountBalance } from '../hooks/useAccountBalance';
import { Spinner } from '@/ui/spinner';

interface IAccountDetailsProps {
  account: Prisma.AccountCreateManyInput;
}

export const AccountDetails: React.FC<IAccountDetailsProps> = ({ account }) => {
  const { isCalculatingBalance, accountBalance } = useAccountBalance(
    account.id as string
  );

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
      content: currency(accountBalance as number),
      isLoading: isCalculatingBalance,
    },
    {
      title: 'Difference',
      content: 'difference',
    },
  ];

  return (
    <section className='flex justify-between'>
      {cards.map((card, cardIdx) => (
        <Card className='text-center' key={`account-card-${cardIdx + 1}`}>
          <CardHeader className='p-2'>
            <CardTitle className='font-display text-lg'>{card.title}</CardTitle>
          </CardHeader>
          <CardContent className='text-3xl break-words'>
            {card.isLoading ? <Spinner size={10} /> : card.content}
          </CardContent>
        </Card>
      ))}
    </section>
  );
};
