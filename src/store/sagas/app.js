import { takeEvery, put, call, all } from 'redux-saga/effects';
import * as actions from '../actions';
import * as appActions from '../action/app';
import ApiServices from '../../services/api';

export function* getCoinListSaga(action) {
  try {
    const response = yield call(ApiServices.getCoinList);

    if (response.status === 200) {
      yield put(appActions.saveCoinListData(response.data));
      if (action.values) yield action.values.navigate('Main');
    }
  } catch (err) {
    console.log(err.response);
  }
}

export default function* userSagas() {
  yield all([
    takeEvery(actions.GetCoinList, getCoinListSaga),
  ]);
}
