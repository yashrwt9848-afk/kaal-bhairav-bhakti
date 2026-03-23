// ======================
// OPEN RAZORPAY CHECKOUT
// ======================
function openRazorpay() {
    let options = {
        "key": "rzp_live_SUKvoNdYYcy1TK", // ✅ Your Live Key ID
        "amount": 19900, // ₹199 in paise
        "currency": "INR",
        "name": "Kaal Bhairav Premium",
        "description": "Unlock Exclusive Bhakti Videos",
        "handler": function(response){
            // Payment success → Premium unlock
            localStorage.setItem("isPremium", "true");
            alert("Payment Successful! 🔱 Premium Unlocked");
            window.location.href = "premium.html"; // redirect after payment
        },
        "prefill": {
            "name": "",
            "email": ""
        },
        "theme": {
            "color": "#ff0000"
        },
        "modal": {
            "ondismiss": function(){
                alert("Payment cancelled! ⚠️");
            }
        }
    };

    // Open Razorpay checkout
    let rzp = new Razorpay(options);
    rzp.open();
}

// ======================
// CHECK PREMIUM ACCESS
// ======================
function checkPremium() {
    let isPremium = localStorage.getItem("isPremium");
    if(isPremium !== "true") {
        alert("⚠️ Pehle Premium unlock karo!");
        window.location.href = "index.html"; // redirect if not premium
    }
}

// ======================
// GO HOME FUNCTION
// ======================
function goHome() {
    window.location.href = "index.html";
}

// ======================
// OPTIONAL: AUDIO CONTROL
// ======================
let audio = document.getElementById("bg-audio");
function toggleAudio() {
    if(!audio) return;
    if(audio.paused) audio.play();
    else audio.pause();
}

// ======================
// PREMIUM BUTTON CLICK
// ======================
function unlockPremium() {
    openRazorpay(); // Call Razorpay
}

// ======================
// VIDEO AUTOPLAY (optional)
// ======================
function autoPlayVideos() {
    let videos = document.querySelectorAll("video");
    videos.forEach(video => {
        video.muted = true;
        video.play().catch(()=>{});
    });
}

// ======================
// PAGE LOAD EVENTS
// ======================
window.onload = function() {
    autoPlayVideos();
    // Check if premium page
    if(window.location.pathname.includes("premium.html")) {
        checkPremium();
    }
}
