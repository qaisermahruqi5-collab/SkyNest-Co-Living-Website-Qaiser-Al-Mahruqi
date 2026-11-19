// SkyNest Co-Living - main script
// 1. mobile menu  2. enquiry form validation

// ---------- 1. Mobile menu ----------
const menuToggle = document.getElementById("menu-toggle");
const menuButton = document.querySelector("label.menu");

if (menuToggle && menuButton) {
  // tell screen readers if the menu is open or closed
  menuButton.setAttribute("aria-expanded", "false");
  menuToggle.addEventListener("change", function () {
    menuButton.setAttribute("aria-expanded", menuToggle.checked ? "true" : "false");
  });

  // close the menu with the Escape key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && menuToggle.checked) {
      menuToggle.checked = false;
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
}

// ---------- 2. Enquiry form validation ----------
const form = document.getElementById("enquiry-form");

// shows or clears the message under a field
function showError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const errorBox = document.getElementById(fieldId + "-error");
  errorBox.textContent = message;
  if (message === "") {
    field.classList.remove("input-error");
    field.removeAttribute("aria-invalid");
  } else {
    field.classList.add("input-error");
    field.setAttribute("aria-invalid", "true");
  }
}

// email must have something before @, a domain, a dot and an ending
function isValidEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
  return pattern.test(email);
}

function validateForm() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const stay = document.getElementById("stay").value;
  const message = document.getElementById("message").value.trim();
  let firstProblem = null;

  if (name === "") {
    showError("name", "Please enter your name");
    firstProblem = firstProblem || "name";
  } else {
    showError("name", "");
  }

  if (!isValidEmail(email)) {
    showError("email", "Please enter a valid email, like name@example.com");
    firstProblem = firstProblem || "email";
  } else {
    showError("email", "");
  }

  if (stay === "") {
    showError("stay", "Please choose a stay type");
    firstProblem = firstProblem || "stay";
  } else {
    showError("stay", "");
  }

  if (message.length < 10) {
    showError("message", "Please write a message (at least 10 characters)");
    firstProblem = firstProblem || "message";
  } else {
    showError("message", "");
  }

  // move the cursor to the first field with a problem
  if (firstProblem !== null) {
    document.getElementById(firstProblem).focus();
    return false;
  }
  return true;
}

if (form) {
  const status = document.getElementById("form-status");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    status.textContent = "";

    if (validateForm()) {
      status.textContent = "Thanks! Your email app will open to send your enquiry. We reply within 24 hours.";
      // there's no server, so the enquiry is sent through the user's email app (mailto)
      setTimeout(function () {
        form.submit();
        form.reset();
      }, 1500);
    }
  });

  // clear a field's error as soon as the user fixes it
  ["name", "email", "stay", "message"].forEach(function (id) {
    document.getElementById(id).addEventListener("input", function () {
      showError(id, "");
    });
  });
}
