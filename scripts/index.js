const initialCards = [
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
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
  const cardElement = cardTemplate.content
    .querySelector(".posts__card")
    .cloneNode(true);

  const cardNameEl = cardElement.querySelector(".posts__caption");
  //select image element

  const postsImage = cardElement.querySelector(".posts__image");

  cardNameEl.textContent = data.name;
  postsImage.src = data.link;
  postsImage.alt = data.name;
  //assign values to image src and alt attributes

  return cardElement;
}

for (let i = 0; i < initialCards.length; i++) {
  const cardElement = getCardElement(initialCards[i]);
  postsCardList.prepend(cardElement);
}

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
