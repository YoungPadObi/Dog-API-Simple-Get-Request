"use strict";

$(function() {
  console.log("App loaded! Waiting for submit!");
  watchGetDogButton();
  watchForm();
});

function getUserInput() {
  let someBreed = $("#get-dog-breed").val();
  return someBreed;
}

function watchGetDogButton() {
  $("#form-input-breed").submit(e => {
    e.preventDefault();
    getDogBreedImage();
  });
}

function getDogBreedImage() {
  fetch("https://dog.ceo/api/breed/" + getUserInput() + "/images/random")
    .then(response => response.json())
    .then(responseJson => displayDogBreedResults(responseJson))
    .catch(error => alert("Hmmm. Cannot find that breed of dog. Try again."));
}

function displayDogBreedResults(responseJson) {
  console.log(responseJson);
  if (responseJson.status !== "success") {
    alert("Hmmm. Cannot find that breed of dog. Try again.");
  } else if (responseJson.status === "success") {
    $(".results-breed").replaceWith(
      `<img src="${responseJson.message}" class="results-breed">`
    );
    $(".results-breed").removeClass("hidden");
  }
}

function getDogImage(num) {
    const url = "https://dog.ceo/api/breeds/image/random/" + num;
    console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(responseJson => displayResults(responseJson))
      .catch(error => alert('Something went wrong. Try again later.'));
  }
  
  function checkValidForm(val) {
    if(val >= 1 && val <= 50) {
      return true;
    }
    else {
      return false;
    }
  }
  
  function displayResults(responseJson) {
    const imageList = responseJson.message;
    console.log(imageList);
    let imageUrls = "";
  
    for (let x = 0;x < imageList.length;x++) {
      imageUrls += `<img src="${imageList[x]}" alt="Generated dog image # ${x+1}" class="loadedImages">`;
    }
  
    console.log(imageUrls);
  
    $('.images').replaceWith(`<div class="images">${imageUrls}</div>`);
  }
  
  function watchForm() {
    $('#form').submit(event => {
      event.preventDefault();
      const resultNum = $('#num').val();
      if(checkValidForm(resultNum)) {
        console.log(`Results to retrieve: ${resultNum}`);
        getDogImage(resultNum);
      }
      else {
        alert('Sorry, you must enter a number between 1 and 50. Try again.')
      }
    });
  }
