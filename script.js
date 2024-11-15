// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDOQJW1ccfv3CpCQd1uaaplv26gKtv6qFk",
    authDomain: "quantum-shilll.firebaseapp.com",
    projectId: "quantum-shilll",
    storageBucket: "quantum-shilll.firebasestorage.app",
    messagingSenderId: "973795769709",
    appId: "1:973795769709:web:01fc2aa6e50a3f94a7ee64",
  };

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const threadsCollection = collection(db, "shillThreads");

// Handle form submission
document.getElementById("shillForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  // Get input values
  const coinName = document.getElementById("coinName").value;
  const ticker = document.getElementById("ticker").value;
  const reasons = document.getElementById("reasons").value;
  const shillText = document.getElementById("shillText").value;

  // Add a new thread to Firestore
  try {
    await addDoc(threadsCollection, {
      coinName,
      ticker,
      reasons,
      shillText,
      timestamp: Date.now()
    });

    // Clear the form after submission
    document.getElementById("shillForm").reset();
  } catch (error) {
    console.error("Error adding thread:", error);
  }
});

// Display threads in real-time
const queryThreads = query(threadsCollection, orderBy("timestamp", "desc"));
onSnapshot(queryThreads, (snapshot) => {
  const container = document.getElementById("shillThreadContainer");
  container.innerHTML = ""; // Clear existing threads

  snapshot.forEach((doc) => {
    const data = doc.data();

    // Create a new thread element
    const shillThread = document.createElement("div");
    shillThread.classList.add("shillThread");

    // Add thread content
    shillThread.innerHTML = `
      <h3 class="command">[Terminal]: Shilling ${data.coinName} (${data.ticker})</h3>
      <p><span class="command">#Reasons to Buy:</span> <span class="typing">${data.reasons}</span></p>
      <p><span class="command">#Shill/Promote:</span> <span class="typing">${data.shillText}</span></p>
    `;

    // Append to the container
    container.appendChild(shillThread);
  });
});
