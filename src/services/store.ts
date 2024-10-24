import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import ingredientSlice, {
  ingredientRedusers
} from '../storage/slices/ingredients';
import feedsSlice, { feedsRedusers } from '../storage/slices/feeds';

// const rootReducer = () => {
//   return([ingredientSlice.name]: ingredientSlice.reducer,

// }; // Заменить на импорт настоящего редьюсера

const rootReducer = combineReducers({
  [ingredientSlice.name]: ingredientRedusers,
  [feedsSlice.name]: feedsRedusers
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
