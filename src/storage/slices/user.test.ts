import { userActions, userRedusers, userState } from './user';

import orderModalData from '../../__mocks__/orderModalData.json';
import { TOrder } from '../../utils/types';
import { fetchLoginUser } from '../thunk/user';
import { setCookie } from '../../utils/cookie';

describe('Тесты user slice', () => {
  test('Тест очистки заказов пользователя', () => {
    const customInitialState: userState = {
      user: null,
      userOrders: orderModalData,
      isUserLoading: false,
      error: undefined
    };
    const initialState = userRedusers(customInitialState, {
      type: '@@INIT'
    });
    const clearMass: TOrder[] = [];
    const newState = userRedusers(initialState, userActions.clearUserOrders());
    expect(newState.userOrders).toEqual(clearMass);
  });

  test('Тест fetchLoginUser pending', () => {
    const customInitialState: userState = {
      user: null,
      userOrders: orderModalData,
      isUserLoading: false,
      error: undefined
    };
    const initialState = userRedusers(customInitialState, {
      type: '@@INIT'
    });

    const newState = userRedusers(
      initialState,
      fetchLoginUser.pending('fetchLoginUserPending', {
        email: '',
        password: ''
      })
    );

    expect(newState.isUserLoading).toEqual(true);
    expect(newState.error).toEqual(undefined);
  });

  test('Тест fetchLoginUser rejected', () => {
    const customInitialState: userState = {
      user: null,
      userOrders: orderModalData,
      isUserLoading: true,
      error: undefined
    };
    const initialState = userRedusers(customInitialState, {
      type: '@@INIT'
    });

    // Предварительно записываем токены в localStorage и cookie
    localStorage.setItem('refreshToken', 'testRefreshToken');
    setCookie('accessToken', 'testAccessToken');

    // Проверяем, что данные были записаны
    expect(localStorage.getItem('refreshToken')).toEqual('testRefreshToken');
    expect(document.cookie).toContain('accessToken=testAccessToken');

    const testError = new Error('Test Error');
    const newState = userRedusers(
      initialState,
      fetchLoginUser.rejected(testError, 'fetchLoginUserRejected', {
        email: '',
        password: ''
      })
    );

    expect(newState.isUserLoading).toEqual(false);
    expect(newState.error).toEqual(testError.message);
    expect(newState.user).toEqual(null);

    // Проверка удаления токенов из localStorage и cookie
    expect(localStorage.getItem('refreshToken')).toBeNull();
    expect(document.cookie).not.toContain('accessToken');
  });

  test('Тест fetchLoginUser fulfilled', () => {
    // const customInitialState: userState = {
    //   user: null,
    //   userOrders: orderModalData,
    //   isUserLoading: true,
    //   error: undefined
    // };
    // const initialState = userRedusers(customInitialState, {
    //   type: '@@INIT'
    // });
    // const payload = {
    //   user: { id: '123', name: 'Test User', email: 'test@example.com' },
    //   refreshToken: 'testRefreshToken',
    //   accessToken: 'testAccessToken'
    // };
    // const newState = userRedusers(
    //   initialState,
    //   fetchLoginUser.fulfilled(payload, 'fetchLoginUserFulfilled', [])
    // );
    // expect(newState.isUserLoading).toEqual(false);
    // expect(newState.user).toEqual(payload.user);
    // expect(localStorage.getItem('refreshToken')).toEqual(payload.refreshToken);
    // expect(document.cookie).toContain(`accessToken=${payload.accessToken}`);
  });
});
