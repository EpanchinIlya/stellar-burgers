import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';

import { useDispatch } from '../../services/store';
import { useSelector } from '../../services/store';
import { userSelectors } from '../../storage/slices/user';
import { Preloader } from '@ui';
import { fetchRegisterUserApi } from '../../storage/thunk/user';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const error = useSelector(userSelectors.error);
  const isUserLoading = useSelector(userSelectors.isUserLoading);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(
      fetchRegisterUserApi({ name: userName, email: email, password: password })
    );
  };

  if (isUserLoading) {
    return <Preloader />;
  } else {
    return (
      <RegisterUI
        errorText={error}
        email={email}
        userName={userName}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        setUserName={setUserName}
        handleSubmit={handleSubmit}
      />
    );
  }
};
