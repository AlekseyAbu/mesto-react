import React from 'react';
import { useState, useEffect } from 'react';
import '../App.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import api from '../utils/Api.js';
import ImagePopup from './ImagePopup.js';
import { CurrentUserContext } from './contexts.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [dataCards, setDataCards] = React.useState([]);

  const [currentUser, setCurrentUser] = React.useState({});

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

  function handleUpdateUser(data) {
    api.creatProfile(data).then((res) => {
      setCurrentUser(res)
      console.log(res)
      setIsEditProfilePopupOpen(false);
  })
  .catch((err) => {
      console.log(err); 
    });
  }

  function handleUpdateAvatar(avatar){
    api.creatAvatar(avatar).then((res) => {
      setCurrentUser(res)
      console.log(res)
      setIsEditAvatarPopupOpen(false);
  })
  .catch((err) => {
      console.log(err); 
    });
  }

  function handleAddPlaceSubmit(data) {
    api.createInitialCards(data).then(res => {
      setDataCards([res, ...dataCards]); 
      setIsAddPlacePopupOpen(false);
  })
  .catch((err) => {
      console.log(err); 
    });
  }

  function handleCardDelete(id) {
    api.deletInitialCards(id).then(() => {
      console.log(id)
      console.log(dataCards)
      const newDataCards = dataCards.filter((item) => item._id !== id);
      console.log(newDataCards)
      setDataCards(newDataCards);
    })
    .catch(err => console.error(err))
  }

  function handleCardLike(card) {
    api.likeCard(card._id).then((newCard) => {
      const newDataCards = dataCards.map((item) => item._id !== card._id ? item : newCard);
      setDataCards(newDataCards);
    })
    .catch(err => console.error(err))
  }

  function handleCardDislike(card) {
    api.dislikeCard(card._id).then((newCard) => {
      const newDataCards = dataCards.map((item) => item._id !== card._id ? item : newCard) ;
      setDataCards(newDataCards);
    })
    .catch(err => console.error(err))
  }

  useEffect(() => {
    api.getAppInfo().then((res) => {
      const [initialCard, profileData] = res;
      setCurrentUser(profileData)
      setDataCards(initialCard)
      console.log(profileData)
    })
      .catch(err => console.error(err))
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <Header />
        <Main onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          isPlace={isAddPlacePopupOpen}
          isAvatar={isEditAvatarPopupOpen}
          onEditAvatar={handleEditAvatarClick}
          dataCard={dataCards}
          onCardClick={handleCardClick}
          card={selectedCard}
          onCardDelete={handleCardDelete}
          onCardLike={handleCardLike}
          onCardDislike={handleCardDislike}
        />
        <ImagePopup card={selectedCard}
          onClose={handleClosePopup}
        />
        <Footer />

        <EditProfilePopup 
        isOpen={isEditProfilePopupOpen} 
        isClose={handleClosePopup} 
        onSubmitHandler={handleUpdateUser}
        />

        <EditAvatarPopup 
        isOpen={isEditAvatarPopupOpen} 
        isClose={handleClosePopup} 
        onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup 
        isOpen={isAddPlacePopupOpen} 
        isClose={handleClosePopup} 
        onAddPlace={handleAddPlaceSubmit}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
