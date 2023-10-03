import { currency } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card';
import { Prisma } from '@prisma/client';

interface IAccountDetailsProps {
  account: Prisma.AccountCreateManyInput;
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
      content: currency(account.balance as string | number),
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
            {card.content}
          </CardContent>
        </Card>
      ))}
    </section>
  );
};
