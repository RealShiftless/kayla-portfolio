const profileImage = document.querySelector("[data-profile-image]");

if (profileImage) {
  profileImage.addEventListener("error", () => {
    profileImage.hidden = true;
    profileImage.parentElement?.classList.add("is-missing");
  });
}
