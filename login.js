//login logout
document.addEventListener("DOMContentLoaded", () => {
  console.log(process.env.JWT_SECRET);
  const authLink = document.getElementById("log");
  const token = localStorage.getItem("token");

  if (token) {
    const payload = JSON.parse(atob(token.split(".")[1]));
    console.log(payload);
    localStorage.setItem("user", payload.id);
    const userName = payload.username;
    authLink.innerHTML = `<i class="fa-regular fa-circle-user"></i> Hi, ${userName}`;
    authLink.href = "#";
  } else {
    console.log("not running");
    const element = document.getElementById("dropdown-menu");
    element.style.display = "none";
  }
});

function handleTicket() {
  console.log("handleTicket");
  window.location.href = "/ticket.html";
}

function handleLogOut() {
  console.log("handleLogout");
  localStorage.removeItem("token");
  window.location.reload();
}

document
  .querySelector(".toggle-password")
  .addEventListener("click", function () {
    const passwordInput = document.querySelector(".password");
    const eyeIcon = document.querySelector(".toggle-password");

    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      eyeIcon.src = "eye-open.png";
    } else {
      passwordInput.type = "password";
      eyeIcon.src = "eye-close.png";
    }
  });
