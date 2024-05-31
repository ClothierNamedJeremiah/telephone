import clsx from 'clsx';
import { ReactNode } from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant: 'primary' | 'secondary';
};

export default function Button(props: ButtonProps) {
  const {
    children,
    className: theirClassName,
    type: theirType,
    variant,
    ...other
  } = props;

  const classNames = {
    primary:
      'bg-button-primary-default border-button-primary-default text-button-primary-default' +
      ' hover:bg-black/80 transition-colors',
    secondary:
      'bg-button-secondary-default border-button-secondary-default text-button-secondary-default' +
      ' hover:bg-black/20 transition-colors'
  } as const;

  return (
    <button
      className={clsx(
        theirClassName,
        classNames[variant],
        'h-[40px] w-[120px] rounded border border-solid',
        'focus:outline focus:outline-4 focus:outline-offset-2 focus:outline-black'
      )}
      type={theirType || 'button'}
      {...other}
    >
      {children}
    </button>
  );
}
