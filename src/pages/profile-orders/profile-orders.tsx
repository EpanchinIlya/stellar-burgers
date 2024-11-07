import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector } from '../../services/store';
import { userSelectors } from '../../storage/slices/user';
import { useDispatch } from '../../services/store';
import { fetchGetOrdersApi } from '../../storage/thunk/user';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  /**  взять переменную из стора */
  const dispatch = useDispatch();
  const userOrders = useSelector(userSelectors.userOrders);

  useEffect(() => {
    if (userOrders.length === 0) dispatch(fetchGetOrdersApi());
  }, []);

  return <ProfileOrdersUI orders={userOrders} />;
};
