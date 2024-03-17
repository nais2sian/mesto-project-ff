const content = document.querySelector('.content');
const pageSection = content.querySelector('.places.page__section'); 
const placesList = pageSection.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content; 

function createCard(cardContent, deleteFunc) {
  const cardElement = cardTemplate.querySelector('.places__item.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button'); 

  cardElement.querySelector('.card__image').src = cardContent.link;
  cardElement.querySelector('.card__title').textContent = cardContent.name;

  deleteButton.addEventListener('click', function(){
    deleteFunc(cardElement);
  });

  return (cardElement);
}

function createCards (){
  initialCards.forEach(function(item){
    const cardItem = createCard(item, deleteElement); 
    pageSection.append(cardItem);
  })
}

createCards(); 

function deleteElement(targetElement){
  targetElement.remove();
}
