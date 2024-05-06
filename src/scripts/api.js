function getUserData() {
  return fetch("https://nomoreparties.co/v1/wff-cohort-12/users/me", {
    headers: {
      authorization: "63f0e1bd-551c-4a91-abdc-db7a53e874be",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
    });
}

function getCardsData() {
  return fetch("https://nomoreparties.co/v1/wff-cohort-12/cards", {
    headers: {
      authorization: "63f0e1bd-551c-4a91-abdc-db7a53e874be",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
    });
}

///Редактирование профиля
function updateProfile(name, job) {
  fetch("https://nomoreparties.co/v1/wff-cohort-12/users/me", {
    method: "PATCH",
    headers: {
      authorization: "63f0e1bd-551c-4a91-abdc-db7a53e874be",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      about: job,
    }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((data) => {
      console.log("Profile updated:", data);
    })
    .catch((error) => {
      console.error("Failed to update profile:", error);
    });
}

///Добавление новой карточки
function postCard(place, link) {
  return fetch("https://nomoreparties.co/v1/wff-cohort-12/cards", {
    method: "POST",
    headers: {
      authorization: "63f0e1bd-551c-4a91-abdc-db7a53e874be",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: place,
      link: link,
    }),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

///Удаление карточки
function deleteServerCard(id) {
  const url = "https://nomoreparties.co/v1/wff-cohort-12/cards/";
  fetch(url + id, {
    method: "DELETE",
    headers: {
      authorization: "63f0e1bd-551c-4a91-abdc-db7a53e874be",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((data) => {
      console.log("Profile updated:", data);
    })
    .catch((error) => {
      console.error("Failed to update profile:", error);
    });
}

/// Поставить лайк
function setLike(id) {
  const url = "https://nomoreparties.co/v1/wff-cohort-12/cards/likes/";
  return fetch(url + id, {
    method: "PUT",
    headers: {
      authorization: "63f0e1bd-551c-4a91-abdc-db7a53e874be",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Failed to update like:", error);
      throw error;
    });
}

/// Удалить лайк
function deleteLike(id) {
  const url = "https://nomoreparties.co/v1/wff-cohort-12/cards/likes/";
  return fetch(url + id, {
    method: "DELETE",
    headers: {
      authorization: "63f0e1bd-551c-4a91-abdc-db7a53e874be",
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

/// Обновление аватара пользователя
function newAvatar(link) {
  return fetch("https://nomoreparties.co/v1/wff-cohort-12/users/me/avatar", {
    method: "PATCH",
    headers: {
      authorization: "63f0e1bd-551c-4a91-abdc-db7a53e874be",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: link,
    }),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

export {
  getUserData,
  getCardsData,
  updateProfile,
  postCard,
  deleteServerCard,
  setLike,
  deleteLike,
  newAvatar,
};
