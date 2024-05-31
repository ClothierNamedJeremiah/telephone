import clsx from 'clsx';
import type { ReactNode } from 'react';

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {
  size: 'h1' | 'h2';
  children: ReactNode;
};

export function Heading(props: HeadingProps) {
  const { size: Component, className: theirClassName, children } = props;

  const classNames = {
    h1: 'md:text-8xl text-5xl',
    h2: 'md:text-6xl text-3xl'
  } as const;

  return (
    <Component className={clsx(theirClassName, classNames[props.size])}>
      {children}
    </Component>
  );
}

type TextProps = React.HTMLAttributes<HTMLParagraphElement> & {
  children: ReactNode;
};

export function Text(props: TextProps) {
  const { children, ...other } = props;
  return <p {...other}>{children}</p>;
}
