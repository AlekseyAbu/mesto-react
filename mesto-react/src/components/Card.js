import React from 'react';

function Card({item, onCardClick}) {
    function handleClick() {
        onCardClick(item);
      }
    return(
        <li className="card">
          <button className="card__basket"></button>
          <img className="card__img" src={item.link} alt="Карачаевск" onClick={handleClick}/>
          <div className="card__label">
            <h3 className="card__title">{item.name}</h3>
            <div className="card__conteiner-like">
              <button className="card__label-like "></button>
              <p className="card__number-like">{item.likes.length}</p>
            </div>
          </div>
        </li>
    )
}

export default Card;

