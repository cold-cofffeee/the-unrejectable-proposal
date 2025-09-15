
export enum AppState {
  LOADING,
  NAME_INPUT,
  QUESTIONS,
  PROPOSAL,
  CELEBRATION,
  REJECTED,
}

export interface IQuestion {
  question: string;
  options: string[];
}
