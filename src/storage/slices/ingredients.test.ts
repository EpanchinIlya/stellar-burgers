import { TIngredient } from '../../utils/types';
import { fetchIngredients } from '../thunk/ingredient';
import mockIngredients from '../../__mocks__/ingredients.json';
import bun from '../../__mocks__/bun.json';
import main from '../../__mocks__/main.json';
import sause from '../../__mocks__/sauce.json';

import { ingredientRedusers, TIngredientState } from './ingredients';

describe('Тесты для slice ingredients', () => {
  test('Тест fetchIngredients rerquest', () => {
    const customInitialState: TIngredientState = {
      isIngredientsLoading: false,
      bun: bun,
      main: main,
      sauce: sause,
      data: mockIngredients
    };
    const initialState = ingredientRedusers(customInitialState, {
      type: '@@INIT'
    });

    const newState = ingredientRedusers(
      initialState,
      fetchIngredients.pending('fetchorderBurgerApiPending')
    );
    expect(newState.isIngredientsLoading).toEqual(true);
  });

  test('Тест fetchIngredients rejected', () => {
    const customInitialState: TIngredientState = {
      isIngredientsLoading: true,
      bun: bun,
      main: main,
      sauce: sause,
      data: mockIngredients
    };
    const initialState = ingredientRedusers(customInitialState, {
      type: '@@INIT'
    });
    const testError = new Error('Test Error');
    const newState = ingredientRedusers(
      initialState,
      fetchIngredients.rejected(testError, 'fetchorderBurgerApiRejected')
    );
    expect(newState.isIngredientsLoading).toEqual(false);
  });

  test('Тест fetchIngredients fulfilled', () => {
    const customInitialState: TIngredientState = {
      isIngredientsLoading: true,
      bun: [],
      main: [],
      sauce: [],
      data: []
    };
    const initialState = ingredientRedusers(customInitialState, {
      type: '@@INIT'
    });

    const payload: TIngredient[] = mockIngredients;
    const newState = ingredientRedusers(
      initialState,
      fetchIngredients.fulfilled(payload, 'fetchorderBurgerApiRejected')
    );
    expect(newState.isIngredientsLoading).toEqual(false);
    expect(newState.bun).toEqual(bun);
    expect(newState.sauce).toEqual(sause);
    expect(newState.data).toEqual(mockIngredients);
  });
});
