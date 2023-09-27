import { BeatLoader } from 'react-spinners';

interface ISpinnerProps {
  size: number;
  fullScreen?: boolean;
  colorOveride?: string;
}

export const Spinner: React.FC<ISpinnerProps> = ({
  size,
  fullScreen,
  colorOveride,
}) => {
  if (fullScreen)
    return (
      <main className='w-screen h-screen flex justify-center items-center'>
        <BeatLoader
          size={size}
          color={colorOveride ? colorOveride : '#883d1a'}
        />
      </main>
    );

  return (
    <BeatLoader size={size} color={colorOveride ? colorOveride : '#883d1a'} />
  );
};
