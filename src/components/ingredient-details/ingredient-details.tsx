import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { ingredientSelectors } from '../../storage/slices/ingredients';
import { useLocation } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */

  let ingredientData = null;

  const ingredients = useSelector(ingredientSelectors.ingredients);
  const location = useLocation();
  const pathname = location.pathname.split('/');
  const id = pathname[pathname.length - 1];
  const foundIngredientMass = ingredients.filter(
    (ingredient) => ingredient._id === id
  );

  ingredientData = foundIngredientMass[0] ? foundIngredientMass[0] : null;

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
