// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDOQJW1ccfv3CpCQd1uaaplv26gKtv6qFk",
  authDomain: "quantum-shilll.firebaseapp.com",
  projectId: "quantum-shilll",
  storageBucket: "quantum-shilll.appspot.com",
  messagingSenderId: "973795769709",
  appId: "1:973795769709:web:01fc2aa6e50a3f94a7ee64",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to add a new shill thread
async function addShillThread(thread) {
  try {
    await addDoc(collection(db, "threads"), thread);
    console.log("Thread added to Firestore!");
  } catch (error) {
    console.error("Error adding thread: ", error);
  }
}

// Function to fetch all shill threads
async function fetchThreads() {
  try {
    const querySnapshot = await getDocs(collection(db, "threads"));
    const threads = [];
    querySnapshot.forEach((doc) => {
      threads.push(doc.data());
    });
    return threads;
  } catch (error) {
    console.error("Error fetching threads: ", error);
    return [];
  }
}

// Function to render a thread in the UI
function renderThread({ coinName, ticker, reasons, shillText }) {
  const shillThread = document.createElement("div");
  shillThread.classList.add("shillThread");
  shillThread.innerHTML = `
    <h3>[Terminal]: Shilling ${coinName} (${ticker})</h3>
    <p><strong>#Reasons to Buy:</strong> ${reasons}</p>
    <p><strong>#Shill/Promote:</strong> ${shillText}</p>
  `;
  document.getElementById("shillThreadContainer").appendChild(shillThread);
}

// Handle form submission
document.getElementById("shillForm").addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent default form submission behavior

  // Get form inputs
  const coinName = document.getElementById("coinName").value.trim();
  const ticker = document.getElementById("ticker").value.trim();
  const reasons = document.getElementById("reasons").value.trim();
  const shillText = document.getElementById("shillText").value.trim();

  // Validate inputs
  if (!coinName || !ticker || !reasons || !shillText) {
    alert("Please fill in all fields!");
    return;
  }

  // Create thread object
  const thread = { coinName, ticker, reasons, shillText };

  // Add thread to Firestore
  await addShillThread(thread);

  // Render thread in the UI
  renderThread(thread);

  // Clear the form
  document.getElementById("shillForm").reset();
});

// Fetch and render threads on page load
window.onload = async () => {
  const threads = await fetchThreads();
  threads.forEach(renderThread);
};
