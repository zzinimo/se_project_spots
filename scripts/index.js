const initialCards = [
  {
    name: "Toyota Camry",
    link: "https://pictures.dealer.com/a/autonationdrive/0846/65667807d383f66969470e467cf188ecx.jpg",
  },
  {
    name: "Lexus LS 460",
    link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6e9PNwd7YSCqMQX0IhDhEw2kd5AaavietqQ&s",
  },
  {
    name: "Honda Accord",
    link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgvSQV0-ZzBT7erg7gfYIHb7RvIk5zQ-4wZg&s",
  },
  {
    name: "Jeep Grand Cherokee",
    link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp7APF3F-v9ik-MomEpf_zYUs7hR7XwZF8PQ&s",
  },
  {
    name: "Nissan Altima",
    link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmPzUDuHS9N9j4zyXfu5GAX1BrfD0Ie1Q55Q&s",
  },
  {
    name: "Ford Explorer",
    link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQtkilOXMdYmFr3u2G_ltfMBhzgdNNC-RhNw&s",
  },
];
//selecting edit button and Modal
const profileEditButton = document.querySelector(".profile__edit-btn");

const editProfileModal = document.querySelector("#edit-profile-modal");

//selecting profile name, descritpion, and both inputs for modal.
const profileName = document.querySelector(".profile__name");

const editModalNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);

const profileDescription = document.querySelector(".profile__description");

const editModalDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);

//selecting form element
const editFormElement = editProfileModal.querySelector(".modal__form");

//Selecting template and declaring it using JavaScript
const cardTemplate = document.querySelector("#card-template");
const postsCardList = document.querySelector(".posts");

function getCardElement(data) {
  console.log(data);
  const cardElement = cardTemplate.content //What happens if I do not include content?
    .querySelector(".posts__card") // Do I need to do this step, or can I ".cloneNode" cardTemplate?
    .cloneNode(true);

  const cardNameEl = cardElement.querySelector(".posts__caption");
  //select image element

  const postsImage = cardElement.querySelector(".posts__image");

  cardNameEl.textContent = data.name;
  postsImage.src = data.link;
  //assign values to image src and alt attributes

  //????????? How did we link "data" to the object array called initial cards towards top?

  return cardElement; //what does this do for cards?
}

for (let i = 0; i < initialCards.length; i++) {
  const cardElement = getCardElement(initialCards[i]); // We have already declared cardElement in the getCardElement function no?
  postsCardList.prepend(cardElement);
}
//is this how?? ^

//function for making modal visible, making input value change with profile name
function openModal() {
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;
  editProfileModal.classList.add("modal_opened");
}

//applying that function to a 'click'
profileEditButton.addEventListener("click", openModal);

// applying function, and adding event listener to close Modal
const profileCloseButton = editProfileModal.querySelector(".modal__close-btn");

function closeModal() {
  editProfileModal.classList.remove("modal_opened");
}

profileCloseButton.addEventListener("click", closeModal);

//function for submit event

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editModalNameInput.value;
  profileDescription.textContent = editModalDescriptionInput.value;
  closeModal();
}

editFormElement.addEventListener("submit", handleEditFormSubmit);
