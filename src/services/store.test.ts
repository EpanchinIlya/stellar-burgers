import ingredientSlice from '../storage/slices/ingredients';
import { rootReducer } from './store';
import { feedsSlice } from '../storage/slices/feeds';
import userSlice from '../storage/slices/user';
import constructorSlice from '../storage/slices/constructor';

describe('rootReducer инициализация', () => {
  test('rootReducer должен инициализироваться корректно', () => {
    // Получаем начальное состояние для корневого редьюсера
    const initialState = rootReducer(undefined, { type: '@@INIT' });

    // Проверяем начальные состояния для каждого из под-редьюсеров
    expect(initialState[ingredientSlice.name]).toEqual(
      ingredientSlice.getInitialState()
    );
    expect(initialState[feedsSlice.name]).toEqual(feedsSlice.getInitialState());
    expect(initialState[constructorSlice.name]).toEqual(
      constructorSlice.getInitialState()
    );
    expect(initialState[userSlice.name]).toEqual(userSlice.getInitialState());
  });
});
