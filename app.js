document.addEventListener("DOMContentLoaded", function () {
  const emailInput = document.getElementById("email");
  const urlInput = document.getElementById("url");
  const submitButton = document.getElementById("submitBtn");
  const emailErrorText = document.getElementById("emailErrorText");
  const urlErrorText = document.getElementById("urlErrorText");

  emailInput.addEventListener("input", toggleSubmitButton);
  urlInput.addEventListener("input", toggleSubmitButton);

  emailInput.addEventListener("blur", validateEmail);
  urlInput.addEventListener("blur", validateUrl);

  submitButton.addEventListener("click", submitForm);

  function toggleSubmitButton() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const urlRegex = /^https:\/\//;

    const isEmailValid = emailRegex.test(emailInput.value);
    const isUrlValid = urlRegex.test(urlInput.value);

    if (isEmailValid && isUrlValid) {
      submitButton.disabled = false;
    } else {
      submitButton.disabled = true;
    }
  }

  function validateEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailValue = emailInput.value.trim();

    if (!emailRegex.test(emailValue)) {
      emailInput.classList.add("error");
      emailErrorText.textContent = "";

      const errorIcon = document.createElement("span");
      errorIcon.classList.add("error-icon");
      emailErrorText.insertBefore(errorIcon, emailErrorText.firstChild);

      const errorText = document.createTextNode(
        "Looks like it’s not an email. Check it."
      );
      emailErrorText.appendChild(errorText);
      return false;
    } else {
      emailInput.classList.remove("error");
      emailErrorText.textContent = "";
      return true;
    }
  }

  function validateUrl() {
    const urlRegex = /^https:\/\//;
    const urlValue = urlInput.value.trim();

    if (!urlRegex.test(urlValue)) {
      urlInput.classList.add("error");
      urlErrorText.textContent = "";

      const errorIcon = document.createElement("span");
      errorIcon.classList.add("error-icon");
      urlErrorText.insertBefore(errorIcon, urlErrorText.firstChild);

      const errorText = document.createTextNode("What about security bro?");
      urlErrorText.appendChild(errorText);
      return false;
    } else {
      urlInput.classList.remove("error");
      urlErrorText.textContent = "";
      return true;
    }
  }

  function submitForm(event) {
    event.preventDefault();

    const emailValue = emailInput.value.trim();
    const urlValue = urlInput.value.trim();

    const isEmailValid = validateEmail();
    const isUrlValid = validateUrl();
    if (isEmailValid && isUrlValid) {
      const data = {
        email: emailValue,
        url: urlValue,
      };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      fetch(urlValue, options)
        .then((response) => {
          if (response.ok) {
            window.location.href = "https://payproglobal.com";
          } else {
            console.error("Error while executing query!");
          }
        })
        .catch((error) => {
          console.error(error);
          window.location.href = "https://payproglobal.com";
        });
    }
  }
});
