import { Navigate, useLocation } from 'react-router';
import { useSelector } from '../../services/store';
import { userSelectors } from '../../storage/slices/user';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  //  const isAuthChecked = useSelector(isAuthCheckedSelector); // isAuthCheckedSelector — селектор получения состояния загрузки пользователя

  const user = useSelector(userSelectors.user);
  const location = useLocation();

  // if (!isAuthChecked) { // пока идёт чекаут пользователя, показываем прелоадер
  //    return (<div>Loading...</div>)
  // }

  if (!onlyUnAuth && !user) {
    // если пользователь на странице авторизации и данных в хранилище нет, то делаем редирект
    return <Navigate replace to='/login' state={{ from: location }} />; // в поле from объекта location.state записываем информацию о URL
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};
