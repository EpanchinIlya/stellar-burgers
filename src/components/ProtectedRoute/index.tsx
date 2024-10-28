import { Navigate, useLocation } from 'react-router';
import { useSelector } from '../../services/store';
import { userSelectors } from '../../storage/slices/user';

import { useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { Preloader } from '@ui';
import { fetchGetUserApi } from '../../storage/thunk/user';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const dispatch = useDispatch();
  const user = useSelector(userSelectors.user);

  useEffect(() => {
    if (!user) dispatch(fetchGetUserApi());
  }, []);

  // const user = useSelector(userSelectors.user);
  const isUserLoading = useSelector(userSelectors.isUserLoading);
  const location = useLocation();

  if (isUserLoading) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    console.log('!onlyUnAuth && !user');
    console.dir(location.state);
    // если пользователь на странице авторизации и данных в хранилище нет, то делаем редирект
    return <Navigate replace to='/login' state={{ from: location }} />; // в поле from объекта location.state записываем информацию о URL
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};
