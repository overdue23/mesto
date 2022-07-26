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
const buttonClosePopupList = document.querySelectorAll(".popup__close-button"); // кнопка закрытия popup
const cardImagePopup = document.querySelector(".popup_type_image"); // popup картинки
const cardBigImage = cardImagePopup.querySelector(".popup__image-url"); //ссылка на картинку popup
const cardBigImageDescription =
	cardImagePopup.querySelector(".popup__image-name"); //описание картинки из popup
const nameInput = document.querySelector(".popup__input_string_name"); // инпут названия профиля
const descriptionInput = document.querySelector(
	".popup__input_string_description"
); // инпут описание профиля

const cardsContainer = document.querySelector(".elements__grid");
const cardTemplate = document.querySelector("#template").content; //шаблон карточки
const cardTemplateElement = cardTemplate.querySelector(".element");

function closePopupByOverlay(evt) {
	if (evt.target === evt.currentTarget) {
		closePopup(evt.target);
	}
}

function openPopup(popup) {
	popup.classList.add("popup_opened"); //открываем popup
	
	nameInput.value = profileName.textContent; // Присваиваем значение полей value описанию профиля
	descriptionInput.value = profileDescription.textContent; //
}

function closePopup(popup) {
	popup.classList.remove("popup_opened"); //закрываем popup
}

function createCard(cardData) {
	const cardElement = cardTemplateElement.cloneNode(true); // Клонируем шаблон карточки

	const cardImage = cardElement.querySelector(".element__img"); // Переменая изображение карточки шаблона

	cardImage.src = cardData.link; // присваиваем src изображения параметру cardData.link
	cardImage.alt = cardData.name; // присваиваем alt изображения параметру cardData.name
	cardElement.querySelector(".element__title").textContent = cardData.name; //присваеваем название карточки alt-у изображения

	cardElement
		.querySelector(".element__like-btn")
		.addEventListener("click", likeCard);
	cardElement
		.querySelector(".element__delete")
		.addEventListener("click", deleteCard);

	cardImage.addEventListener("click", () => {
		openPopup(cardImagePopup);
		cardBigImage.src = cardData.link;
		cardBigImage.alt = `Фото ${cardData.name}.`;
		cardBigImageDescription.textContent = cardData.name;
	});

	return cardElement;
}

function renderCard(cardData) {
	const cardReady = createCard(cardData);
	cardsContainer.prepend(cardReady);
}

initialCards.forEach((cardData) => renderCard(cardData));

function AddcardSubmitHandler(evt) {
	evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
	const newCard = {
		// Переменая новой карточки
		name: cardAddNameInput.value,
		link: cardAddLinkInput.value,
	};

	renderCard(newCard);
	cardAddForm.reset();
	closePopup(cardAddPopup);
}

function EditProfileSubmitHandler(evt) {
	evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
	profileName.textContent = nameInput.value; // Получаем значение полей из свойства value
	profileDescription.textContent = descriptionInput.value; //
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
});


cardAddButton.addEventListener("click", () => {
	openPopup(cardAddPopup);
});

buttonClosePopupList.forEach((closeButton) =>
	closeButton.addEventListener("click", () => {
		const currentPopup = closeButton.closest(".popup");
		closePopup(currentPopup);
	})
);

profileEditForm.addEventListener("submit", EditProfileSubmitHandler);	// Прикрепляем обработчик к форме:
																								// он будет следить за событием “submit” - «отправка»
cardAddForm.addEventListener("submit", AddcardSubmitHandler);

profileEditPopup.addEventListener("click", closePopupByOverlay);
cardAddPopup.addEventListener("click", closePopupByOverlay);
cardImagePopup.addEventListener("click", closePopupByOverlay);