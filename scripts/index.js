const initialCards = [
	{
	  name: "Архыз",
	  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
	},
	{
	  name: "Челябинская область",
	  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
	},
	{
	  name: "Иваново",
	  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
	},
	{
	  name: "Камчатка",
	  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
	},
	{
	  name: "Холмогорский район",
	  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
	},
	{
	  name: "Байкал",
	  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
	},
 ]; // массив ссылок на фото и их название 

const profileEditPopup = document.querySelector(".popup_type_edit"); // popup редактирование профиля
const cardAddPopup = document.querySelector(".popup_type_card"); // popup добавление карточки
const profileEditForm = document.querySelector(".popup__form_edit"); // форма редактирование профиля
const cardAddForm = document.querySelector(".popup__form_card"); // форма добавление карточки
const cardAddLinkInput = document.querySelector(".popup__input_card_url"); // инпут ссылки
const cardAddNameInput = document.querySelector(".popup__input_card_name"); // инпут названия карточки
const profileName = document.querySelector(".profile__title"); // название профиля
const profileDescription = document.querySelector(".profile__description"); // описание профиля
const buttonEditProfile = document.querySelector(".profile__edit-button"); // кнопка редактирование профиля
const cardAddButton = document.querySelector(".profile__add-button"); // кнопка добавление карточки
const buttonClosePopup = document.querySelectorAll(".popup__close-button"); // кнопка закрытия popup 
const cardImagePopup = document.querySelector(".popup_type_image"); // popup картинки
const cardBigImage = cardImagePopup.querySelector(".popup__image-url"); //ссылка на картинку popup
const cardBigImageDescription = cardImagePopup.querySelector(".popup__image-name"); //описание картинки из popup
const nameInput = document.querySelector(".popup__input_string_name"); // инпут названия профиля
const descriptionInput = document.querySelector(".popup__input_string_description"); // инпут описание профиля

const cardsContainer = document.querySelector(".element__grid");
const cardTemplate = document.querySelector("#template").content; //шаблон карточки

function closePopupByOverlay(evt) {
  if (evt.target == evt.currentTarget) {
    closePopup(evt.target);
  }
}

function openPopup(popup) {
  popup.classList.add("popup_opened");							//открываем popup
  popup.addEventListener("click", closePopupByOverlay);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");						//закрываем popup
}

function createCard(item) {
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true); // Клонируем шаблон карточки

  const cardImage = cardElement.querySelector(".element__img"); // Переменая изображение карточки шаблона

  cardImage.src = item.link; // присваиваем src изображения параметру item.link
  cardImage.alt = item.name; // присваиваем alt изображения параметру item.name
  cardElement.querySelector(".element__title").textContent = item.name; //присваеваем название карточки alt-у изображения

  cardElement.querySelector(".element__like-btn").addEventListener("click", likeCard);
  cardElement.querySelector(".element__delete").addEventListener("click", deleteCard);
  
  cardImage.addEventListener("click", () => {
    openPopup(cardImagePopup);
    cardBigImage.src = item.link;							 
    cardBigImage.alt = `Фото ${item.name}.`;
    cardBigImageDescription.textContent = item.name;
  });

  return cardElement;
}

function renderCard(item) {				 
  const cardReady = createCard(item);
  cardsContainer.prepend(cardReady);
}

initialCards.forEach((item) => renderCard(item));

function cardAddSubmitHandler(evt) {
  evt.preventDefault();					// Эта строчка отменяет стандартную отправку формы.
  const newCard = {     				// Переменая новой карточки
    name: cardAddNameInput.value,
    link: cardAddLinkInput.value,
  };
  
  renderCard(newCard);					
  cardAddForm.reset();
  closePopup(cardAddPopup);
}

function profileEditSubmitHandler(evt) {
  evt.preventDefault();													// Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value;						// Получаем значение полей из свойства value
  profileDescription.textContent = descriptionInput.value;	//
  closePopup(profileEditPopup);
}

function likeCard(evt) {
  evt.target.classList.toggle("element__like-btn_active");
}

function deleteCard(evt) {
  evt.target.closest(".element").remove();
}

buttonEditProfile.addEventListener("click", () => {
  openPopup(profileEditPopup);
  nameInput.value = profileName.textContent;						// Присваиваем значение полей value описанию профиля
  descriptionInput.value = profileDescription.textContent;	//
});

cardAddButton.addEventListener("click", () => {
  openPopup(cardAddPopup);					
});

buttonClosePopup.forEach((item) =>
  item.addEventListener("click", () => {
    const currentPopup = item.closest(".popup");
    closePopup(currentPopup);
  })
);

profileEditForm.addEventListener("submit", profileEditSubmitHandler);	// Прикрепляем обработчик к форме:
																								// он будет следить за событием “submit” - «отправка»
cardAddForm.addEventListener("submit", cardAddSubmitHandler);
