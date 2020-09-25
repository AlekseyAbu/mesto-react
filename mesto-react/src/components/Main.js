import React from 'react';
import imagePlus from '../images/plus.svg';
import PopupWithForm from './PopupWithForm.js';
import Card from './Card.js';

function Main(props) {
    return (
        <main className="main">
            <section className="profile">
                <button className="profile__foto" onClick={props.onEditAvatar} style={{ backgroundImage: `url(${props.dataProfile.avatar})` }}></button>
                <div className="profile__description">
                    <div className="profile__name">
                        <h2 className="profile__title">{props.dataProfile.name}</h2>
                        <button className="profile__title-buttom" onClick={props.onEditProfile}></button>
                    </div>
                    <p className="profile__subtitle">{props.dataProfile.about}</p>
                </div>
                <button className="profile__button" onClick={props.onAddPlace}>
                    <img className="profile__plus" src={imagePlus} alt="Плюс" />
                </button>
            </section>

            <section className="content">
                <ul className="content__cards">
                {props.dataCard.map((item, i) => <Card key={i} item={item} onCardClick={props.onCardClick}/>)}
                </ul>
            </section>

            <PopupWithForm name='popup_avatar' title='Обновить аватар' text='Сохранить' isOpen={props.isAvatar} isClose={props.onClose}>
                <input id='input__name' type="url" className="popup__input popup__input_name" name="name" defaultValue=""
                    minLength="2" maxLength="200" required />
                <span id='input__name-error' className="popup__error"></span>
            </PopupWithForm>

            <PopupWithForm name='popup_profile' title='Редактировать профиль' text='Сохранить' isOpen={props.isProfile} isClose={props.onClose}>
                <input id='input__name' type="text" className="popup__input popup__input_name" name="name" defaultValue=""
                    minLength="2" maxLength="40" required />
                <span id='input__name-error' className="popup__error"></span>
                <input id='input__description' type="text" className="popup__input popup__input_description"
                    name="about" defaultValue="" minLength="2" maxLength="200" required />
                <span id='input__description-error' className="popup__error"></span>
            </PopupWithForm>

            <PopupWithForm name='popup_card' title='Новое место' text='Сохранить' isOpen={props.isPlace} isClose={props.onClose}>
            <input id='input__cardname' type="text" className="popup__input popup__input_name popup__input_cardname"
                name="name" defaultValue="" placeholder='Название' required minLength="2" maxLength="40" />
              <span id='input__cardname-error' className="popup__error"></span>
              <input id='input__link' type="url" className="popup__input popup__input_description popup__input_link"
                name="link" defaultValue="" placeholder="Ссылка на картинку" required />
              <span id='input__link-error' className="popup__error"></span>
            </PopupWithForm>

            
        </main>
    )
}



export default Main;