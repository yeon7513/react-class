import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../../store/products/productsSlice';
import CardSkeleton from '../card-skeleton/CardSkeleton';
import styles from './CardList.module.scss';
import CardItem from './card-item/CardItem';

function CardList() {
  const { products, isLoading } = useSelector((state) => state.productsSlice);
  const category = useSelector((state) => state.categoriesSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    const queryOptions = {
      conditions: [
        {
          field: 'category',
          operator: category ? '==' : '>=',
          value: category,
        },
      ],
      orders: [
        {
          field: 'id',
          direction: 'asc',
        },
      ],
    };
    dispatch(fetchProducts({ collectionName: 'products', queryOptions }));
  }, [category, dispatch]);

  if (isLoading) return <CardSkeleton />;

  return (
    <ul className={styles.cardList}>
      {products.map((product) => (
        <CardItem key={product.id} product={product} />
      ))}
    </ul>
  );
}

export default CardList;
