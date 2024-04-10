import { createCard, deleteCard, likeReaction } from "./card.js";

import { openModal, closeModal, setupCloseEventListeners } from "./modal.js";

import { initialCards } from "./cards.js";

const content = document.querySelector(".content");
const popups = document.querySelectorAll(".popup");
const pageSection = content.querySelector(".places.page__section");
const plasesList = pageSection.querySelector(".places__list");
const profile = content.querySelector(".profile.page__section");
const profileInfo = profile.querySelector(".profile__info");
const nameContent = profileInfo.querySelector('.profile__title');
const jobContent = profileInfo.querySelector('.profile__description');
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
// ФОРМА ДОБАВЛЕНИЯ НОВЫХ КАРТОЧЕК
const popupNewCard = document.querySelector(".popup.popup_type_new-card");
const newCardCont = popupNewCard.querySelector(".popup__content");
const newCardForm = newCardCont.querySelector(".popup__form");
const placeInput = newCardForm.querySelector(
  ".popup__input.popup__input_type_card-name"
);
const linkInput = newCardForm.querySelector(
  ".popup__input.popup__input_type_url"
);

function createCards() {
  initialCards.forEach(function (elements) {
    const card = createCard(elements, deleteCard, likeReaction, openImgWindow);
    plasesList.append(card);
  });
}
createCards();

popups.forEach(function (element) {
  element.classList.add('popup_is-animated');
  element.addEventListener("click", function (event) {
    setupCloseEventListeners(event);
  })
})

// Открытие формы добавления карточек
profileAddBtn.addEventListener("click", function () {
  openModal(popupNewCard);
});

// Открытие редактирование профиля
profileEditBtn.addEventListener("click", function () {
  openModal(popupProfile);
  nameInput.value = nameContent.textContent;
  jobInput.value = jobContent.textContent;
});

//Открытие полноэкранной картинки
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
  nameContent.textContent = nameInput.value;
  jobContent.textContent = jobInput.value; 
  closeModal(popupProfile);
}

/// ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ
popupNewCard.addEventListener("submit", formSubmit);
function formSubmit(evt) {
  evt.preventDefault();
  const placeValue = placeInput.value;
  const linkValue = linkInput.value;
  const input = { name: placeValue, link: linkValue };
  const newCard = createCard(input, deleteCard, likeReaction, openImgWindow);
  plasesList.prepend(newCard);
  newCardForm.reset();
  closeModal(popupNewCard);
}
