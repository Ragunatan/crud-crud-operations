function handleFormSubmit(event) {
    event.preventDefault();
  
    const userDetails = {
      username: event.target.username.value,
      email: event.target.email.value,
      phone: event.target.phone.value,
    };
  
    axios
      .post(
        "https://crudcrud.com/api/930d7c9454c1486ea497c364893d4efb/appointmentData",
        userDetails
      )
      .then((response) => displayUserOnScreen(response.data))
      .catch((error) => console.log(error));
  
    // Clear the input fields
    document.getElementById("username").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
  }
  
  function displayUserOnScreen(userDetails) {
    const userItem = document.createElement("li");
    userItem.appendChild(
      document.createTextNode(
        `${userDetails.username} - ${userDetails.email} - ${userDetails.phone}`
      )
    );
  
    const deleteBtn = document.createElement("button");
    deleteBtn.appendChild(document.createTextNode("Delete"));
    userItem.appendChild(deleteBtn);
  
    const editBtn = document.createElement("button");
    editBtn.appendChild(document.createTextNode("Edit"));
    userItem.appendChild(editBtn);
  
    const userList = document.querySelector("ul");
    userList.appendChild(userItem);
  
    // Handle delete button click
    deleteBtn.addEventListener("click", function () {
      axios
        .get(
          "https://crudcrud.com/api/930d7c9454c1486ea497c364893d4efb/appointmentData"
        )
        .then((response) => {
          let userToDelete = null;
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].email === userDetails.email) {
              userToDelete = response.data[i];
              break;
            }
          }
          if (userToDelete) {
            axios
              .delete(
                `https://crudcrud.com/api/930d7c9454c1486ea497c364893d4efb/appointmentData/${userToDelete._id}`
              )
              .then(() => {
                userList.removeChild(userItem);
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
    });
  
    // Handle edit button click
    editBtn.addEventListener("click", function () {
      // Fetch all the data from CRUD
      axios
        .get(
          "https://crudcrud.com/api/930d7c9454c1486ea497c364893d4efb/appointmentData"
        )
        .then((response) => {
          let userToEdit = null;
  
          // Loop through the data to find the user by email
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].email === userDetails.email) {
              userToEdit = response.data[i];
              break; // Stop searching after finding the user
            }
          }
  
          // If the user is found, delete the user from CRUD
          if (userToEdit) {
            axios
              .delete(
                `https://crudcrud.com/api/930d7c9454c1486ea497c364893d4efb/appointmentData/${userToEdit._id}`
              )
              .then(() => {
                // Remove the user from the screen
                userList.removeChild(userItem);
  
                // Update the input fields with the user details for editing
                document.getElementById("username").value = userDetails.username;
                document.getElementById("email").value = userDetails.email;
                document.getElementById("phone").value = userDetails.phone;
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
    });
  }
  