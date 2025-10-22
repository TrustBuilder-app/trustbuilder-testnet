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
      const res = await fetch("https://gcfnbzd6v3vjmfhfajgclstrwdqli7gb7bmcbzr6uaeofdtnkzw4gqe.supabase.co/rest/v1/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": "YOUR_REAL_SUPABASE_ANON_KEY",
          "Authorization": "Bearer YOUR_REAL_SUPABASE_ANON_KEY"
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

// Trigger Pi payment for tier upgrade
function triggerTierPayment(tierName, amount) {
  Pi.createPayment({
    amount: amount,
    memo: `TrustBuilder Tier: ${tierName}`,
    metadata: {
      tier: tierName,
      wallet: "GCFNBZD6V3VJMFHFAJGCLSTRWDQL3I7GB7BMCBZR6UAEOFDTNKZW4GQE"
    }
  }, {
    onReadyForServerApproval: function(paymentId) {
      console.log("Ready for approval:", paymentId);
    },
    onReadyForServerCompletion: function(paymentId, txid) {
      console.log("Payment completed:", paymentId, txid);
      alert(`Tier ${tierName} unlocked!`);
    },
    onCancel: function(paymentId) {
      console.log("Payment cancelled:", paymentId);
      alert("Payment cancelled.");
    },
    onError: function(error, paymentId) {
      console.error("Payment error:", error);
      alert("Payment failed. Try again.");
    }
  });
}