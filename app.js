document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("myForm");
  const emailInput = form.querySelector("#email");
  const urlInput = form.querySelector("#url");
  const submitButton = form.querySelector("#submitBtn");
  const emailErrorText = form.querySelector("#emailErrorText");
  const urlErrorText = form.querySelector("#urlErrorText");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
  const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})(\/\S*)?$/;

  emailInput.addEventListener("input", toggleSubmitButton);
  urlInput.addEventListener("input", toggleSubmitButton);

  emailInput.addEventListener("blur", validateEmail);
  urlInput.addEventListener("blur", validateUrl);

  submitButton.addEventListener("click", submitForm);

  function toggleSubmitButton() {
    const isEmailValid = emailRegex.test(emailInput.value.trim());
    const isUrlValid = urlRegex.test(urlInput.value.trim());

    submitButton.disabled = !(isEmailValid && isUrlValid);
  }

  function validateEmail() {
    const emailValue = emailInput.value.trim();

    if (!emailRegex.test(emailValue)) {
      showError(
        emailInput,
        emailErrorText,
        "Looks like it’s not an email. Check it."
      );
      return false;
    } else {
      clearError(emailInput, emailErrorText);
      return true;
    }
  }

  function validateUrl() {
    const urlValue = urlInput.value.trim();

    if (!urlRegex.test(urlValue)) {
      showError(urlInput, urlErrorText, "What about security bro?");
      return false;
    } else {
      clearError(urlInput, urlErrorText);
      return true;
    }
  }

  function showError(input, errorTextElement, errorMessage) {
    input.classList.add("error");
    errorTextElement.innerHTML = `
      <span class="error-icon"></span>
      ${errorMessage}
    `;
  }

  function clearError(input, errorTextElement) {
    input.classList.remove("error");
    errorTextElement.textContent = "";
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
