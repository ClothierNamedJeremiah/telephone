import clsx from 'clsx';
import { Ma_Shan_Zheng } from 'next/font/google';

const ma_shan_zheng = Ma_Shan_Zheng({
  weight: '400',
  subsets: ['latin'],
  display: 'swap'
});

type Props = {
  as: 'div' | 'span' | 'p' | 'h1' | 'h2';
  className?: string;
  children: string;
};

export default function ChineseText(props: Props) {
  const { as: Component, className, children } = props;

  const headingStyles = {
    h1: 'md:text-8xl text-5xl',
    h2: 'md:text-6xl text-3xl'
  } as const;

  return (
    <Component
      className={clsx(
        ma_shan_zheng.className,
        // @ts-expect-error we're okay with undefined for this
        headingStyles[props.as],
        className
      )}
      lang="zh-CN"
    >
      {children}
    </Component>
  );
}
