function createCard(cardElements, deleteFunc, likeFunc, openImg, userId) {
  const template = document.querySelector("#card-template").content;
  const card = template.querySelector(".places__item.card").cloneNode(true);
  const button = card.querySelector(".card__delete-button");
  const cardContainer = card.querySelector(".card__description");
  const likesBox = cardContainer.querySelector(".likeCounter");
  const likeButton = cardContainer.querySelector(".card__like-button");
  const cardImage = card.querySelector(".card__image");
  const cardDescription = card.querySelector(".card__title");

  cardImage.src = cardElements.link;
  cardImage.alt = "Фотография: " + cardElements.name;
  cardDescription.textContent = cardElements.name;
  cardImage.name = cardElements.name;

  /// УДАЛЕНИЕ КАРТОЧКИ
  if (userId === cardElements.owner._id) {
    button.addEventListener("click", function () {
      deleteFunc(card, cardElements._id);
    });
  } else {
    button.style.display = "none";
  }
  /// КНОПКА ЛАЙК
  likeButton.addEventListener("click", function () {
    likeFunc(likeButton, cardElements, likesBox);
  });

  /// ОТОБРАЖЕНИЕ КОЛИЧЕСТВА ЛАЙКОВ
  checkLike(cardElements, userId, likeButton);
  const likeNumber = cardElements.likes.length;
  likesBox.textContent = likeNumber;

  ///  РАЗВЕРНУТЬ КАРТИНКУ
  cardImage.addEventListener("click", function () {
    openImg(cardImage);
  });

  return card;
}

function checkLike(card, userId, btn) {
  const userArray = card.likes;
  userArray.forEach(function (user) {
    if (user._id === userId) {
      btn.classList.add("card__like-button_is-active");
    }
  });
}

export { createCard };
