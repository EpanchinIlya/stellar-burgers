import { fetchFeeds } from './feeds'; // Импортируем функцию из вашего файла
import { getFeedsApi, TFeedsResponse } from '../../utils/burger-api'; // Импортируем реальную функцию
import { FEEDS_SLICE_NAME } from '../slices/sliceNames';
import ordersInfo from '../../__mocks__/ordersInfo.json';

// Мокаем `getFeedsApi`
jest.mock('../../utils/burger-api');
const mockedGetFeedsApi = getFeedsApi as jest.Mock;

describe('fetchFeeds', () => {
  const mockResponse: TFeedsResponse = ordersInfo;

  test('should dispatch fulfilled action when API call is successful', async () => {
    // Настроим мок для успешного ответа
    mockedGetFeedsApi.mockResolvedValueOnce(mockResponse);

    // Вызываем thunk
    const result = await fetchFeeds()(jest.fn(), () => {}, undefined);

    // Проверяем, что результат fulfilled
    expect(result.type).toBe(`${FEEDS_SLICE_NAME}/fetchFeeds/fulfilled`);
    expect(result.payload).toEqual(mockResponse);
  });

  test('should dispatch rejected action when API call fails', async () => {
    // Настроим мок для ошибки
    const testError = new Error('Failed to fetch feeds');
    mockedGetFeedsApi.mockRejectedValueOnce(testError);

    // Вызываем thunk
    const result = (await fetchFeeds()(jest.fn(), () => {}, undefined)) as {
      type: string;
      error?: { message: string };
      payload?: any;
    };

    // Проверяем, что результат rejected
    expect(result.type).toBe(`${FEEDS_SLICE_NAME}/fetchFeeds/rejected`);

    // Проверяем, что ошибка присутствует и её сообщение совпадает
    expect(result.error).toBeDefined();
    expect(result.error?.message).toEqual(testError.message);
  });
});
