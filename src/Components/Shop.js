import React, { useState, useEffect } from 'react';
import { Cart } from './Cart';

import { Preloader } from './Prealoder';
import GoodsList from './GoodsList';
import BasketList from './BasketList';
import { Alert } from './Alert';

export default function Shop() {
  const [ goods, setGoods ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ order, setOrder ] = useState([]);
  const [isBasketShow, setBasketShow] = useState(false);
  const [alertName, setAlertName] = useState('');


  const addToBasket = (item) => {
    const itemIndex = order.findIndex((orderItem) => orderItem.id === item.id);
    //Проверка, если у нас есть уже товар с id то мы его не добавляем повторно
    if (itemIndex < 0) {
      const newItem = {
        ...item,
        quantity: 1,
      };
      setOrder([ ...order, newItem ]);
    } else {
      const newOrder = order.map((orderItem, index) => {
        if (index === itemIndex) {
          return {
            ...orderItem,
            quantity: orderItem.quantity + 1,
          };
        } else {
          return orderItem;
        }
        
      });

      setOrder(newOrder);
    }
    setAlertName(item.name);
  };

  const closeAlert = () => {
    setAlertName('');
};

  const decQuantity = (itemId) => {
    const newOrder = order.map((el) => {
      if (el.id === itemId) {
        const newQuantity = el.quantity - 1;
        return {
          ...el,
          quantity: newQuantity >= 0 ? newQuantity : 0
        };
      } else {
        return el;
      }
    });

    setOrder(newOrder);
  };

  const incQuantity = (itemId) => {
    const newOrder = order.map((el) => {
      if (el.id === itemId) {
        const newQuantity = el.quantity + 1;
        return {
          ...el,
          quantity: newQuantity,
        };
      } else {
        return el;
      }
    });

    setOrder(newOrder);
  };

  const removeFromBasket = (itemId) => {
    const newOrder = order.filter((item) => item.id !== itemId);
    setOrder(newOrder);
  };

  const handleBasketShow = () => {
    setBasketShow(!isBasketShow);
  };

  useEffect(function getGoods() {
    fetch('https://fortniteapi.io/v1/shop?lang=ru', {
      headers: {
        Authorization: '7df6d9b6-acc90453-32102901-c3122e3f',
      },
    })
      .then((reponse) => reponse.json())
      // .then((data)=>console.log(data))
      .then((data) => {
        data.featured && setGoods(data.featured);
        setLoading(false);
      });
  }, []);

  return (
    <main className="container content">
      <Cart quantity={order.length} handleBasketShow={handleBasketShow} />
      {loading ? <Preloader /> : <GoodsList goods={goods} addToBasket={addToBasket} />}
      {isBasketShow && (
        <BasketList
          order={order}
          handleBasketShow={handleBasketShow}
          removeFromBasket={removeFromBasket}
          decQuantity={decQuantity}
          incQuantity={incQuantity}
        />
      )}
      {alertName && <Alert name={alertName} closeAlert={closeAlert} />}
    </main>
  );
}
