import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/ui/button';
import { Calendar } from '@/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover';
import { FieldPath, FieldValues } from 'react-hook-form';
import { SelectSingleEventHandler } from 'react-day-picker';
import { ICustomFormComponentProps } from '@/lib/types';

export function DatePicker<T extends FieldValues, U extends FieldPath<T>>({
  field,
}: ICustomFormComponentProps<T, U>) {
  const [date, setDate] = useState<Date | undefined>(field?.value || undefined);

  const onDateChange: SelectSingleEventHandler = (date) => {
    field?.onChange(date);
    setDate(date);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[280px] justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <Calendar
          mode='single'
          selected={date}
          onSelect={onDateChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
