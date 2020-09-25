import React from 'react';
import { useState, useEffect} from 'react';
import '../App.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import api from '../utils/Api.js';
import ImagePopup from './ImagePopup.js';



function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleClosePopup() {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

const [dataProfile, setDataProfile] = React.useState([])

  useEffect(() => {
    api.getUserInfo()
    .then((dataProfile) => {
      setDataProfile(dataProfile)
      console.log(dataProfile)
    })
  }, [])
  
  const [dataCard, setDataCard] = React.useState([])

  useEffect(() => {
    api.getInitialCards()
    .then((dataCard) => {
      setDataCard(dataCard)
      console.log(dataCard)
    })
  }, [])

  return (
    <div className="body">

      <Header />
      <Main onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onClose={handleClosePopup}
        isProfile={isEditProfilePopupOpen}
        isPlace={isAddPlacePopupOpen}
        isAvatar={isEditAvatarPopupOpen}
        dataProfile={dataProfile}
        dataCard={dataCard}
        card={selectedCard}
        onCardClick={handleCardClick}
        card={selectedCard}
      />
      <ImagePopup card={selectedCard} 
      selectedCard={selectedCard}
      onClose={handleClosePopup}
      />
      <Footer />



      

      <section className="popup popup_confirm">
        <div className="popup__container">
          <button className="popup__close-button"></button>
          <h2 className="popup__title">Вы уверены?</h2>
          <form className="popup__form" name="save" noValidate>
            <button className="popup__save">Да</button>
          </form>
        </div>
      </section>

      <template id="card">
        <li className="card">
          <button className="card__basket"></button>
          <img className="card__img" src="./images/Karachayevsk.png" alt="Карачаевск" />
          <div className="card__label">
            <h3 className="card__title">Карачаевск</h3>
            <div className="card__conteiner-like">
              <button className="card__label-like "></button>
              <p className="card__number-like">0</p>
            </div>
          </div>
        </li>
      </template>
    </div>
  );
}

export default App;
