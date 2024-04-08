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