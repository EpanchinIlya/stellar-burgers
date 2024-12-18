import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <>
          <NavLink to={'/'}>
            <BurgerIcon
              type={location.pathname === '/' ? 'primary' : 'secondary'}
            />
          </NavLink>
          <NavLink
            to={'/'}
            className={
              location.pathname === '/'
                ? `${styles.link} ${styles.link_active}`
                : `${styles.link}`
            }
          >
            <p className='text text_type_main-default ml-2 mr-10'>
              Конструктор
            </p>
          </NavLink>
        </>
        <>
          <NavLink to='/feed'>
            <BurgerIcon
              type={location.pathname === '/feed' ? 'primary' : 'secondary'}
            />
          </NavLink>
          <NavLink
            to={'/feed'}
            className={
              location.pathname === '/feed'
                ? `${styles.link} ${styles.link_active}`
                : `${styles.link}`
            }
          >
            <p className='text text_type_main-default ml-2'>Лента заказов</p>
          </NavLink>
        </>
      </div>

      <div className={styles.logo}>
        <Logo className='' />
      </div>
      <div className={styles.link_position_last}>
        <NavLink to='/feed'>
          <ProfileIcon type={'primary'} />
        </NavLink>

        <NavLink
          to={'/profile'}
          className={
            location.pathname === '/profile' ||
            location.pathname === '/login' ||
            location.pathname === '/forgot-password' ||
            location.pathname === '/register' ||
            location.pathname === '/reset-password' ||
            location.pathname === '/profile/orders'
              ? `${styles.link} ${styles.link_active}`
              : `${styles.link}`
          }
        >
          <p className='text text_type_main-default ml-2'>
            {userName || 'Личный кабинет'}
          </p>
        </NavLink>
      </div>
    </nav>
  </header>
);
