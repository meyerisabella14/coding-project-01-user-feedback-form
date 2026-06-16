// Select important page elements
const form = document.getElementById("feedback-form");
const formSection = document.getElementById("form-section");
const comments = document.getElementById("comments");
const charCount = document.getElementById("char-count");
const tooltip = document.getElementById("tooltip");
const feedbackDisplay = document.getElementById("feedback-display");

// Error message elements
const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const commentsError = document.getElementById("comments-error");

// Event delegation for input events inside the form
form.addEventListener("input", function (event) {
  event.stopPropagation();

  if (event.target.id === "comments") {
    charCount.textContent = `Characters: ${event.target.value.length}`;
  }
});

// Event delegation for mouseover tooltips
form.addEventListener("mouseover", function (event) {
  event.stopPropagation();

  if (event.target.dataset.tooltip) {
    tooltip.textContent = event.target.dataset.tooltip;
    tooltip.style.display = "block";
  }
});

// Event delegation for mouseout tooltips
form.addEventListener("mouseout", function (event) {
  event.stopPropagation();

  if (event.target.dataset.tooltip) {
    tooltip.style.display = "none";
  }
});

// Mouse movement event to move tooltip with cursor
form.addEventListener("mousemove", function (event) {
  event.stopPropagation();

  tooltip.style.left = event.pageX + 15 + "px";
  tooltip.style.top = event.pageY + 15 + "px";
});

// Prevent form clicks from bubbling to the page background
formSection.addEventListener("click", function (event) {
  event.stopPropagation();
});

// Background click event
document.body.addEventListener("click", function () {
  tooltip.style.display = "none";
});

// Form submit event
form.addEventListener("submit", function (event) {
  event.preventDefault();
  event.stopPropagation();

  // Get form values
  const name = document.getElementById("user-name").value.trim();
  const email = document.getElementById("email").value.trim();
  const commentText = comments.value.trim();

  // Clear old validation messages
  nameError.textContent = "";
  emailError.textContent = "";
  commentsError.textContent = "";

  let isValid = true;

  // Validate name
  if (name === "") {
    nameError.textContent = "Name is required.";
    isValid = false;
  }

  // Validate email
  if (email === "") {
    emailError.textContent = "Email is required.";
    isValid = false;
  }

  // Validate comments
  if (commentText === "") {
    commentsError.textContent = "Comments are required.";
    isValid = false;
  }

  // Stop submission if anything is invalid
  if (!isValid) {
    return;
  }

  // Create new feedback entry
  const feedbackEntry = document.createElement("div");
  feedbackEntry.classList.add("feedback-entry");

  feedbackEntry.innerHTML = `
    <h3>${name}</h3>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Comments:</strong> ${commentText}</p>
  `;

  // Add feedback to the page
  feedbackDisplay.appendChild(feedbackEntry);

  // Reset form
  form.reset();
  charCount.textContent = "Characters: 0";
});
