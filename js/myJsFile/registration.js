// global variables
let signUpName = document.querySelector("#signUpName");
let signUpEmail = document.querySelector("#signUpEmail");
let signUpPassword = document.querySelector("#signUpPassword");
let signUpError = document.querySelectorAll("#signUpError");
let signUpBtn = document.querySelector("#signUpBtn");
let formControlSignUp = document.querySelector("#formControlSignUp");
let mainArray = [];
let mainObject = {};
let flag;

// check if localStorage not empty
if (localStorage.getItem("newUser") != null) {
  mainArray = JSON.parse(localStorage.getItem("newUser"));
}

// main function
signUpBtn.addEventListener("click", () => {
  showError(
    /^[A-Z][\w]{1,14}$/,
    signUpName.value,
    0,
    "Your name must start with a capital letter and contain only letters without spaces"
  );
  showError(
    /^[A-z]*\.?\w*@\w*\.com$/,
    signUpEmail.value,
    1,
    "Please enter a valid email such as test@test.com"
  );
  showError(
    /^[A-Z]+[\w]{5,}$/,
    signUpPassword.value,
    2,
    "Your name must start with a capital letter and contain at least 6 numbers and letters"
  );

  if (
    RegExInput(/^[A-Z][\w]{1,14}$/, signUpName.value) &&
    RegExInput(/^[A-Z]?[a-z]+\.?\w*@\w*\.com$/, signUpEmail.value) &&
    RegExInput(/^[A-Z]+[\w]{5,}$/, signUpPassword.value) &&
    isUserX()
  ) {
    mainObject = {
      objName: signUpName.value,
      objEmail: signUpEmail.value,
      objUserPassword: signUpPassword.value,
    };
    mainArray.push(mainObject);
    localStorage.setItem("newUser", JSON.stringify(mainArray));
    clear()
    location.href = "../index.html";
  }
});

// Regular Expression function
function showError(regex, ele, i, text) {
  if (regex.test(ele)) {
    signUpError[i].style.display = "none";
  } else {
    signUpError[i].innerHTML = text;
    signUpError[i].style.display = "block";
  }
}
function RegExInput(regex, ele) {
  if (regex.test(ele)) {
    return true;
  } else {
    return false;
  }
}

// check if email is already registered or not
function isUserX() {
  flag = 0;
  for (let i = 0; i < mainArray.length; i++) {
    if (signUpEmail.value.includes(mainArray[i].objEmail)) {
      flag++;
    }
  }
  if (flag < 1) {
    signUpError[1].style.display = "none";
    return true;
  } else {
    signUpError[1].innerHTML = `This email is already registered`;
    signUpError[1].style.display = "block";
    return false;
  }
}

// clear inputs
function clear() {
  signUpEmail.value = "";
  signUpPassword.value = "";
  signUpName.value = "";
}

// eye icon function
let icon = document.querySelector(".icon");
icon.addEventListener("click", () => {
  if (signUpPassword.type === "password") {
    signUpPassword.type = "text";
    icon.innerHTML = '<i class="fas fa-eye-slash"></i>';
  } else {
    signUpPassword.type = "password";
    icon.innerHTML = '<i class="fa-solid fa-eye"></i>';
  }
});

// if user click enter invoke main function
document.body.addEventListener("keyup", (e) => {
  if(e.key == "Enter"){
    signUpBtn.click()
  }
})