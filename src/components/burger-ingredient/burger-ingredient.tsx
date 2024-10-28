import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { TBun, TConstructorIngredient } from '@utils-types';

import { useDispatch } from '../../services/store';
import { constructorActions } from '../../storage/slices/constructor';
import { nanoid } from '@reduxjs/toolkit';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const handleAdd = () => {
      if (ingredient?.type === 'bun') {
        const bun: TBun = {
          name: ingredient.name,
          price: ingredient.price,
          image: ingredient.image_mobile,
          _id: ingredient._id
        };
        dispatch(constructorActions.addBun(bun));
      } else {
        const ingredientWithNewId: TConstructorIngredient = {
          ...ingredient,
          id: nanoid()
        };
        dispatch(constructorActions.addIngredient(ingredientWithNewId));
        console.log(ingredientWithNewId);
      }
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
