// ОТКРЫТИЕ И ЗАКРЫТИЕ МОДАЛЬНЫХ ОКОН
function openModal(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscClose);
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscClose);
}

// закрытие по ESC
document.addEventListener("keydown", handleEscClose);

function handleEscClose(event) {
  if (event.key === "Escape" || event.key === 27) {
    const openModal = document.querySelector(".popup_is-opened");
    if (openModal) {
      closeModal(openModal);
    }
  }
}

// Обработчик закрытия модального окна по клику на крестик или оверлей
function setupCloseEventListeners(event) {
  const isCloseButton = event.target.classList.contains("popup__close");
  const isOverlay = event.target.classList.contains("popup");
  const openModal = document.querySelector(".popup_is-opened");

  if ((isCloseButton || isOverlay) && openModal) {
    closeModal(openModal);
  }
}

export { openModal, closeModal, handleEscClose, setupCloseEventListeners };
