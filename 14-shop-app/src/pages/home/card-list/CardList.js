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

  // const handleLoad = async () => {
  //   const queryOptions = {
  //     conditions: [
  //       {
  //         field: 'category',
  //         operator: category ? 'EQUAL' : 'GREATER_THAN_OR_EQUAL',
  //         value: category,
  //       },
  //     ],
  //   };
  //   await getDatasRest('products', queryOptions);
  // };

  useEffect(() => {
    const queryOptions = {
      conditions: [
        {
          field: 'category',
          operator: category ? 'EQUAL' : 'GREATER_THAN_OR_EQUAL',
          value: category,
        },
      ],
      orders: [
        {
          orderField: 'id',
          direction: 'ASCENDING',
        },
      ],
    };
    dispatch(fetchProducts({ collectionName: 'products', queryOptions }));
    // handleLoad();
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
