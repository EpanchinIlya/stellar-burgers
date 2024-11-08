import {
  constructorActions,
  constructorRedusers,
  TConstructorState
} from './constructor';

import mockIngredients from '../../__mocks__/ingredientsWithoutBun.json';

describe('Тесты конструкора бургера', () => {
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

  
});
