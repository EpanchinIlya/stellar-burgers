import { TFeedsResponse } from '../../utils/burger-api';
import { feedsRedusers, ordersState } from './feeds';
import ordersInfo from '../../__mocks__/ordersInfo.json';
import { fetchFeeds } from '../thunk/feeds';

describe('Тесты ленты заказов', () => {
  test('Тест fetchFeeds fulfilled', () => {
    const customInitialState: ordersState = {
      orders: [],
      total: 0,
      totalToday: 0
    };
    const initialState = feedsRedusers(customInitialState, {
      type: '@@INIT'
    });

    const payload: TFeedsResponse = ordersInfo;
    const newState = feedsRedusers(
      initialState,
      fetchFeeds.fulfilled(payload, 'fetchFeeds fulfilled')
    );
    expect(newState.orders).toEqual(payload.orders);
    expect(newState.total).toEqual(payload.total);
    expect(newState.totalToday).toEqual(payload.totalToday);
  });
});
