import { createCard } from "./card.js";

import { openModal, closeModal, setupCloseEventListeners } from "./modal.js";

import {
  getUserData,
  getCardsData,
  updateProfile,
  postCard,
  deleteServerCard,
  setLike,
  deleteLike,
  newAvatar,
} from "./api.js";

import {
  objElements,
  enableValidation,
  enableToggle,
  clearValidation,
} from "./validation.js";

const content = document.querySelector(".content");
const popups = document.querySelectorAll(".popup");
const pageSection = content.querySelector(".places.page__section");
const placesList = pageSection.querySelector(".places__list");
const profile = content.querySelector(".profile.page__section");
const profileInfo = profile.querySelector(".profile__info");
const avatarImg = profile.querySelector(".profile__image");
const nameContent = profileInfo.querySelector(".profile__title");
const jobContent = profileInfo.querySelector(".profile__description");
const profileEditBtn = profileInfo.querySelector(".profile__edit-button");
const profileAddBtn = profile.querySelector(".profile__add-button");
///  РАЗВЕРНУТЬ КАРТИНКУ
const popupCardImg = document.querySelector(".popup.popup_type_image");
const popupContImg = popupCardImg.querySelector(
  ".popup__content.popup__content_content_image"
);
const popupImg = popupContImg.querySelector(".popup__image");
const popupImgCaption = popupContImg.querySelector(".popup__caption");
/// РЕДАКТИРОВАТЬ ПРОФИЛЬ
const popupProfile = document.querySelector(".popup.popup_type_edit");
const profileCont = popupProfile.querySelector(".popup__content");
const profileForm = profileCont.querySelector(".popup__form");
const nameInput = profileForm.querySelector(
  ".popup__input.popup__input_type_name"
);
const jobInput = profileForm.querySelector(
  ".popup__input.popup__input_type_description"
);
const profileBtn = profileForm.querySelector(".button.popup__button");
/// РЕДАКТИРОВАНИЕ ПРОФИЛЯ
const popupAvatar = document.querySelector(".popup.popup_type_new-avatar");
const avatarCont = popupAvatar.querySelector(".popup__content");
const avatarForm = avatarCont.querySelector(".popup__form");
const inputAvatar = avatarForm.querySelector(
  ".popup__input.popup__input_type_url"
);
const avatarButton = avatarForm.querySelector(".button.popup__button");
/// ФОРМА ДОБАВЛЕНИЯ НОВЫХ КАРТОЧЕК
const popupNewCard = document.querySelector(".popup.popup_type_new-card");
const newCardCont = popupNewCard.querySelector(".popup__content");
const newCardForm = newCardCont.querySelector(".popup__form");
const popupButton = newCardForm.querySelector(".button.popup__button");
const placeInput = newCardForm.querySelector(
  ".popup__input.popup__input_type_card-name"
);
const linkInput = newCardForm.querySelector(
  ".popup__input.popup__input_type_url"
);

function allFetch() {
  Promise.all([getUserData(), getCardsData()])
    .then(([userData, cards]) => {
      createCards(cards, userData._id);
    })
    .catch((error) => {
      console.error("Error processing data: ", error);
    });
}
allFetch();

function createCards(array, userId) {
  array.forEach(function (elements) {
    const card = createCard(
      elements,
      deleteCard,
      likeReaction,
      openImgWindow,
      userId
    );
    placesList.append(card);
  });
}

popups.forEach(function (element) {
  element.classList.add("popup_is-animated");
  element.addEventListener("click", function (event) {
    setupCloseEventListeners(event);
  });
});

/// ОТКРЫТИЕ ФОРМЫ ДОБАВЛЕНИЯ КАРТОЧЕК
profileAddBtn.addEventListener("click", function () {
  openModal(popupNewCard);
  popupButton.classList.add("popup__button_disabled");
  newCardForm.reset();
  popupButton.textContent = "Сохранить";
  clearValidation(newCardForm, objElements);
});

/// ПОЛУЧЕНИЕ ДАННЫХ ДЛЯ ПРОФИЛЯ
getUserData()
  .then((data) => {
    if (data) {
      createProfile(data);
    }
  })
  .catch((error) => {
    console.error("Error handling data: ", error);
  });

/// ОТОБРАЖЕНИЕ ДАННЫХ ПРОФИЛЯ
function createProfile(data) {
  nameContent.textContent = data.name;
  jobContent.textContent = data.about;
  const link = data.avatar;
  avatarImg.style.backgroundImage = `url('${link}')`;
}

/// ОТКРЫТИЕ РЕДАКТИРОВАНИЯ ПРОФИЛЯ
profileEditBtn.addEventListener("click", function () {
  openModal(popupProfile);
  profileBtn.textContent = "Сохранить";
  clearValidation(popupProfile, objElements);
  nameInput.value = nameContent.textContent;
  jobInput.value = jobContent.textContent;
});

/// ОТКРЫТИЕ ПОЛНОЭКРАННОЙ КАРТИНКИ
function openImgWindow(input) {
  openModal(popupCardImg);
  popupImg.src = input.src;
  popupImg.alt = input.alt;
  popupImgCaption.textContent = input.name;
}

/// РЕДАКТИРОВАНИЕ ПРОФИЛЯ
profileForm.addEventListener("submit", handleFormSubmit);
function handleFormSubmit(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const job = jobInput.value;
  updateProfile(name, job);
  profileBtn.textContent = "Сохранение...";
  nameContent.textContent = name;
  jobContent.textContent = job;
  closeModal(popupProfile);
}

/// ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ
popupNewCard.addEventListener("submit", formSubmit);
function formSubmit(evt) {
  evt.preventDefault();
  const place = placeInput.value;
  const link = linkInput.value;
  postCard(place, link)
    .then((data) => {
      console.log("Profile updated:", data);
      const userId = data.owner._id;
      const newCard = createCard(
        data,
        deleteCard,
        likeReaction,
        openImgWindow,
        userId
      );
      placesList.prepend(newCard);
    })
    .catch((error) => {
      console.error("Failed to update profile:", error);
    });
  popupButton.textContent = "Сохранение...";
  newCardForm.reset();
  closeModal(popupNewCard);
}

/// ОТКРЫТЬ РЕДАКТИРОВАНИЕ АВАТАРА
avatarImg.addEventListener("click", function () {
  openModal(popupAvatar);
  avatarButton.classList.add("popup__button_disabled");
  avatarForm.reset();
  avatarButton.textContent = "Сохранить";
});

/// РЕДАКТИРОВАНИЕ АВАТАРА ПОЛЬЗОВАТЕЛЯ
popupAvatar.addEventListener("submit", avatarSubmit);
function avatarSubmit(evt) {
  evt.preventDefault();
  const link = inputAvatar.value;
  newAvatar(link)
    .then((data) => {
      console.log("Profile updated:", data);
      const link = data.avatar;
      avatarImg.style.backgroundImage = `url('${link}')`;
    })
    .catch((error) => {
      console.error("Failed to update profile:", error);
    });
  avatarButton.textContent = "Сохранение...";
  closeModal(popupAvatar);
  avatarForm.reset();
}

/// ОБЕСПЕЧЕНИЕ ВАЛИДАЦИИ
const forms = document.querySelectorAll(".popup__form");
forms.forEach(function (formElement) {
  enableValidation(objElements, formElement);
});

/// ОБЕСПЕЧЕНИЕ ПЕРЕКЛЮЧЕНИЯ СОСТОЯНИЯ КНОПОК
enableToggle(objElements);
function deleteCard(input, cardId) {
  input.remove();
  deleteServerCard(cardId);
}

function likeReaction(btn, cardElements, likeBox) {
  btn.classList.toggle("card__like-button_is-active");
  const cardId = cardElements._id;
  if (btn.classList.contains("card__like-button_is-active")) {
    likeBox.textContent = parseInt(likeBox.textContent) + 1;
    setLike(cardId)
      .then((data) => {
        console.log("setLike data:", data);
      })
      .catch((error) => {
        console.error("Failed to update like:", error);
        throw error;
      });
  } else {
    const likeNumber = cardElements.likes.length - 1;
    deleteLike(cardId)
      .then((data) => {
        console.log("Profile updated:", data);
        likeBox.textContent = data.likes.length;
      })
      .catch((error) => {
        console.error("Failed to update profile:", error);
      });
  }
}
