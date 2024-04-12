let previewContainer = document.querySelector('.pets-preview');
let previewBoxes = previewContainer.querySelectorAll('.preview');

document.querySelectorAll('.pets-container .pet').forEach(product => {
  product.onclick = () => {
    previewContainer.style.display = 'flex';
    let name = product.getAttribute('data-name');
    previewBoxes.forEach(preview => {
      let target = preview.getAttribute('data-target');
      if (name == target) {
        preview.classList.add('active');
      }
    });
  };
});

previewBoxes.forEach(close => {
  close.querySelector('.fa-times').onclick = () => {
    close.classList.remove('active');
    previewContainer.style.display = 'none';
  };
});

/* CRUD */


document.getElementById("petForm").addEventListener("submit", handleFormSubmit);


document.querySelector(".pets-container").addEventListener("click", function(event) {
  if (event.target.closest(".pet")) {
    handlePetSelection(event.target.closest(".pet"));
  }
});


document.getElementById("deletePetButton").addEventListener("click", handlePetDeletion);

function handleFormSubmit(event) {
  event.preventDefault(); 


  var petName = document.getElementById("petName").value;
  var petImage = document.getElementById("petImage").value;


  var selectedProduct = document.querySelector(".pet.selected");
  if (selectedProduct) {

    updatePet(selectedProduct, petName, petImage);
    selectedProduct.classList.remove("selected"); 
  } else {

    addPet(petName, petImage);
  }


  document.getElementById("petForm").reset();
}

function handlePetSelection(selectedPet) {

  var previouslySelected = document.querySelector(".pet.selected");
  if (previouslySelected) {
    previouslySelected.classList.remove("selected");
  }


  selectedPet.classList.add("selected");


  var petNameInput = document.getElementById("petName");
  var petImageInput = document.getElementById("petImage");
  petNameInput.value = selectedPet.querySelector("h3").innerText;
  petImageInput.value = selectedPet.querySelector("img").src;


  document.getElementById("petForm").scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function handlePetDeletion() {
  var selectedProduct = document.querySelector(".pet.selected");
  if (selectedProduct) {
    deletePet(selectedProduct);
  } else {
    alert("No pet selected to delete.");
  }
}

function addPet(petName, petImage) {

  var productDiv = createProductElement(petName, petImage);
  var previewDiv = createPreviewElement(productDiv.dataset.name, petName, petImage);


  document.querySelector(".pets-container").appendChild(productDiv);
  document.querySelector(".pets-preview").appendChild(previewDiv);
}

function updatePet(selectedProduct, petName, petImage) {

  selectedProduct.querySelector("img").src = petImage;
  selectedProduct.querySelector("h3").innerText = petName;

  var correspondingPreview = document.querySelector(`.preview[data-target="${selectedProduct.dataset.name}"]`);
  correspondingPreview.querySelector("img").src = petImage;
  correspondingPreview.querySelector("h3").innerText = petName;
}

function deletePet(selectedProduct) {
  var correspondingPreview = document.querySelector(`.preview[data-target="${selectedProduct.dataset.name}"]`);
  selectedProduct.remove();
  correspondingPreview.remove();
}

function createProductElement(petName, petImage) {
  var productDiv = document.createElement("div");
  productDiv.classList.add("pet");
  productDiv.dataset.name = "p-" + (document.querySelectorAll(".pet").length + 1);
  productDiv.innerHTML = `
    <img src="${petImage}" alt="">
    <h3>${petName}</h3>
  `;
  return productDiv;
}

function createPreviewElement(dataTarget, petName, petImage) {
  var previewDiv = document.createElement("div");
  previewDiv.classList.add("preview");
  previewDiv.dataset.target = dataTarget;
  previewDiv.innerHTML = `
    <i class="fas fa-times"></i>
    <img src="${petImage}" alt="">
    <h3>${petName}</h3>
    <div class="buttons">
      <a href="#" class="cart">Adopt Now</a>
    </div>
  `;
  return previewDiv;
}
