import clsx from 'clsx';
import { Ma_Shan_Zheng } from 'next/font/google';

const ma_shan_zheng = Ma_Shan_Zheng({
  weight: '400',
  subsets: ['latin'],
  display: 'swap'
});

export default function NumberGrid({
  orientation
}: {
  orientation: 'horizontal' | 'vertical';
}) {
  const CHARACTERS = [
    '一',
    '二',
    '三',
    '四',
    '五',
    '六',
    '七',
    '八',
    '九',
    '十'
  ] as const;

  return (
    <div
      className={clsx(
        ma_shan_zheng.className,
        'text-3xl md:text-6xl',
        'grid gap-2 md:gap-4',
        orientation === 'vertical' &&
          'grid-flow-col grid-cols-[repeat(2,48px)] grid-rows-[repeat(5,48px)] md:grid-cols-[repeat(2,60px)] md:grid-rows-[repeat(5,60px)]',
        orientation === 'horizontal' &&
          'grid-flow-row grid-cols-[repeat(5,48px)] grid-rows-[repeat(2,48px)] md:grid-cols-[repeat(5,60px)] md:grid-rows-[repeat(2,60px)]'
      )}
      lang="zh-CN"
    >
      {CHARACTERS.map((character) => (
        <span key={character}>{character}</span>
      ))}
    </div>
  );
}
