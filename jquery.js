$(document).ready(function () {
  $("#contactForm").submit(function (event) {
    event.preventDefault();
    $(".error").text("");

    var isValid = true;
    var name = $("#name").val().trim();
    var email = $("#email").val().trim();
    var message = $("#message").val().trim();

    // Validate Name
    if (name === "") {
      $("#nameError").text("Name is required.");
      isValid = false;
    }

    // Validate Email
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (email === "") {
      $("#emailError").text("Email is required.");
      isValid = false;
    } else if (!emailPattern.test(email)) {
      $("#emailError").text("Please enter a valid email address.");
      isValid = false;
    }

    // Validate Message
    if (message === "") {
      $("#messageError").text("Message is required.");
      isValid = false;
    }

    if (isValid) {
      // Add loading indicator
      $("body").append('<div class="loader"></div>');

      // Make AJAX POST request
      $.ajax({
        url: "https://jsonplaceholder.typicode.com/posts",
        type: "POST",
        data: {
          name: name,
          email: email,
          message: message,
        },
        success: function (response) {
          $(".loader").remove();
          var responseString = JSON.stringify(response, null, 2);
          setTimeout(function () {
            alert("Form submitted successfully!\nResponse:\n" + responseString);
          }, 15);
        },
        error: function () {
          $(".loader").remove();
          setTimeout(function () {
            alert(
              "An error occurred while submitting the form. Please try again."
            );
          }, 15);
        },
      });
    }
  });
});
