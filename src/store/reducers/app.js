import * as Actions from '../actions';

const initialState = {
  coinList: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Actions.SaveCoinListData:
      return { ...state, coinList: action.values };
    case Actions.ResetAppStore:
      return initialState;
    default:
      return state;
  }
};
