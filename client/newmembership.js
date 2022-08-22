const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nameInput = document.querySelector("input[name=name]");
  const MembershipPriceInput = document.querySelector("input[name=membership]");
  const descriptionInput = document.querySelector("input[name=description]");

  const membershipObject = {
    name: nameInput.value,
    description: descriptionInput.value,
    price: MembershipPriceInput.value,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(membershipObject),
  };

  fetch("http://localhost:3000/memberships", options)
    .then((resp) => resp.json())
    .then((response) => {})
    .catch((error) => console.error(error));
});
