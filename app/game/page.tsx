'use client';

import { useReducer, useState } from 'react';

import AudioInput from 'components/AudioInput';
import Button from 'components/Button';
import ChineseText from 'components/ChineseText';
import NumberGrid from 'components/NumberGrid';
import Scorecard from 'components/Scorecard';
import useStopWatch from 'hooks/useStopwatch';
import { numberToMinutesAndSeconds, shuffleArray } from '../../src/utils';
import reducer, { ACTIONS } from './reducer';

const AUDIO_SAMPLES: Array<{ answer: string; src: string }> = [
  {
    answer: '九零五六九十',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/b6cd5583-f80c-4194-9bc4-91b030359759.mp3'
  },
  {
    answer: '四六二三二三',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/4b8edf86-93ca-4c46-aa43-40c4c412ef08.mp3'
  },
  {
    answer: '一九十十四三',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/49dab34d-5ac0-40e0-9fca-c71b03a57cb3.mp3'
  },
  {
    answer: '九十九六二一',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/e9c609b9-0389-4ad3-8790-f154dfd1e61e.mp3'
  },
  {
    answer: '三四六九三四',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/1abe7c09-7b0a-4e58-b254-e94ad0993f33.mp3'
  },
  {
    answer: '八一六一五六',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/d5a245e7-a98f-405e-b0d0-329fab7ec2f5.mp3'
  },
  {
    answer: '三七八九三十',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/4813b74b-976c-4314-8379-26f7dcd560d7.mp3'
  },
  {
    answer: '一三九十一七',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/3e11190b-323e-4679-8da4-cdcdb6d307b8.mp3'
  },
  {
    answer: '五五三三四八',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/7e5e663f-c78c-4750-aca6-9e763fd21279.mp3'
  },
  {
    answer: '八二三十九五',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/e0ad5a3e-4543-4d9d-8f01-71d0542d7ecd.mp3'
  },
  {
    answer: '八八五一五八',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/88b8654f-d02c-4203-ad6d-b6dcc9664275.mp3'
  },
  {
    answer: '二二九一三三',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/c1e9cea4-2782-4d21-9c2c-8d73f0ce19c2.mp3'
  },
  {
    answer: '十五二八三六',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/57a24897-d8ef-4a3a-a487-b985985a9951.mp3'
  },
  {
    answer: '四七三二一九',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/e6fb315a-2c36-4fdb-89db-607b56fd9dcf.mp3'
  },
  {
    answer: '八三三六二二',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/44657e4a-0977-4c1d-ab97-879dffa29d67.mp3'
  },
  {
    answer: '十七十七三六',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/f0ee23c6-ffe7-4d97-8f7e-3618b3517dca.mp3'
  },
  {
    answer: '四六五五九二',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/acde2b82-00ad-42e5-b34f-93da69d2eef7.mp3'
  },
  {
    answer: '五一二零十二',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/b96bc347-8970-4b04-85e0-07669d9b072d.mp3'
  },
  {
    answer: '二三一四二二',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/32da5b24-1486-4620-a3a4-417788b47c63.mp3'
  },
  {
    answer: '五七四五九三',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/a6e80ac0-34ee-407f-b362-72d530f5878c.mp3'
  },
  {
    answer: '二五五六五八',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/09e8b545-7b5a-4043-b1b4-1b4782d65711.mp3'
  },
  {
    answer: '七六六十四零',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/123366bb-9235-4c64-b69b-9c4cc7d44450.mp3'
  },
  {
    answer: '四零七十二三',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/d1983308-3eb4-4f5e-8cc0-91248ab86b35.mp3'
  },
  {
    answer: '三三九五五七',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/b981a1c4-dcee-4d3e-8bce-6625907253e6.mp3'
  },
  {
    answer: '六九三零一零',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/9375977b-774e-4967-8b5c-df77d7b35510.mp3'
  },
  {
    answer: '十零四五一五',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/ed22505c-1228-4c63-962d-8f8739ca4eee.mp3'
  },
  {
    answer: '四七二四四七',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/6d085a2c-e719-4a3d-9031-8c46f8b45619.mp3'
  },
  {
    answer: '八六八三七零',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/d0ed8ad1-debc-49b1-b72e-96b10033d0fa.mp3'
  },
  {
    answer: '三十九五四七',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/d5b0b884-33e5-4ddb-842c-838b146c1708.mp3'
  },
  {
    answer: '五零九五五二',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/1ff5e6bf-c690-47a1-86da-cbacbd781aa2.mp3'
  },
  {
    answer: '十二五一零十',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/193d7337-41b4-49a1-aae3-46dd689cb378.mp3'
  },
  {
    answer: '三零二二十零',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/b3165fcc-18f6-4eea-9f3f-d78a25f1e5f6.mp3'
  },
  {
    answer: '二十六十三三',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/c65bd5e4-f93a-41a8-aa33-848716001a5f.mp3'
  },
  {
    answer: '九二九五七七',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/b29bb48f-6413-4aae-b75a-856870ce0d2c.mp3'
  },
  {
    answer: '九三六三四十',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/360b9794-0413-45fe-9c3e-c2fae6703933.mp3'
  },
  {
    answer: '十七七十九五',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/25467a3f-ef7b-41d4-b7e6-2bdaf849ea4d.mp3'
  },
  {
    answer: '二五七九九七',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/b7a86d5b-3640-4bd7-88a1-df2ab9eb04d4.mp3'
  },
  {
    answer: '一三三零四十',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/9c5124f5-fb9a-4bf9-aaa0-6e8a212e64a1.mp3'
  },
  {
    answer: '三四九七九三',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/21970fd2-dc9d-4d0a-97be-1c703f02c1b0.mp3'
  },
  {
    answer: '八五一零九零',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/0eee4e1d-e87b-4595-83ec-f9688d285347.mp3'
  },
  {
    answer: '零二十零四八',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/4c449414-4915-465b-8d45-e96b8b260eef.mp3'
  },
  {
    answer: '二零零三六二',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/b064f29e-adba-4832-80f7-a82e814c6767.mp3'
  },
  {
    answer: '七五四五零一',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/65766da6-7590-43c0-9bd7-910950183b06.mp3'
  },
  {
    answer: '一七零一八二',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/54edd6c3-2160-4499-9533-e1ae85b90179.mp3'
  },
  {
    answer: '七六三六五四',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/42e9e1ed-030f-4a29-be3c-d360a8edd235.mp3'
  },
  {
    answer: '八六三五七一',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/57e26c50-4af0-43ac-a866-eaeb954192ce.mp3'
  },
  {
    answer: '一四一六七三',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/8184ec3b-9733-411a-94f2-3caa4288e27b.mp3'
  },
  {
    answer: '一七六六五二',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/f43a5080-6779-4baf-acc2-80be258b5ef7.mp3'
  },
  {
    answer: '七一七五三十',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/09ad3797-dbf8-4217-857c-fa9f80d211be.mp3'
  },
  {
    answer: '九十七四十八',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/a61524c0-e929-45fd-b3be-3c593691bae2.mp3'
  },
  {
    answer: '七九二二零四',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/bdd90f83-1d92-4ac7-a946-60659c7bbafe.mp3'
  },
  {
    answer: '六八二三六三',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/9e65655f-e970-4a96-806d-b511c27f5457.mp3'
  },
  {
    answer: '六七一三四三',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/b4cbd86e-c7bf-42cd-8558-f2fd9fa39f37.mp3'
  },
  {
    answer: '六七六八三二',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/ccf629f6-c5cd-4e08-87fd-b5bd2b34e9f4.mp3'
  },
  {
    answer: '四零九七八四',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/d27df099-8b4c-41c6-8ded-50b44b0dbfda.mp3'
  },
  {
    answer: '零四零二九七',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/177ad4e7-d8a6-4ea2-adc9-69070dd9d1a9.mp3'
  },
  {
    answer: '四九八零六一',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/b518ad53-fa03-4580-82b2-ea067b7e9c02.mp3'
  },
  {
    answer: '一六七一三四',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/fb1a3e1d-4b6a-4f16-9449-ef79bbedf9cf.mp3'
  },
  {
    answer: '二一九二零零',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/36afbd6c-c27d-4bc2-bf41-2760b16cf7d6.mp3'
  },
  {
    answer: '一六五四三二',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/ab9c10bc-90f3-4478-b3ff-53ed4e09af9b.mp3'
  },
  {
    answer: '零四零五二零',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/41e3fd72-ead4-44ad-98cb-ce4c2a557f92.mp3'
  },
  {
    answer: '零五四二一八',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/8520b274-27d5-42bd-940e-e40d945675b4.mp3'
  },
  {
    answer: '四零九五二六',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/44162e83-e59d-4dde-a3fd-04f815f4a2a6.mp3'
  },
  {
    answer: '二一一十六五',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/ca55d194-1b68-4e85-81c1-685fcc60121b.mp3'
  },
  {
    answer: '七七八一五八',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/edaa1f2b-71c6-49fb-9087-da80541b9296.mp3'
  },
  {
    answer: '三六五二九一',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/4a925c51-0ede-4b23-94aa-fe9909b3f026.mp3'
  },
  {
    answer: '一三八六二一',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/a92334dc-08a0-48ca-8d74-2cd221e289cd.mp3'
  },
  {
    answer: '九一六四二四',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/e11f7a0f-2689-4440-94e2-51df685fbb0e.mp3'
  },
  {
    answer: '五四三五零一',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/c2eb8ad6-4320-435a-9095-9d99f7ec0f82.mp3'
  },
  {
    answer: '三一三三五五',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/a195d564-dd01-4eab-b1aa-03b5d9f424de.mp3'
  },
  {
    answer: '五八三十二八',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/4f009452-5433-44ef-85d6-2e2ff950eeb0.mp3'
  },
  {
    answer: '三三七九三四',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/cc204f94-a13c-4ce0-994a-036f2a859440.mp3'
  },
  {
    answer: '零八七三九二',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/b813f323-7c81-4f8c-8780-ed654852730a.mp3'
  },
  {
    answer: '一八七二三三',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/9a7eef8f-bab8-42ca-a676-ff4facfbd173.mp3'
  },
  {
    answer: '六零八四三七',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/7d1acb0d-0a9d-4bca-9dc1-de8c4262c06f.mp3'
  },
  {
    answer: '六六零零二七',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/29808339-6d83-4e6c-9d8b-5421e719adce.mp3'
  },
  {
    answer: '五九九零一十',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/d4274fc2-d112-445e-acdd-2dced75f583e.mp3'
  },
  {
    answer: '零九三三四十',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/0ecb804b-7b09-4793-a54a-f930b1f89f96.mp3'
  },
  {
    answer: '零六四二四五',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/b9ba10cf-48c9-47af-acd0-58aa8034ff73.mp3'
  },
  {
    answer: '零三十七八一',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/399df2d3-cd78-46fc-bd9e-51d444828de0.mp3'
  },
  {
    answer: '二八八一八二',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/34a843cb-0722-4e4d-9780-2978eeba10b7.mp3'
  },
  {
    answer: '七四一五六一',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/7b7d495a-b111-44e7-991b-94f869b6ea71.mp3'
  },
  {
    answer: '七七三八零七',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/d68fd61d-9803-4bee-8e04-6e739551d4ee.mp3'
  },
  {
    answer: '零七八六零十',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/aa89dd8b-20d1-496c-aff7-e9e661b2fc5f.mp3'
  },
  {
    answer: '五六九三零九',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/7a90c7fc-955d-46ab-9358-ede05c0fa841.mp3'
  },
  {
    answer: '零三七五一九',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/42a503a8-b9bc-446c-8802-0da519c96898.mp3'
  },
  {
    answer: '三五二二十三',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/fe578456-74ae-4a87-a7c5-3a9e6c4e000d.mp3'
  },
  {
    answer: '一十八一八三',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/472c9d03-694f-47ab-9b1b-91276eda2e53.mp3'
  },
  {
    answer: '九二一九四一',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/59799758-c40e-4ef9-932b-f1b661c461f4.mp3'
  },
  {
    answer: '十六八八九十',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/7b5feeec-fa56-4c14-8eaf-f483e83009b8.mp3'
  },
  {
    answer: '五五四九七零',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/ab0f54a7-f468-44df-8d4b-88c4f5b1e0c1.mp3'
  },
  {
    answer: '一九七八四四',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/24412d2f-1396-44ab-af78-9ce242f7c607.mp3'
  },
  {
    answer: '八十九六十一',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/3fd21e99-2df6-4b74-9abe-8b8fe532a8d6.mp3'
  },
  {
    answer: '三九一九七一',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/21b17515-23ea-457b-a9b7-0128f6d0c7a4.mp3'
  },
  {
    answer: '八二一二五八',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/b020a46c-940c-46df-91fa-1097c347af34.mp3'
  },
  {
    answer: '一七七四二六',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/212bce49-5175-46a8-9aa2-56cfc727af94.mp3'
  },
  {
    answer: '三零六八四九',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/3cfaa6ff-af5d-4465-bad5-847823bb300f.mp3'
  },
  {
    answer: '五三八二四二',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/7ab1897c-15e3-4278-9564-541d48b25179.mp3'
  },
  {
    answer: '九零三八四六',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/06843e8a-516e-47a3-8e3f-180462aa4a38.mp3'
  },
  {
    answer: '九零九八五三',
    src: 'https://telephone-mandarin-learning.s3.us-west-2.amazonaws.com/181e44da-4e28-45a1-b544-7965a9ab7449.mp3'
  }
];

type GameResultsPageProps = {
  correctCount: number;
  skippedCount: number;
  onClickPlayAgain: () => void;
};

function GameResultsPage(props: GameResultsPageProps) {
  const { correctCount, skippedCount, onClickPlayAgain } = props;

  return (
    <div className="flex flex-col items-center py-6 text-center">
      <ChineseText as="h1" className="mb-4">
        电话
      </ChineseText>
      <ChineseText as="h2">学习中文数字</ChineseText>
      <div className="my-8 flex gap-4">
        <Scorecard count={correctCount} label="correct" />
        <Scorecard count={skippedCount} label="skipped" />
      </div>
      <Button
        variant="primary"
        className="mb-4 md:mb-8"
        onClick={onClickPlayAgain}
      >
        Play again
      </Button>
      <NumberGrid orientation="vertical" />
    </div>
  );
}

export default function GamePage() {
  const {
    remainingTime,
    isTimeUp,
    restart: restartStopwatch
  } = useStopWatch({
    durationMins: 2,
    durationSeconds: 22
  });

  const [score, dispatch] = useReducer(reducer, {
    correctCount: 0,
    skippedCount: 0,
    currentIndex: 0
  });

  const [prompts] = useState(() => shuffleArray(AUDIO_SAMPLES));

  const onClickPlayAgain = () => {
    dispatch({ type: ACTIONS.START_GAME });
    restartStopwatch();
  };

  return isTimeUp ? (
    <GameResultsPage
      correctCount={score.correctCount}
      skippedCount={score.skippedCount}
      onClickPlayAgain={onClickPlayAgain}
    />
  ) : (
    <div>
      <ChineseText as="h1" className="mb-4">
        电话
      </ChineseText>
      <ChineseText as="h2">学习中文数字</ChineseText>
      <div className="p-2 sm:m-4">
        <div className="flex justify-between px-2">
          <span className="text-2xl">
            {numberToMinutesAndSeconds(remainingTime)}
          </span>
          <span>Question {score.currentIndex + 1}</span>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();

            const form = event.target as HTMLFormElement; // Type assertion
            const formData = new FormData(form);
            const response = formData.get('response');

            dispatch({
              type: ACTIONS.SUBMIT,
              response: typeof response === 'string' ? response.trim() : '',
              answer: prompts[score.currentIndex].answer
            });

            form.reset();
          }}
        >
          <AudioInput src={prompts[score.currentIndex].src} />
          <div className="mt-6 flex flex-row justify-end gap-4">
            <Button
              variant="secondary"
              onClick={() => {
                dispatch({ type: ACTIONS.SKIP });
              }}
            >
              Skip
            </Button>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
