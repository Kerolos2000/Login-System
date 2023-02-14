// global variables
let logInEmail = document.querySelector("#logInEmail");
let logInPassword = document.querySelector("#logInPassword");
let logInBtn = document.querySelector("#logInBtn");
let errorShow = document.querySelector(".errorShow");

// check if localStorage not empty
let mainArray = [];
if (localStorage.getItem("newUser") != null) {
  mainArray = JSON.parse(localStorage.getItem("newUser"));
} else {
  logInBtn.addEventListener("click", () => {
    if (logInEmail.value != "" && logInPassword.value != "") {
      errorShow.innerHTML = "Email not found";
    }
  });
}
// main function
logInBtn.addEventListener("click", () => {
  let myArray = [];
  let myObject = {};
  if (logInEmail.value != "" && logInPassword.value != "") {
    myObject = {
      logInEmail: logInEmail.value,
      logInUserPassword: logInPassword.value,
    };
    myArray.push(myObject);
    for (let i = 0; i < mainArray.length; i++) {
      if (
        mainArray[i].objEmail == myObject.logInEmail &&
        mainArray[i].objUserPassword == myObject.logInUserPassword
      ) {
        localStorage.setItem("finalName", mainArray[i].objName);
        localStorage.setItem("isLogin", "true");
        location.href = "./pages/main.html";
      } else {
        errorShow.style.display = "block";
        if (mainArray[i].objEmail == myArray[0].logInEmail) {
          errorShow.innerHTML = "Wrong password";
          break;
        } else {
          errorShow.innerHTML = "Email not found";
        }
      }
    }
  } else {
    errorShow.style.display = "block";
    errorShow.innerHTML = "All inputs are required";
  }
});

// eye icon function
let icon = document.querySelector(".icon");
icon.addEventListener("click", () => {
  if (logInPassword.type === "password") {
    logInPassword.type = "text";
    icon.innerHTML = '<i class="fas fa-eye-slash"></i>';
  } else {
    logInPassword.type = "password";
    icon.innerHTML = '<i class="fa-solid fa-eye"></i>';
  }
});

// if user click enter invoke main function
document.body.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    logInBtn.click();
  }
});
