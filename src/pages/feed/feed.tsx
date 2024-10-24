import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { fetchFeeds } from '../../storage/thunk/feeds';
import { feedsSelectors } from '../../storage/slices/feeds';
import { useSelector } from '../../services/store';
export const Feed: FC = () => {
  /** TODO: взять переменную из стора */

  const dispatch = useDispatch();
  let orders: TOrder[] = [];
  orders = useSelector(feedsSelectors.feeds);

  useEffect(() => {
    dispatch(fetchFeeds());
  }, []);

  if (orders.length === 0) {
    return <Preloader />;
  } else {
    console.log(orders);
    return <FeedUI orders={orders} handleGetFeeds={() => {}} />;
  }
};
