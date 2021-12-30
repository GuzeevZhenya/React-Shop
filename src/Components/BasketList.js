import React from 'react';
import { BasketItem } from './BasketItem';

export default function BasketList(props) {
  const {
    order = [],
    handleBasketShow = Function.prototype,
		removeFromBasket = Function.prototype,
		decQuantity,
		incQuantity
  } = props;
  const totalPrice = order.reduce((sum, el) => {
    return sum + el.price * el.quantity;
  }, 0);
  return (
    <ul className="collection basket-list">
      <li href="#!" className="collection-item active">
        Корзина
      </li>
      {order.length ? (
        order.map((item) => (
          <BasketItem removeFromBasket={removeFromBasket} decQuantity={decQuantity} incQuantity={incQuantity} key={item.id} in {...item} />
        ))
      ) : (
        <li className="collection-item">Корзина пуста</li>
      )}
      <li className="collection-item active">
        Общая стоимость:{totalPrice} руб.
        <i className="material-icons basket-close" onClick={handleBasketShow}>
          close
        </i>
      </li>
    </ul>
  );
}
