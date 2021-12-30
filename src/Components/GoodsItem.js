import React from 'react';

export const GoodsItem = (props) => {
  const { id, name, description, price, full_background,image,icon,addToBasket=Function.prototype } = props;
  return (
    <div className="card" id={id}>
      <img src={full_background && image && icon} alt={name} />
      <div className="card-content">
        <span className="card-title">{name}</span>
        <p>{description}</p>
      </div>
      <div className="card-action">
        <button className="btn" onClick={()=>addToBasket({id,name,price})}>Купить</button>
        <span className="right" style={{fontSize:'1.8rem'}}>{price} руб</span>
      </div>
    </div>
  );
};
