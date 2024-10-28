import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { fetchLoginUser } from '../../storage/thunk/user';
import { useDispatch } from '../../services/store';

import { useSelector } from '../../services/store';
import { userSelectors } from '../../storage/slices/user';
import { Preloader } from '@ui';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const error = useSelector(userSelectors.error);
  const isUserLoading = useSelector(userSelectors.isUserLoading);
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(fetchLoginUser({ email: email, password: password }));
  };

  if (isUserLoading) {
    return <Preloader />;
  } else {
    return (
      <LoginUI
        errorText={error}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
      />
    );
  }
};
