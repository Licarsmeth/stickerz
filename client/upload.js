function appendElement(data) {
  const container = document.getElementById(data.containerId);

  // Create input element
  const tagInput = document.createElement("input");
  tagInput.name = data.name;
  tagInput.type = data.type;
  tagInput.placeholder = data.placeholder;

  // Create button for removing the tag
  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.type = "button"; // Prevents it from submitting the form

  // Add event listener to remove the tag on button click
  removeButton.addEventListener("click", function () {
    container.removeChild(tagInput);
    container.removeChild(removeButton);
  });

  // Append input element and remove button to container
  container.appendChild(tagInput);
  container.appendChild(removeButton);
}

function newTag() {
  const data = {
    containerId: "tagContainer", // ID of the container element
    name: "tags",
    type: "text",
    placeholder: "Tag",
  };
  appendElement(data);
}

function submitForm(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the form element
  const form = document.getElementById("stickerForm");

  // Collect form data
  const formData = new FormData(form);

  // Make a POST request to the server
  fetch("https://stickers.ashwink.com.np/api/sticker/add", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response data (e.g., display the new sticker ID)
      console.log("New sticker ID:", data.id);
      alert("done");
      // You can perform further actions based on the response here
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("not done");
      // Handle errors if any
    });
}
