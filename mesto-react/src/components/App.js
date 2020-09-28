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
  const [selectedCard, setSelectedCard] = React.useState({});

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
    setSelectedCard({});
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

const [dataProfile, setDataProfile] = React.useState([]);
const [dataCards, setDataCards] = React.useState([]);

  useEffect(() => {
    api.getAppInfo().then((res) => {
      const [initialCard, profileData] = res;
      setDataProfile(profileData)
      setDataCards(initialCard)
    })
    .catch(err => console.error(err))
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
        dataCard={dataCards}
        onCardClick={handleCardClick}
        card={selectedCard}
      />
      <ImagePopup card={selectedCard} 
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
    </div>
  );
}

export default App;
