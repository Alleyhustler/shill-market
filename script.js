import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Paste your Firebase config here
const firebaseConfig = {
    apiKey: "AIzaSyDY6LILW5s8pNdYqAJAGfWjyxN9vBfCpXs",
    authDomain: "quantums-1af9f.firebaseapp.com",
    databaseURL: "https://quantums-1af9f-default-rtdb.firebaseio.com",
    projectId: "quantums-1af9f",
    storageBucket: "quantums-1af9f.firebasestorage.app",
    messagingSenderId: "549853764835",
    appId: "1:549853764835:web:2cac5adc467d27a2b1f9d6"
  };

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const threadsCollection = collection(db, "shillThreads");

// Handle form submission
document.getElementById("shillForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  const coinName = document.getElementById("coinName").value;
  const ticker = document.getElementById("ticker").value;
  const reasons = document.getElementById("reasons").value;
  const shillText = document.getElementById("shillText").value;

  try {
    await addDoc(threadsCollection, {
      coinName,
      ticker,
      reasons,
      shillText,
      timestamp: Date.now()
    });

    document.getElementById("shillForm").reset();
  } catch (error) {
    console.error("Error adding thread:", error);
  }
});

// Display threads in real-time
const queryThreads = query(threadsCollection, orderBy("timestamp", "desc"));
onSnapshot(queryThreads, (snapshot) => {
  const container = document.getElementById("shillThreadContainer");
  container.innerHTML = "";

  snapshot.forEach((doc) => {
    const data = doc.data();

    const shillThread = document.createElement("div");
    shillThread.classList.add("shillThread");
    shillThread.innerHTML = `
      <h3>${data.coinName} (${data.ticker})</h3>
      <p>Reasons: ${data.reasons}</p>
      <p>Promotion: ${data.shillText}</p>
    `;
    container.appendChild(shillThread);
  });
});
