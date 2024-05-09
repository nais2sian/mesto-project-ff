const enableValidation = (config, formElement) => {
  const inputElements = formElement.querySelectorAll(config.inputSelector);
  inputElements.forEach(function (input) {
    input.addEventListener("input", function () {
      isValid(input);
    });
  });
  formElement.addEventListener("submit", function (evt) {
    evt.preventDefault();
  });
};

function clearValidation(profileForm, config) {
  const inputElements = profileForm.querySelectorAll(config.inputSelector);
  inputElements.forEach((element) => {
    element.classList.remove(config.inputErrorClass);
    element.setCustomValidity("");
    const errorElement = element.nextElementSibling;
    errorElement.classList.remove("popup__error_visible");
    errorElement.textContent = "";
  });
}

function isValid(inputElement) {
  const errorElement = inputElement.nextElementSibling;
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    inputElement.classList.add("popup__input_type_error");
    errorElement.classList.add("popup__error_visible");
  } else {
    inputElement.classList.remove("popup__input_type_error");
    errorElement.classList.remove("popup__error_visible");
    inputElement.setCustomValidity("");
    errorElement.textContent = "";
  }
  if (!inputElement.validity.valid) {
    inputElement.classList.add("popup__input_type_error");
    errorElement.classList.add("popup__error_visible");
    errorElement.textContent = inputElement.validationMessage;
  } else {
    inputElement.classList.remove("popup__input_type_error");
    errorElement.classList.remove("popup__error_visible");
    errorElement.textContent = "";
  }
}

function enableToggle(config) {
  const forms = document.querySelectorAll(".popup__form");
  forms.forEach(function (formElement) {
    const inputList = Array.from(
      formElement.querySelectorAll(config.inputSelector)
    );
    const buttonElement = formElement.querySelector(
      config.submitButtonSelector
    );

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        toggleButtonState(inputList, buttonElement);
      });
    });
  });
}

function hasInvalidInput(input) {
  return input.some((element) => {
    return !element.validity.valid;
  });
}

function toggleButtonState(inputElements, buttonElement) {
  if (hasInvalidInput(inputElements) === true) {
    buttonElement.classList.add("popup__button_disabled");
  } else {
    buttonElement.classList.remove("popup__button_disabled");
  }
}

export { enableValidation, clearValidation, isValid, enableToggle };
