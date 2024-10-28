import { FC } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useSelector } from '../../services/store';
import { feedsSelectors } from '../../storage/slices/feeds';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  /** взять переменные из стора */

  const orders: TOrder[] = useSelector(feedsSelectors.orders);
  const total: number = useSelector(feedsSelectors.total);
  const totalToday: number = useSelector(feedsSelectors.totalToday);
  const feed = { total: total, totalToday: totalToday };

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
