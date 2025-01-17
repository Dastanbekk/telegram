const logIn_btn = document.getElementById("logIn-btn");

const api = "https://6787ed4fc4a42c916108c702.mockapi.io/users";

fetch(api)
  .then((res) => res.json())
  .then((data) => fetchFunc(data))
  .catch((err) => console.error("Error fetching data:", err));

function fetchFunc(users) {
  logIn_btn?.addEventListener("click", () => {
    const userName = document.getElementById("userName").value.trim();
    const userNumber = document.getElementById("userNumber").value.trim();

    const matchedUser = users.find(
      (user) => userName === user.username && userNumber === user.password
    );

    if (matchedUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));

      window.location.href = "/src/index.html";
    } else {
      window.location.href = "/src/login.html";
    }
  });
}