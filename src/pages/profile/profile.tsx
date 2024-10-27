import { Preloader } from '@ui';
import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { fetchUpdateUserApi } from '../../storage/thunk/user';
import { useSelector } from '../../services/store';
import { useDispatch } from '../../services/store';
import { userSelectors } from '../../storage/slices/user';

export const Profile: FC = () => {
  /** взять переменную из стора */

  let user = {
    name: '',
    email: ''
  };

  const user_ = useSelector(userSelectors.user);
  const isUserLoading = useSelector(userSelectors.isUserLoading);
  const userError = useSelector(userSelectors.error);
  if (user_) user = user_;

  const [formValue, setFormValue] = useState({
    name: user.name,
    email: user.email,
    password: ''
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const dispatch = useDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!!formValue.password) {
      console.log('все переписываем');

      dispatch(
        fetchUpdateUserApi({
          name: formValue.name,
          email: formValue.email,
          password: formValue.password
        })
      );
    } else {
      console.log('НЕ все переписываем');
      dispatch(
        fetchUpdateUserApi({ name: formValue.name, email: formValue.email })
      );
    }
  };
  /** DODO */

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user.name,
      email: user.email,
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  if (isUserLoading) {
    return <Preloader />;
  } else {
    return (
      <ProfileUI
        updateUserError={userError}
        formValue={formValue}
        isFormChanged={isFormChanged}
        handleCancel={handleCancel}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
      />
    );
  }
};
