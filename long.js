const passwordInput = document.getElementById("password");
const strengthBar = document.getElementById("strength-bar");
const strengthText = document.getElementById("strength-text");
const confirmBtn = document.getElementById("confirm-btn");
const passwordDisplay = document.getElementById("password-display");
const passwordText = document.getElementById("password-text");
const copyBtn = document.getElementById("copy-btn");

let strength = 0;

passwordInput.addEventListener("input", () => {
  const password = passwordInput.value;
  strength = 0;

  // Check password length
  if (password.length >= 8) strength++;

  // Check if it contains a number
  if (/\d/.test(password)) strength++;

  // Check if it contains special characters
  if (/[!@#$%^&*(),.?:{}|<>]/.test(password)) strength++;

  // Check for uppercase and lowercase characters
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;

  // Update strength bar and text
  updateStrengthBar(strength);

  // Show confirm button if strength is 4 (very strong)
  if (strength >= 0) {
    confirmBtn.style.display = "inline-block";
  } else {
    confirmBtn.style.display = "none";
  }
});

function updateStrengthBar(strength) {
  const colors = ["#ff4d4d", "#ff9900", "#33cc33", "#0066ff"];
  const messages = ["weak", "moderate", "strong", "very strong"];

  // Update bar color
  strengthBar.style.background = colors[strength - 1] || "#ccc";

  // Update strength text
  strengthText.textContent = messages[strength - 1] || "Enter a password";
}

// Confirm button click to show password and "Copy to Clipboard" button
confirmBtn.addEventListener("click", () => {
  const password = passwordInput.value;
  passwordText.textContent = password;
  passwordDisplay.style.display = "block";
});

// Copy to clipboard functionality
copyBtn.addEventListener("click", () => {
  const password = passwordText.textContent;
  navigator.clipboard.writeText(password)
    .then(() => alert("Password copied."))
    .catch((err) => console.log("Error copying text", err));
});
