import ChineseText from './ChineseText';

const translations = {
  0: '零',
  1: '一',
  2: '二',
  3: '三',
  4: '四',
  5: '五',
  6: '六',
  7: '七',
  8: '八',
  9: '九',
  10: '十',
  11: '十一',
  12: '十二',
  13: '十三',
  14: '十四',
  15: '十五',
  16: '十六',
  17: '十七',
  18: '十八',
  19: '十九',
  20: '二十',
  21: '二十一',
  22: '二十二'
} as const;

type ScorecardProps = {
  count: number;
  label: string;
};

export default function Scorecard({ count, label }: ScorecardProps) {
  return (
    <div>
      <ChineseText
        as="div"
        className="grid size-[80px] place-content-center rounded border-4 border-solid border-[#60565A] bg-white text-6xl"
      >
        {/* @ts-expect-error it's unlikely someone scores more than 22 in 2 minutes and 22 seconds */}
        {translations[count]}
      </ChineseText>
      <p>{label}</p>
    </div>
  );
}
