import React from 'react';
import { CategoriesName } from '../../../store/categories/categories';
import styles from './FiltersCategory.module.scss';
import CategoryTab from './category-tab/CategoryTab';

function FiltersCategory() {
  return (
    <div className={styles.category}>
      <CategoryTab text="모두" categoryName={CategoriesName.all} />
      <CategoryTab text="전자기기" categoryName={CategoriesName.electronics} />
      <CategoryTab text="쥬얼리" categoryName={CategoriesName.jewelry} />
      <CategoryTab text="남성의류" categoryName={CategoriesName.mensClothing} />
      <CategoryTab
        text="여성의류"
        categoryName={CategoriesName.womensClothing}
      />
    </div>
  );
}

export default FiltersCategory;
