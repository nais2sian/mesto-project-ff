import { setLike, deleteLike } from "./api.js";

function createCard(cardElements, deleteFunc, openImg, userId) {
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

  likeButton.addEventListener("click", function () {
    if (likeButton.classList.contains("card__like-button_is-active")) {
      deleteLike(cardElements._id)
        .then((data) => {
          likesBox.textContent = data.likes.length;
          likeButton.classList.remove("card__like-button_is-active");
        })
        .catch((error) => {
          console.error("Failed to update profile:", error);
        });
    } else {
      setLike(cardElements._id)
        .then(() => {
          likeButton.classList.add("card__like-button_is-active");
          likesBox.textContent = parseInt(likesBox.textContent) + 1;
        })
        .catch((error) => {
          console.error("Failed to update like:", error);
        });
    }
  });

  /// ОТОБРАЖЕНИЕ КОЛИЧЕСТВА ЛАЙКОВ
  checkLike(cardElements, userId, likeButton);
  const likeNumber = cardElements.likes.length;
  likesBox.textContent = likeNumber;
  /// РАЗВЕРНУТЬ КАРТИНКУ
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
