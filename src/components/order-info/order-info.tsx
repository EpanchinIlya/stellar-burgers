import { FC, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import { ingredientSelectors } from '../../storage/slices/ingredients';

import { useSelector } from '../../services/store';
import { feedsSelectors } from '../../storage/slices/feeds';
import { useLocation } from 'react-router-dom';

import { useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { fetchIngredients } from '../../storage/thunk/ingredient';
import { fetchFeeds } from '../../storage/thunk/feeds';

export const OrderInfo: FC = () => {
  const orders: TOrder[] = useSelector(feedsSelectors.orders);

  const ingredients: TIngredient[] = useSelector(
    ingredientSelectors.ingredients
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (ingredients.length === 0) dispatch(fetchIngredients());
    if (orders.length === 0) dispatch(fetchFeeds());
  }, []);

  const pathName = useLocation().pathname.split('/');
  const number = parseInt(pathName[pathName.length - 1]);

  const orderById = orders.filter((order) => order.number === number);
  console.log(number);
  const orderData = orderById[0] ? orderById[0] : null;

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
