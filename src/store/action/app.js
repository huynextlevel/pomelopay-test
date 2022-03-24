import * as Actions from '../actions';

export function getCoinList(values) {
  return { type: Actions.GetCoinList, values };
}

export function saveCoinListData(values) {
  return { type: Actions.SaveCoinListData, values };
}

export function resetAppStore() {
  return { type: Actions.ResetAppStore };
}
