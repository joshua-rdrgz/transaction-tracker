import { currency } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card';
import { ReturnTypeUseAccount } from '@/features/accounts/hooks/useAccount';

interface IAccountDetailsProps {
  account: ReturnTypeUseAccount;
}

export const AccountDetails: React.FC<IAccountDetailsProps> = ({ account }) => {
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
      content: currency(account.balance as number),
    },
    {
      title: 'Difference',
      content: 'difference',
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
            <CardTitle className='text-lg'>{card.title}</CardTitle>
          </CardHeader>
          <CardContent className='font-display text-3xl break-words'>
            {card.content}
          </CardContent>
        </Card>
      ))}
    </section>
  );
};
