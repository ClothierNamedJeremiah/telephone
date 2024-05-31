import clsx from 'clsx';
import ChineseText from 'components/ChineseText';
import NumberGrid from 'components/NumberGrid';

import Link from 'next/link';

export default async function HomePage() {
  return (
    <div className="flex flex-col items-center py-6 text-center">
      <ChineseText as="h1" className="mb-4">
        电话
      </ChineseText>
      <ChineseText as="h2">学习中文数字</ChineseText>
      <Link
        href="/game"
        className={clsx(
          'focus:outline focus:outline-4 focus:outline-offset-2 focus:outline-black',
          'grid content-center',
          'my-6 h-[40px] w-[120px] rounded border border-solid md:my-12',
          'border-button-primary-default bg-button-primary-default text-button-primary-default',
          'transition-colors hover:bg-black/80'
        )}
      >
        Play
      </Link>
      <NumberGrid orientation="vertical" />
    </div>
  );
}
