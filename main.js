(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-12",headers:{authorization:"63f0e1bd-551c-4a91-abdc-db7a53e874be","Content-Type":"application/json"}};function t(t,o,n,r){var c=document.querySelector("#card-template").content.querySelector(".places__item.card").cloneNode(!0),u=c.querySelector(".card__delete-button"),a=c.querySelector(".card__description"),i=a.querySelector(".likeCounter"),p=a.querySelector(".card__like-button"),s=c.querySelector(".card__image"),l=c.querySelector(".card__title");s.src=t.link,s.alt="Фотография: "+t.name,l.textContent=t.name,s.name=t.name,r===t.owner._id?u.addEventListener("click",(function(){o(c,t._id)})):u.style.display="none",p.addEventListener("click",(function(){var o;p.classList.contains("card__like-button_is-active")?(o=t._id,fetch("".concat(e.baseUrl,"/cards/likes/").concat(o),{headers:e.headers,method:"DELETE"}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(res.status))}))).then((function(e){i.textContent=e.likes.length,p.classList.remove("card__like-button_is-active")})).catch((function(e){console.error("Failed to update profile:",e)})):function(t){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(t),{headers:e.headers,method:"PUT"}).then((function(e){if(!e.ok)throw new Error("Network response was not ok.");return e.json()})).then((function(e){return e}))}(t._id).then((function(){p.classList.add("card__like-button_is-active"),i.textContent=parseInt(i.textContent)+1})).catch((function(e){console.error("Failed to update like:",e)}))})),function(e,t,o){e.likes.forEach((function(e){e._id===t&&o.classList.add("card__like-button_is-active")}))}(t,r,p);var d=t.likes.length;return i.textContent=d,s.addEventListener("click",(function(){n(s)})),c}function o(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",r)}function n(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",r)}function r(e){if("Escape"===e.key||27===e.key){var t=document.querySelector(".popup_is-opened");t&&n(t)}}function c(e,t){e.querySelectorAll(t.inputSelector).forEach((function(e){e.classList.remove(t.inputErrorClass),e.setCustomValidity("");var o=e.nextElementSibling;o.classList.remove("popup__error_visible"),o.textContent=""}))}function u(e,t){(null==t||t>e.length)&&(t=e.length);for(var o=0,n=new Array(t);o<t;o++)n[o]=e[o];return n}var a={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},i=document.querySelector(".content"),p=document.querySelectorAll(".popup"),s=i.querySelector(".places.page__section").querySelector(".places__list"),l=i.querySelector(".profile.page__section"),d=l.querySelector(".profile__info"),_=l.querySelector(".profile__image"),f=d.querySelector(".profile__title"),y=d.querySelector(".profile__description"),m=d.querySelector(".profile__edit-button"),v=l.querySelector(".profile__add-button"),h=document.querySelector(".popup.popup_type_image"),b=h.querySelector(".popup__content.popup__content_content_image"),S=b.querySelector(".popup__image"),q=b.querySelector(".popup__caption"),L=document.querySelector(".popup.popup_type_edit"),k=L.querySelector(".popup__content").querySelector(".popup__form"),C=k.querySelector(".popup__input.popup__input_type_name"),E=k.querySelector(".popup__input.popup__input_type_description"),g=k.querySelector(".button.popup__button"),x=document.querySelector(".popup.popup_type_new-avatar"),j=x.querySelector(".popup__content").querySelector(".popup__form"),w=j.querySelector(".popup__input.popup__input_type_url"),A=j.querySelector(".button.popup__button"),P=document.querySelector(".popup.popup_type_new-card"),U=P.querySelector(".popup__content").querySelector(".popup__form"),O=U.querySelector(".button.popup__button"),T=U.querySelector(".popup__input.popup__input_type_card-name"),D=U.querySelector(".popup__input.popup__input_type_url");function F(e){o(h),S.src=e.src,S.alt=e.alt,q.textContent=e.name}function I(t,o){var n;(n=o,fetch("".concat(e.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:e.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(res.status))}))).then((function(){t.remove()})).catch((function(e){console.error("Failed to remove card:",e)}))}Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))]).then((function(e){var o,n,r,c,a=(c=2,function(e){if(Array.isArray(e))return e}(r=e)||function(e,t){var o=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=o){var n,r,c,u,a=[],i=!0,p=!1;try{if(c=(o=o.call(e)).next,0===t){if(Object(o)!==o)return;i=!1}else for(;!(i=(n=c.call(o)).done)&&(a.push(n.value),a.length!==t);i=!0);}catch(e){p=!0,r=e}finally{try{if(!i&&null!=o.return&&(u=o.return(),Object(u)!==u))return}finally{if(p)throw r}}return a}}(r,c)||function(e,t){if(e){if("string"==typeof e)return u(e,t);var o=Object.prototype.toString.call(e).slice(8,-1);return"Object"===o&&e.constructor&&(o=e.constructor.name),"Map"===o||"Set"===o?Array.from(e):"Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?u(e,t):void 0}}(r,c)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),i=a[0];o=a[1],n=i._id,o.forEach((function(e){var o=t(e,I,F,n);s.append(o)})),function(e){f.textContent=e.name,y.textContent=e.about;var t=e.avatar;_.style.backgroundImage="url('".concat(t,"')")}(i)})).catch((function(e){console.error("Error processing data: ",e)})),p.forEach((function(e){e.classList.add("popup_is-animated"),e.addEventListener("click",(function(e){!function(e){var t=e.target.classList.contains("popup__close"),o=e.target.classList.contains("popup"),r=document.querySelector(".popup_is-opened");(t||o)&&r&&n(r)}(e)}))})),v.addEventListener("click",(function(){O.textContent="Сохранить",o(P),O.classList.add("popup__button_disabled"),U.reset(),c(U,a)})),m.addEventListener("click",(function(){o(L),g.textContent="Сохранить",c(L,a),C.value=f.textContent,E.value=y.textContent})),_.addEventListener("click",(function(){o(x),A.textContent="Сохранить",A.classList.add("popup__button_disabled"),j.reset()})),k.addEventListener("submit",(function(t){t.preventDefault(),g.textContent="Сохранение...";var o=C.value,r=E.value;(function(t,o){return fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:t,about:o})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(res.status))}))})(o,r).then((function(e){console.log("Profile updated:",e),f.textContent=o,y.textContent=r,n(L)})).catch((function(e){console.error("Failed to update profile:",e)})).finally((function(){g.textContent="Сохранить"}))})),P.addEventListener("submit",(function(o){o.preventDefault(),O.textContent="Сохранение...",function(t,o){return fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:t,link:o})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(res.status))}))}(T.value,D.value).then((function(e){console.log("Profile updated:",e);var o=t(e,I,F,e.owner._id);s.prepend(o),n(P),U.reset()})).catch((function(e){console.error("Failed to update profile:",e)})).finally((function(){O.textContent="Сохранить"}))})),x.addEventListener("submit",(function(t){var o;t.preventDefault(),A.textContent="Сохранение...",(o=w.value,fetch("".concat(e.baseUrl,"/users/me/avatar"),{headers:e.headers,method:"PATCH",body:JSON.stringify({avatar:o})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(res.status))}))).then((function(e){console.log("Profile updated:",e);var t=e.avatar;_.style.backgroundImage="url('".concat(t,"')"),n(x),j.reset()})).catch((function(e){console.error("Failed to update profile:",e)})).finally((function(){A.textContent="Сохранить"}))})),document.querySelectorAll(".popup__form").forEach((function(e){!function(e,t){t.querySelectorAll(e.inputSelector).forEach((function(e){e.addEventListener("input",(function(){var t,o;o=(t=e).nextElementSibling,t.validity.patternMismatch?(t.setCustomValidity(t.dataset.errorMessage),o.textContent=t.validationMessage,t.classList.add("popup__input_type_error"),o.classList.add("popup__error_visible")):(t.classList.remove("popup__input_type_error"),o.classList.remove("popup__error_visible"),o.textContent=""),t.validity.valid?(t.classList.remove("popup__input_type_error"),o.classList.remove("popup__error_visible"),o.textContent=""):(t.classList.add("popup__input_type_error"),o.classList.add("popup__error_visible"),o.textContent=t.validationMessage)}))})),t.addEventListener("submit",(function(e){e.preventDefault()}))}(a,e)})),function(e){document.querySelectorAll(".popup__form").forEach((function(t){var o=Array.from(t.querySelectorAll(e.inputSelector)),n=t.querySelector(e.submitButtonSelector);o.forEach((function(e){e.addEventListener("input",(function(){!function(e,t){console.log(e),!0===e.some((function(e){return!e.validity.valid}))?(console.log("не валидно"),t.classList.add("popup__button_disabled")):(console.log("валидно"),t.classList.remove("popup__button_disabled"))}(o,n)}))}))}))}(a)})();
//# sourceMappingURL=main.js.map