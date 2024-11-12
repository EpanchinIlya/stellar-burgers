import {
  constructorActions,
  constructorRedusers,
  TConstructorState
} from './constructor';

import mockIngredients from '../../__mocks__/ingredientsWithoutBun.json';
import bun from '../../__mocks__/bun.json';
import orderModalData from '../../__mocks__/orderModalData.json';

import { fetchorderBurgerApi } from '../thunk/constructor';
import { TNewOrderResponse } from '@api';
import { TIngredient } from '@utils-types';

describe('Тесты конструкора бургера', () => {
  test('Тест добавления булки', () => {
    const initialState = constructorRedusers(undefined, { type: '@@INIT' });
    const newState = constructorRedusers(
      initialState,
      constructorActions.addBun(bun[0])
    );

    expect(newState.constructorItems.bun).toEqual(bun[0]);
  });

  test('Тест добавления ингридиента', () => {
    const initialState = constructorRedusers(undefined, { type: '@@INIT' });
    const newState = constructorRedusers(
      initialState,
      constructorActions.addIngredient(mockIngredients[0])
    );
    expect(newState.constructorItems.ingredients[0]).toEqual(
      mockIngredients[0]
    );
  });

  test('Тест удаления ингридиента', () => {
    const initialState = constructorRedusers(undefined, { type: '@@INIT' });
    const newState = constructorRedusers(
      initialState,
      constructorActions.addIngredient(mockIngredients[0])
    );
    const newStateAfterRemove = constructorRedusers(
      initialState,
      constructorActions.removeIngredient(mockIngredients[0])
    );
    expect(newStateAfterRemove.constructorItems.ingredients.length).toEqual(0);
  });

  test('Тест поднятия ингредиента в начинке', () => {
    const customInitialState: TConstructorState = {
      constructorItems: {
        bun: null,
        ingredients: mockIngredients // инициализируем массивом mockIngredients
      },
      orderRequest: false,
      orderModalData: null,
      error: undefined
    };
    const initialState = constructorRedusers(customInitialState, {
      type: '@@INIT'
    });
    const firstIngredient = initialState.constructorItems.ingredients[2];
    const secondIngredient = initialState.constructorItems.ingredients[3];
    const newState = constructorRedusers(
      initialState,
      constructorActions.moveUpIngredient(3)
    );
    expect(newState.constructorItems.ingredients[2]).toEqual(secondIngredient);
    expect(newState.constructorItems.ingredients[3]).toEqual(firstIngredient);
  });

  test('Тест опускания ингредиента в начинке', () => {
    const customInitialState: TConstructorState = {
      constructorItems: {
        bun: null,
        ingredients: mockIngredients // инициализируем массивом mockIngredients
      },
      orderRequest: false,
      orderModalData: null,
      error: undefined
    };
    const initialState = constructorRedusers(customInitialState, {
      type: '@@INIT'
    });
    const firstIngredient = initialState.constructorItems.ingredients[2];
    const secondIngredient = initialState.constructorItems.ingredients[3];
    const newState = constructorRedusers(
      initialState,
      constructorActions.moveDownIngredient(2)
    );
    expect(newState.constructorItems.ingredients[2]).toEqual(secondIngredient);
    expect(newState.constructorItems.ingredients[3]).toEqual(firstIngredient);
  });

  test('Тест очистки данных модального окна', () => {
    const customInitialState: TConstructorState = {
      constructorItems: {
        bun: null,
        ingredients: mockIngredients // инициализируем массивом mockIngredients
      },
      orderRequest: false,
      orderModalData: orderModalData[0],
      error: undefined
    };
    const initialState = constructorRedusers(customInitialState, {
      type: '@@INIT'
    });

    const newState = constructorRedusers(
      initialState,
      constructorActions.clearOrderModalData()
    );
    expect(newState.orderModalData).toEqual(null);
  });

  test('Тест fetchOrderBurgerApi rerquest', () => {
    const customInitialState: TConstructorState = {
      constructorItems: {
        bun: null,
        ingredients: mockIngredients // инициализируем массивом mockIngredients
      },
      orderRequest: false,
      orderModalData: null,
      error: undefined
    };
    const initialState = constructorRedusers(customInitialState, {
      type: '@@INIT'
    });

    const newState = constructorRedusers(
      initialState,
      fetchorderBurgerApi.pending('fetchOrderBurgerApiPending', [])
    );
    expect(newState.orderRequest).toEqual(true);
    expect(newState.orderModalData).toEqual(null);
    expect(newState.error).toEqual(undefined);
  });

  test('Тест fetchOrderBurgerApi rejected', () => {
    const customInitialState: TConstructorState = {
      constructorItems: {
        bun: null,
        ingredients: mockIngredients // инициализируем массивом mockIngredients
      },
      orderRequest: true,
      orderModalData: null,
      error: undefined
    };
    const initialState = constructorRedusers(customInitialState, {
      type: '@@INIT'
    });

    const testError = new Error('Test Error');
    const newState = constructorRedusers(
      initialState,
      fetchorderBurgerApi.rejected(testError, 'fetchOrderBurgerApiRejected', [])
    );
    expect(newState.orderRequest).toEqual(false);
    expect(newState.error).toEqual(testError.message);
  });

  test('Тест fetchOrderBurgerApi fulfilled', () => {
    const customInitialState: TConstructorState = {
      constructorItems: {
        bun: bun[0],
        ingredients: mockIngredients // инициализируем массивом mockIngredients
      },
      orderRequest: true,
      orderModalData: null,
      error: undefined
    };
    const initialState = constructorRedusers(customInitialState, {
      type: '@@INIT'
    });

    const payload: TNewOrderResponse = {
      success: true,
      order: orderModalData[0],
      name: 'string'
    };

    const nullIngredients: TIngredient[] = [];
    const newState = constructorRedusers(
      initialState,
      fetchorderBurgerApi.fulfilled(payload, 'fetchOrderBurgerApiRejected', [])
    );
    expect(newState.orderModalData).toEqual(payload.order);
    expect(newState.constructorItems.bun).toEqual(null);
    expect(newState.constructorItems.ingredients).toEqual(nullIngredients);
    expect(newState.orderRequest).toEqual(false);
  });
});
