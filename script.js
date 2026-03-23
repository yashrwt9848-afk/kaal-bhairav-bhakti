// ======================
// CHECK PREMIUM ACCESS
// ======================
function checkPremium() {
    let isPremium = localStorage.getItem("isPremium");
    let premiumExpiry = localStorage.getItem("premiumExpiry");

    if(isPremium === "true" && premiumExpiry && Date.now() < parseInt(premiumExpiry)) {
        // Premium still active
        return true;
    }

    // Premium expired or never paid
    localStorage.removeItem("isPremium");
    localStorage.removeItem("premiumExpiry");
    alert("⚠️ Pehle Premium unlock karo!");
    window.location.href = "index.html"; // redirect if not premium
    return false;
}

// ======================
// OPEN RAZORPAY CHECKOUT
// ======================
function openRazorpay() {
    let options = {
        key: "rzp_live_SUKvoNdYYcy1TK", // ✅ Tumhara live key
        amount: 19900, // ₹199 in paise
        currency: "INR",
        name: "Kaal Bhairav Premium",
        description: "Unlock Exclusive Bhakti Videos",
        handler: function(response){
            // Payment successful → unlock for 1 week
            localStorage.setItem("isPremium", "true");

            // 1 week = 7*24*60*60*1000 ms
            let oneWeekExpiry = Date.now() + 7*24*60*60*1000;
            localStorage.setItem("premiumExpiry", oneWeekExpiry);

            alert("Payment Successful! 🔱 Premium unlocked for 1 week");
            window.location.href = "premium.html"; // redirect after payment
        },
        prefill: { name:"", email:"" },
        theme: { color:"#ff0000" },
        modal: {
            ondismiss: function(){ 
                alert("Payment cancelled! ⚠️"); 
            }
        }
    };

    let rzp = new Razorpay(options);
    rzp.open();
}