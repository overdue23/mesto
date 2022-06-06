let popupElement = document.querySelector('.popup'); //переменная всего popup
let editProfile = document.querySelector('.profile__edit-button'); //переменная открыть редактирование профиля
let closeButton = popupElement.querySelector('.popup__close-button'); //переменная закрыть редактирование
//let saveButton = document.querySelector('.popup__save-button'); //переменная кнопки сохранить
let userName = document.querySelector('.profile__title'); //переменная касса имени профиля на странице
let userJop = document.querySelector('.profile__description'); //переменная касса работы на странице

let nameInput = document.getElementById("name"); // Воспользуйтесь инструментом .querySelector()
let jobInput = document.getElementById("profession"); // Воспользуйтесь инструментом .querySelector()

let formElement = document.querySelector('.popup__form'); // Воспользуйтесь методом querySelector()


function openPopup() {
	popupElement.classList.add('popup_opened');
	nameInput.value = userName.textContent;
	jobInput.value = userJop.textContent;
}

function closePopup() {
	popupElement.classList.remove('popup_opened');
}

editProfile.addEventListener('click', openPopup)
closeButton.addEventListener('click', closePopup)


// Находим форму в DOM


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
	evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
												// Так мы можем определить свою логику отправки.
												// О том, как это делать, расскажем позже.

	// Находим поля формы в DOM

	// Получите значение полей из свойства value
	userName.textContent = nameInput.value;
	userJop.textContent = jobInput.value;

	closePopup();
	// Выберите элементы, куда должны быть вставлены значения полей

	// Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);


