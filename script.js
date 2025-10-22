// Initialize Pi SDK
Pi.init({ version: "2.0" });

let piUsername = "";

// Authenticate Pi user
Pi.authenticate(
  function(piUser) {
    piUsername = piUser.username;
    console.log("Authenticated:", piUsername);
  },
  function(error) {
    console.error("Pi authentication failed:", error);
  }
);

// Handle review form submission
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("reviewForm");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const score = parseInt(document.getElementById("score").value);
    const review = document.getElementById("review").value;

    if (!piUsername) {
      alert("Please authenticate with Pi Network first.");
      return;
    }

    const payload = {
      pi_username: piUsername,
      score: score,
      review: review
    };

    try {
      const res = await fetch("https://abcxyz.supabase.co/rest/v1/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY3h5eiIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjk5OTk5OTk5LCJleHAiOjIwMTU1NzU5OTl9.abc123xyz456",
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY3h5eiIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjk5OTk5OTk5LCJleHAiOjIwMTU1NzU5OTl9.abc123xyz456"
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert("Review submitted!");
        form.reset();
      } else {
        const errorText = await res.text();
        console.error("Submission error:", errorText);
        alert("Error submitting review.");
      }
    } catch (err) {
      console.error("Network error:", err);
      alert("Network error. Please try again.");
    }
  });
});