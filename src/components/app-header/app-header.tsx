import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { userSelectors } from '../../storage/slices/user';

export const AppHeader: FC = () => {
  const user = useSelector(userSelectors.user);
  let name = '';
  if (user) name = user.name;
  return <AppHeaderUI userName={name} />;
};
