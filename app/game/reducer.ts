type State = {
  correctCount: number;
  skippedCount: number;
  currentIndex: number;
};

type SkipAction = {
  type: typeof ACTIONS.SKIP;
};

type StartGameAction = {
  type: typeof ACTIONS.START_GAME;
};

type SubmitAction = {
  type: typeof ACTIONS.SUBMIT;
  response: string;
  answer: string;
};

type Action = SkipAction | StartGameAction | SubmitAction;

export const ACTIONS = {
  SKIP: 'SKIP' as const,
  START_GAME: 'START_GAME' as const,
  SUBMIT: 'SUBMIT' as const
};

export default function reducer(state: State, action: Action): State {
  if (action.type === ACTIONS.START_GAME) {
    return {
      correctCount: 0,
      skippedCount: 0,
      currentIndex: 0
    };
  }
  if (action.type === ACTIONS.SKIP) {
    return {
      ...state,
      skippedCount: state.skippedCount + 1,
      currentIndex: state.currentIndex + 1
    };
  }
  if (action.type === ACTIONS.SUBMIT) {
    const isCorrect = action.answer === action.response;
    return {
      ...state,
      correctCount: state.correctCount + (isCorrect ? 1 : 0),
      currentIndex: state.currentIndex + 1
    };
  }

  throw new Error(`GameReducerError! Invalid action provided ${action}`);
}
