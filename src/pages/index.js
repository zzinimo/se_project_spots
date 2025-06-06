import "./index.css";

import {
  enableValidation,
  settings,
  toggleButtonState,
  resetValidation,
} from "../scripts/validation.js";

let currentOpenModal = null;

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

//selecting New Post button and declaring variable. Also delcaring addCardModal. and close button for modal
const newPostButton = document.querySelector(".profile__add-btn");
const addCardModal = document.querySelector("#add-card-modal");
const cardModalCloseButton = addCardModal.querySelector(".modal__close-btn");

//selecting the card form within the modal and inputs

const cardForm = document.forms["add-card-form"];
const cardNameInput = addCardModal.querySelector("#add-card-caption-input");
const cardLinkInput = addCardModal.querySelector("#add-card-link-input");

//selecting edit button and Modal
const profileEditButton = document.querySelector(".profile__edit-btn");
const cardSubmitButton = document.querySelector(".modal__submit-btn");

const editProfileModal = document.querySelector("#edit-profile-modal");

//selecting profile name, descritpion, and both inputs for modal.
const profileName = document.querySelector(".profile__name");

// selecting form element
const editFormElement = document.forms["edit-profile"];

const editModalNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);

const profileDescription = document.querySelector(".profile__description");

const editModalDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);

// //selecting form element
// const editFormElement = document.forms["edit-profile"];

//Selecting template and declaring it using JavaScript
const cardTemplate = document.querySelector("#card-template").content;
const postsCardList = document.querySelector(".posts");

//select preview Modal and its image and caption
const previewModal = document.querySelector("#preview-modal");
const previewImage = previewModal.querySelector(".modal__image");
const previewCaption = previewModal.querySelector(".modal__caption");

//making function to get all of the card elements
function getCardElement(data) {
  const cardElement = cardTemplate
    .querySelector(".posts__card")
    .cloneNode(true);

  const cardNameEl = cardElement.querySelector(".posts__caption");
  //select image element

  const postsImage = cardElement.querySelector(".posts__image");
  const cardLikeBtn = cardElement.querySelector(".posts__like-button");
  const postDeleteBtn = cardElement.querySelector(".posts__delete-button");

  cardLikeBtn.addEventListener("click", function () {
    cardLikeBtn.classList.toggle("posts__like-button_liked");
  });

  postsImage.addEventListener("click", () => {
    //set the preview image src to match the clicked image
    previewImage.src = data.link;

    //set caption text on preview image
    previewCaption.textContent = data.name;

    //set the alt text on preview image
    previewImage.alt = data.name;

    //open the previewModal
    openModal(previewModal);
  });

  //assign values to image src and alt attributes

  cardNameEl.textContent = data.name;
  postsImage.src = data.link;
  postsImage.alt = data.name;

  postDeleteBtn.addEventListener("click", () => {
    cardElement.remove();
  });
  return cardElement;
}

initialCards.forEach((card) => {
  const cardElement = getCardElement(card);
  postsCardList.prepend(cardElement);
});

function openModal(modal) {
  currentOpenModal = modal; // Added this line
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", escapeClose);
}
const escapeClose = (evt) => {
  if (evt.key === "Escape") {
    closeModal(currentOpenModal);
  }
};

//applying that function to a 'click'
profileEditButton.addEventListener("click", () => {
  const inputList = Array.from(
    editFormElement.querySelectorAll(settings.inputSelector)
  );
  openModal(editProfileModal);
  resetValidation(editFormElement, inputList, settings);
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;

  const submitButton = editFormElement.querySelector(".modal__submit-btn");
  toggleButtonState(inputList, submitButton, settings);
});

// applying function, and adding event listener to close Modal
const profileCloseButton = editProfileModal.querySelector(".modal__close-btn");

//selecting close button for preiveModal
const previewCloseButton = previewModal.querySelector(
  ".modal__close-btn_type_preview"
);

//setting function for closing previewModal
// previewCloseButton.addEventListener("click", () => {
//   closeModal(previewModal);
// });

function closeModal(modal) {
  currentOpenModal = null; // Added this line
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", escapeClose);
}

profileCloseButton.addEventListener("click", function () {
  closeModal(editProfileModal);
});

//function for submit event

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editModalNameInput.value;
  profileDescription.textContent = editModalDescriptionInput.value;
  closeModal(editProfileModal);
}

editFormElement.addEventListener("submit", handleEditFormSubmit);
cardForm.addEventListener("submit", handleAddCardSubmit);

newPostButton.addEventListener("click", function () {
  openModal(addCardModal);
  const submitButton = cardForm.querySelector(".modal__submit-btn");
  const inputList = Array.from(
    cardForm.querySelectorAll(settings.inputSelector)
  );
  toggleButtonState(inputList, submitButton, settings);
});

// cardModalCloseButton.addEventListener("click", function () {
//   closeModal(addCardModal);
// });

// handle new card submit event

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const newInputValues = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };

  const newCardElement = getCardElement(newInputValues);
  postsCardList.prepend(newCardElement);
  cardForm.reset();
  closeModal(addCardModal);
}

const closeButtons = document.querySelectorAll(".modal__close-btn");

closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});

const modals = document.querySelectorAll(".modal");
modals.forEach((modal) => {
  modal.addEventListener("click", (evt) => {
    if (evt.target === modal) {
      closeModal(modal);
    }
  });
});

enableValidation(settings);
