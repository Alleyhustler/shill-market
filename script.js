// Firebase setup
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// DOM Elements
const shillForm = document.getElementById('shillForm');
const shillThreadContainer = document.getElementById('shillThreadContainer');

// Handle form submission
shillForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Collect input values
    const coinName = document.getElementById('coinName').value.trim();
    const ticker = document.getElementById('ticker').value.trim();
    const reasons = document.getElementById('reasons').value.trim();
    const shillText = document.getElementById('shillText').value.trim();

    if (coinName && ticker && reasons && shillText) {
        // Save to Firebase
        push(ref(db, 'shillThreads'), {
            coinName,
            ticker,
            reasons,
            shillText
        });

        // Clear form inputs
        shillForm.reset();
    }
});

// Listen for new threads
onChildAdded(ref(db, 'shillThreads'), (snapshot) => {
    const data = snapshot.val();

    // Create a new thread element
    const shillThread = document.createElement('div');
    shillThread.classList.add('shillThread');
    shillThread.innerHTML = `
        <h3 class="command">[Terminal]: Shilling ${data.coinName} (${data.ticker})</h3>
        <p>
            <span class="command">#Reasons to Buy:</span>
            <span class="typing">${data.reasons}</span>
        </p>
        <p>
            <span class="command">#Shill/Promote:</span>
            <span class="typing">${data.shillText}</span>
        </p>
    `;

    // Append to container
    shillThreadContainer.appendChild(shillThread);
});
