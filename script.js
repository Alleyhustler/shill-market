import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOQJW1ccfv3CpCQd1uaaplv26gKtv6qFk",
  authDomain: "quantum-shilll.firebaseapp.com",
  projectId: "quantum-shilll",
  storageBucket: "quantum-shilll.firebasestorage.app",
  messagingSenderId: "973795769709",
  appId: "1:973795769709:web:01fc2aa6e50a3f94a7ee64",
  measurementId: "G-QNFJ3XH6SX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Event listener for the form submission
document.getElementById('shillForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const coinName = document.getElementById('coinName').value;
    const ticker = document.getElementById('ticker').value;
    const reasons = document.getElementById('reasons').value;
    const shillText = document.getElementById('shillText').value;

    // Push the data to Firebase
    push(ref(db, 'shillThreads'), {
        coinName: coinName,
        ticker: ticker,
        reasons: reasons,
        shillText: shillText,
        timestamp: Date.now()  // Store the timestamp of when the thread was created
    });

    // Clear form inputs
    document.getElementById('shillForm').reset();
});

// Function to display new threads from Firebase
onChildAdded(ref(db, 'shillThreads'), (snapshot) => {
    const shillData = snapshot.val();
    const shillThread = document.createElement('div');
    shillThread.classList.add('shillThread');

    // Build the content of the shill thread
    shillThread.innerHTML = `
        <h3 class="command">[Terminal]: Shilling ${shillData.coinName} (${shillData.ticker})</h3>
        <p><span class="command">#Reasons to Buy:</span> <span class="typing">${shillData.reasons}</span></p>
        <p><span class="command">#Shill/Promote:</span> <span class="typing">${shillData.shillText}</span></p>
    `;

    // Append the new thread to the container
    document.getElementById('shillThreadContainer').appendChild(shillThread);
});
