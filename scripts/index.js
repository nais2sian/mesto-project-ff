const content = document.querySelector('.content');
const pageSection = content.querySelector('.places.page__section'); 
const placesList = pageSection.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content; 

function addCard(link, name) {
  const cardElement = cardTemplate.querySelector('.places__item.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button'); 

  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__title').textContent = name;

  deleteButton.addEventListener('click', function(){
    deleteElement(cardElement);
  });

  pageSection.append(cardElement);
}

function createCards (){
  initialCards.forEach(function(item){
    addCard(item.link, item.name); 
  })
}
createCards(); 

function deleteElement(targetElement){
  targetElement.remove();
}
