import { FC, useMemo } from 'react';
import { TConstructorIngredient, TConstructorItems } from '@utils-types';
import { BurgerConstructorUI } from '@ui';

import { useSelector } from '../../services/store';
import {
  constructorActions,
  constructorSelectors
} from '../../storage/slices/constructor';
import { useDispatch } from '../../services/store';
import { fetchorderBurgerApi } from '../../storage/thunk/constructor';
import { userSelectors } from '../../storage/slices/user';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  /**  взять переменные constructorItems, orderRequest и orderModalData из стора */

  const constructorItems = useSelector(constructorSelectors.constructorItems);
  const orderRequest = useSelector(constructorSelectors.orderRequest);
  const orderModalData = useSelector(constructorSelectors.orderModalData);
  const ingredients = useSelector(constructorSelectors.ingredients);
  const bunId = useSelector(constructorSelectors.bunId);
  const user = useSelector(userSelectors.user);

  const dispatch = useDispatch();
  const ingredientsId = ingredients.map((ingredient) => ingredient._id);
  const navigate = useNavigate();
  if (bunId) ingredientsId.push(bunId);

  const onOrderClick = () => {
    console.log('заказать заказ');
    if (!user) {
      navigate('/login');
      return;
    }
    console.log('делаем заказ');
    if (!constructorItems.bun || orderRequest) return;
    dispatch(fetchorderBurgerApi(ingredientsId));
  };
  const closeOrderModal = () => {
    dispatch(constructorActions.clearOrderModalData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
