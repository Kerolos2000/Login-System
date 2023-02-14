/* To ensure that the user has reached the page by logging in, 
and in the event that he wrote the address of the page along without logging in, 
he is immediately transferred to the index page(login page).
*/
if (localStorage.getItem("isLogin") == "false") {
  location.href = "../index.html";
}

// to print hello UserName
let finalUrl = document.querySelector(".finalUrl");
finalUrl.innerHTML = `Hello, ${localStorage.getItem("finalName")}`;

/*When the logout button is clicked, 
the value of the object changes to false to prevent it from returning to this page again 
until you are logged in again.
 */
let logOut = document.querySelector(".logOut");
logOut.addEventListener("click", () => {
  localStorage.setItem("isLogin", "false");
  localStorage.setItem("finalName", "");
  location.href = "../index.html";
});
