function createCard(cardElements, deleteFunc, likeFunc, openImg) {
  const template = document.querySelector("#card-template").content;
  const card = template.querySelector(".places__item.card").cloneNode(true);
  const button = card.querySelector(".card__delete-button");
  const likeButton = card.querySelector(".card__like-button");
  const cardImage = card.querySelector(".card__image");
  const cardDescription = card.querySelector(".card__title");

  cardImage.src = cardElements.link;
  cardImage.alt = "Фотография: " + cardElements.name;
  cardDescription.textContent = cardElements.name;
  cardImage.name = cardElements.name;

  /// УДАЛЕНИЕ КАРТОЧКИ
  button.addEventListener("click", function () {
    deleteFunc(card);
  });

  /// КНОПКА ЛАЙК
  likeButton.addEventListener("click", function () {
    likeFunc(likeButton);
  });

  ///  РАЗВЕРНУТЬ КАРТИНКУ
  cardImage.addEventListener("click", function () {
    openImg(cardImage);
  });

  return card;
}

/// УДАЛЕНИЕ
function deleteCard(input) {
  input.remove();
}

/// ЛАЙК
function likeReaction(input) {
  input.classList.toggle("card__like-button_is-active");
}

export { createCard, deleteCard, likeReaction };
