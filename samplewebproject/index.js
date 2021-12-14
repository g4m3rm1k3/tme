document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();

  const { value } = document.querySelector("input");

  const header = document.querySelector("h1");
  if (value.includes("@")) {
    header.innerHTML = "Looks like an email address!";
  } else {
    header.innerHTML = "Not an email address!";
  }
});

// window.stuffLoaded = true;
