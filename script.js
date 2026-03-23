<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Kaal Bhairav Premium</title>
<style>
    body { font-family: Arial, sans-serif; background:#fff; text-align:center; padding:50px;}
    h1 { color:#ff0000; }
    button { padding:15px 30px; font-size:18px; background:#ff0000; color:#fff; border:none; border-radius:8px; cursor:pointer; }
    button:disabled { background:#aaa; cursor:not-allowed; }
</style>
</head>
<body>

<h1>🔥 Kaal Bhairav Premium 🔱</h1>
<p>Unlock exclusive Bhakti videos for 1 week!</p>
<button id="unlockBtn">Unlock Premium ₹199</button>

<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
<script>
// ======================
// CONFIG
// ======================
const RAZORPAY_KEY = "rzp_live_SUKvoNdYYcy1TK"; // ✅ Replace with your live key
const PREMIUM_AMOUNT = 19900; // ₹199 in paise

// ======================
// PREMIUM CHECK
// ======================
function checkPremium() {
    let isPremium = localStorage.getItem("isPremium");
    let premiumExpiry = localStorage.getItem("premiumExpiry");

    if(isPremium === "true" && premiumExpiry && Date.now() < parseInt(premiumExpiry)) {
        // Premium active
        let daysLeft = Math.ceil((parseInt(premiumExpiry) - Date.now()) / (1000*60*60*24));
        document.getElementById("unlockBtn").textContent = `Premium Active ✅ (${daysLeft} day(s) left)`;
        document.getElementById("unlockBtn").disabled = true;
        return true;
    }

    // Premium expired or never paid
    localStorage.removeItem("isPremium");
    localStorage.removeItem("premiumExpiry");
    document.getElementById("unlockBtn").textContent = "Unlock Premium ₹199";
    document.getElementById("unlockBtn").disabled = false;
    return false;
}

// ======================
// OPEN RAZORPAY CHECKOUT
// ======================
function openRazorpay() {
    let options = {
        key: RAZORPAY_KEY,
        amount: PREMIUM_AMOUNT,
        currency: "INR",
        name: "Kaal Bhairav Premium",
        description: "Unlock Exclusive Bhakti Videos",
        handler: function(response){
            // Payment successful → unlock for 1 week
            localStorage.setItem("isPremium", "true");
            let oneWeekExpiry = Date.now() + 7*24*60*60*1000; // 1 week
            localStorage.setItem("premiumExpiry", oneWeekExpiry);
            alert("Payment Successful! 🔱 Premium unlocked for 1 week");
            checkPremium(); // update button
        },
        theme: { color: "#ff0000" },
        modal: { ondismiss: function(){ alert("Payment cancelled! ⚠️"); } }
    };

    let rzp = new Razorpay(options);
    rzp.open();
}

// ======================
// BUTTON CLICK
// ======================
document.getElementById("unlockBtn").addEventListener("click", function(){
    openRazorpay();
});

// ======================
// PAGE LOAD
// ======================
window.onload = function(){
    checkPremium();
}
</script>

</body>
</html>