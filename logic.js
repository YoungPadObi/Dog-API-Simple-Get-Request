"use strict";

$(function() {
  console.log("App loaded! Waiting for submit!");
  watchGetDogButton();
  watchUserInput();
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

function watchUserInput() {
    $("#dog-num-form").submit(e => {
      e.preventDefault();
      let userNumInput = $("#num-dog").val();
      //Pass the number value to getDogImage
      getDogImage(userNumInput);
    });
  }

  //Pass numInput, which represents an integer as an argument
  function getDogImage(numInput) {
    if (numInput < 3) {
        fetch("https://dog.ceo/api/breeds/image/random/3")
          .then(response => response.json())
          .then(responseJson => displayResults(responseJson))
          .catch(error => alert("Something went wrong. Try again later."));
      } else if (numInput > 50) {
      return alert("Please choose a number equal or less than 50");
    } else {
      fetch(`https://dog.ceo/api/breeds/image/random/${numInput}`)
        .then(response => response.json())
        .then(responseJson => displayResults(responseJson))
        .catch(error => alert("Something went wrong. Try again later."));
    }
  }
  
  function displayResults(responseJson) {
    console.log(responseJson);
    $(".results").html("");
    responseJson.message.forEach(renderedImg => {
      $(".results").append(`<img src="${renderedImg}" class="results">`);
    });
    //display the results section
    $(".results").removeClass("hidden");
  }