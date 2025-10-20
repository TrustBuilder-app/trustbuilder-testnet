function loginWithPi() {
  window.Pi.authenticate(
    ["username"],
    function (authResult) {
      document.getElementById("user-info").innerText =
        "Logged in as: " + authResult.user.username;
    },
    function (error) {
      console.error("Pi login failed", error);
    }
  );
}
