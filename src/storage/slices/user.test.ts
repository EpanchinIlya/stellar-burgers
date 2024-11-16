import { userActions, userRedusers, userState } from './user';

import orderModalData from '../../__mocks__/orderModalData.json';
import { TOrder } from '../../utils/types';
import {
  fetchGetOrdersApi,
  fetchGetUserApi,
  fetchLoginUser,
  fetchLogoutApi,
  fetchRegisterUserApi,
  fetchUpdateUserApi
} from '../thunk/user';
import { isCookieEmpty, setCookie } from '../../utils/cookie';
import Cookies from 'js-cookie';

describe('Тесты user slice', () => {
  beforeEach(() => {
    localStorage.clear();
    Cookies.remove('accessToken');
  });

  beforeAll(() => {
    Object.defineProperty(document, 'cookie', {
      writable: true,
      value: ''
    });
  });

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
    expect(isCookieEmpty('accessToken')).toEqual(true);
  });

  test('Тест fetchLoginUser fulfilled', () => {
    const customInitialState: userState = {
      user: null,
      userOrders: orderModalData,
      isUserLoading: true,
      error: undefined
    };
    const initialState = userRedusers(customInitialState, {
      type: '@@INIT'
    });
    const payload = {
      user: { id: '123', name: 'Test User', email: 'test@example.com' },
      refreshToken: 'testRefreshToken',
      accessToken: 'testAccessToken',
      success: true
    };
    const newState = userRedusers(
      initialState,
      fetchLoginUser.fulfilled(payload, 'fetchLoginUserFulfilled', {
        email: '',
        password: ''
      })
    );
    expect(newState.isUserLoading).toEqual(false);
    expect(newState.user).toEqual(payload.user);
    expect(localStorage.getItem('refreshToken')).toEqual(payload.refreshToken);
    expect(document.cookie).toContain(`accessToken=${payload.accessToken}`);
  });
  //======================================
  test('Тест fetchRegisterUserApi pending', () => {
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
      fetchRegisterUserApi.pending('fetchRegisterUserApiPending', {
        email: '',
        name: '',
        password: ''
      })
    );

    expect(newState.isUserLoading).toEqual(true);
    expect(newState.error).toEqual(undefined);
  });

  test('Тест fetchRegisterUserApi rejected', () => {
    const customInitialState: userState = {
      user: null,
      userOrders: orderModalData,
      isUserLoading: true,
      error: undefined
    };
    const initialState = userRedusers(customInitialState, {
      type: '@@INIT'
    });

    const testError = new Error('Test Registration Error');
    const newState = userRedusers(
      initialState,
      fetchRegisterUserApi.rejected(testError, 'fetchRegisterUserApiRejected', {
        email: '',
        name: '',
        password: ''
      })
    );

    expect(newState.isUserLoading).toEqual(false);
    expect(newState.error).toEqual(testError.message);
    expect(newState.user).toEqual(null);
  });

  test('Тест fetchRegisterUserApi fulfilled', () => {
    const customInitialState: userState = {
      user: null,
      userOrders: orderModalData,
      isUserLoading: true,
      error: undefined
    };
    const initialState = userRedusers(customInitialState, {
      type: '@@INIT'
    });

    const payload = {
      user: { name: 'Test User', email: 'test@example.com' },
      refreshToken: 'testRefreshToken',
      accessToken: 'testAccessToken',
      success: true
    };

    const newState = userRedusers(
      initialState,
      fetchRegisterUserApi.fulfilled(payload, 'fetchRegisterUserApiFulfilled', {
        email: '',
        name: '',
        password: ''
      })
    );

    expect(newState.isUserLoading).toEqual(false);
    expect(newState.user).toEqual(payload.user);
    expect(localStorage.getItem('refreshToken')).toEqual(payload.refreshToken);
    expect(document.cookie).toContain(`accessToken=${payload.accessToken}`);
  });

  test('Тест fetchUpdateUserApi pending', () => {
    const customInitialState: userState = {
      user: { name: 'Initial User', email: 'initial@example.com' },
      userOrders: orderModalData,
      isUserLoading: false,
      error: undefined
    };
    const initialState = userRedusers(customInitialState, {
      type: '@@INIT'
    });

    const newState = userRedusers(
      initialState,
      fetchUpdateUserApi.pending('fetchUpdateUserApiPending', {
        email: '',
        name: '',
        password: ''
      })
    );

    expect(newState.isUserLoading).toEqual(true);
    expect(newState.error).toEqual(undefined);
  });

  test('Тест fetchUpdateUserApi rejected', () => {
    const customInitialState: userState = {
      user: { name: 'Initial User', email: 'initial@example.com' },
      userOrders: orderModalData,
      isUserLoading: true,
      error: undefined
    };
    const initialState = userRedusers(customInitialState, {
      type: '@@INIT'
    });

    const testError = new Error('Test Update Error');
    const newState = userRedusers(
      initialState,
      fetchUpdateUserApi.rejected(testError, 'fetchUpdateUserApiRejected', {
        email: '',
        name: '',
        password: ''
      })
    );

    expect(newState.isUserLoading).toEqual(false);
    expect(newState.error).toEqual(testError.message);
  });

  test('Тест fetchUpdateUserApi fulfilled', () => {
    const customInitialState: userState = {
      user: { name: 'Initial User', email: 'initial@example.com' },
      userOrders: orderModalData,
      isUserLoading: true,
      error: undefined
    };
    const initialState = userRedusers(customInitialState, {
      type: '@@INIT'
    });

    const payload = {
      user: { name: 'Updated User', email: 'updated@example.com' },
      success: true
    };

    const newState = userRedusers(
      initialState,
      fetchUpdateUserApi.fulfilled(payload, 'fetchUpdateUserApiFulfilled', {
        email: 'updated@example.com',
        name: 'Updated User',
        password: 'newpassword'
      })
    );

    expect(newState.isUserLoading).toEqual(false);
    expect(newState.user).toEqual(payload.user);
  });

  test('Тест fetchLogoutApi pending', () => {
    const customInitialState: userState = {
      user: { name: 'Test User', email: 'test@example.com' },
      userOrders: orderModalData,
      isUserLoading: false,
      error: undefined
    };
    const initialState = userRedusers(customInitialState, {
      type: '@@INIT'
    });

    const newState = userRedusers(
      initialState,
      fetchLogoutApi.pending('fetchLogoutApiPending')
    );

    expect(newState.isUserLoading).toEqual(true);
    expect(newState.error).toEqual(undefined);
  });

  test('Тест fetchLogoutApi rejected', () => {
    const customInitialState: userState = {
      user: { name: 'Test User', email: 'test@example.com' },
      userOrders: orderModalData,
      isUserLoading: true,
      error: undefined
    };
    const initialState = userRedusers(customInitialState, {
      type: '@@INIT'
    });

    const testError = new Error('Test Logout Error');
    const newState = userRedusers(
      initialState,
      fetchLogoutApi.rejected(testError, 'fetchLogoutApiRejected')
    );

    expect(newState.isUserLoading).toEqual(false);
    expect(newState.error).toEqual(testError.message);
  });

  test('Тест fetchLogoutApi fulfilled', () => {
    const customInitialState: userState = {
      user: { name: 'Test User', email: 'test@example.com' },
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

    const payload = { success: true };
    const newState = userRedusers(
      initialState,
      fetchLogoutApi.fulfilled(payload, 'fetchLogoutApiFulfilled')
    );

    expect(newState.isUserLoading).toEqual(false);
    expect(newState.user).toBeNull();

    // Проверка удаления токенов из localStorage и cookie
    expect(localStorage.getItem('refreshToken')).toBeNull();
    expect(isCookieEmpty('accessToken')).toEqual(true);
  });

  test('Тест fetchGetUserApi pending', () => {
    const customInitialState: userState = {
      user: { name: 'User', email: 'user@example.com' },
      userOrders: orderModalData,
      isUserLoading: false,
      error: undefined
    };
    const initialState = userRedusers(customInitialState, {
      type: '@@INIT'
    });

    const newState = userRedusers(
      initialState,
      fetchGetUserApi.pending('fetchGetUserApiPending')
    );

    expect(newState.isUserLoading).toEqual(true);
    expect(newState.user).toBeNull();
    expect(newState.error).toEqual(undefined);
  });

  test('Тест fetchGetUserApi rejected', () => {
    const customInitialState: userState = {
      user: null,
      userOrders: orderModalData,
      isUserLoading: true,
      error: undefined
    };
    const initialState = userRedusers(customInitialState, {
      type: '@@INIT'
    });

    const testError = new Error('Test Get User Error');
    const newState = userRedusers(
      initialState,
      fetchGetUserApi.rejected(testError, 'fetchGetUserApiRejected')
    );

    expect(newState.isUserLoading).toEqual(false);
    expect(newState.error).toEqual(testError.message);
  });

  test('Тест fetchGetUserApi fulfilled', () => {
    const customInitialState: userState = {
      user: null,
      userOrders: orderModalData,
      isUserLoading: true,
      error: undefined
    };
    const initialState = userRedusers(customInitialState, {
      type: '@@INIT'
    });

    const payload = {
      user: { name: 'User', email: 'user@example.com' },
      success: true
    };

    const newState = userRedusers(
      initialState,
      fetchGetUserApi.fulfilled(payload, 'fetchGetUserApiFulfilled')
    );

    expect(newState.isUserLoading).toEqual(false);
    expect(newState.user).toEqual(payload.user);
  });

  //===========================================
  test('Тест fetchGetOrdersApi pending', () => {
    const customInitialState: userState = {
      user: { name: 'Test User', email: 'test@example.com' },
      userOrders: [],
      isUserLoading: false,
      error: undefined
    };
    const initialState = userRedusers(customInitialState, {
      type: '@@INIT'
    });

    const newState = userRedusers(
      initialState,
      fetchGetOrdersApi.pending('fetchGetOrdersApiPending')
    );

    expect(newState.isUserLoading).toEqual(true);
    expect(newState.error).toEqual(undefined);
    expect(newState.userOrders).toEqual([]);
  });

  test('Тест fetchGetOrdersApi rejected', () => {
    const customInitialState: userState = {
      user: { name: 'Test User', email: 'test@example.com' },
      userOrders: [],
      isUserLoading: true,
      error: undefined
    };
    const initialState = userRedusers(customInitialState, {
      type: '@@INIT'
    });

    const testError = new Error('Test Get Orders Error');
    const newState = userRedusers(
      initialState,
      fetchGetOrdersApi.rejected(testError, 'fetchGetOrdersApiRejected')
    );

    expect(newState.isUserLoading).toEqual(false);
    expect(newState.error).toEqual(testError.message);
    expect(newState.userOrders).toEqual([]);
  });

  test('Тест fetchGetOrdersApi fulfilled', () => {
    const customInitialState: userState = {
      user: { name: 'Test User', email: 'test@example.com' },
      userOrders: [],
      isUserLoading: true,
      error: undefined
    };
    const initialState = userRedusers(customInitialState, {
      type: '@@INIT'
    });

    const payload: TOrder[] = orderModalData;

    const newState = userRedusers(
      initialState,
      fetchGetOrdersApi.fulfilled(payload, 'fetchGetOrdersApiFulfilled')
    );

    expect(newState.isUserLoading).toEqual(false);
    expect(newState.userOrders).toEqual(payload);
  });
});
