import { orderBurgerApi } from '../../utils/burger-api';
import { USER_SLICE_NAME } from '../slices/sliceNames';
import { fetchorderBurgerApi } from './constructor';
import orderModalData from '../../__mocks__/orderModalData.json';
// Мокаем `orderBurgerApi`
jest.mock('../../utils/burger-api');
const mockedOrderBurgerApi = orderBurgerApi as jest.Mock;

describe('fetchorderBurgerApi', () => {
  const testData = ['1', '2'];
  const mockResponse = {
    order: orderModalData[0],
    name: 'name',
    success: true
  };

  test('should dispatch fulfilled action when API call is successful', async () => {
    // Настраиваем мок для успешного ответа
    mockedOrderBurgerApi.mockResolvedValueOnce(mockResponse);

    // Вызываем thunk и передаем `testData`
    const result = await fetchorderBurgerApi(testData)(
      jest.fn(),
      () => {},
      undefined
    );

    // Проверяем, что результат fulfilled и данные совпадают с mockResponse
    expect(result.type).toBe(
      `${USER_SLICE_NAME}/fetchorderBurgerApi/fulfilled`
    );
    expect(result.payload).toEqual(mockResponse);
  });

  test('should dispatch rejected action when API call fails', async () => {
    // Настраиваем мок для ошибки
    const testError = new Error('Failed to fetch order');
    mockedOrderBurgerApi.mockRejectedValueOnce(testError);

    // Вызываем thunk и передаем `testData`
    const result = (await fetchorderBurgerApi(testData)(
      jest.fn(),
      () => {},
      undefined
    )) as {
      type: string;
      error?: { message: string };
      payload?: any;
    };

    if (result.type === `${USER_SLICE_NAME}/fetchorderBurgerApi/rejected`) {
      expect(result.error).toBeDefined(); // Проверка на наличие error
      if (result.error !== undefined) {
        expect(result.error.message).toEqual(testError.message);
      }
    } else {
      // Если результат не rejected, это ошибка в тесте
      throw new Error('Expected rejected state but got something else.');
    }
  });
});
