<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
  import { getFirestore, collection, addDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

  // Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDOQJW1ccfv3CpCQd1uaaplv26gKtv6qFk",
    authDomain: "quantum-shilll.firebaseapp.com",
    projectId: "quantum-shilll",
    storageBucket: "quantum-shilll.firebasestorage.app",
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
      console.log("Thread added:", thread);
    } catch (error) {
      console.error("Error adding thread:", error);
    }
  }

  // Render a shill thread
  function renderThread({ coinName, ticker, reasons, shillText }) {
    const threadContainer = document.getElementById("shillThreadContainer");
    const threadElement = document.createElement("div");
    threadElement.classList.add("shillThread");
    threadElement.innerHTML = `
      <h3 class="command">[Terminal]: Shilling ${coinName} (${ticker})</h3>
      <p>
        <span class="command">#Reasons to Buy:</span>
        <span class="typing">${reasons}</span>
      </p>
      <p>
        <span class="command">#Shill/Promote:</span>
        <span class="typing">${shillText}</span>
      </p>
    `;
    threadContainer.appendChild(threadElement);
    threadContainer.scrollTop = threadContainer.scrollHeight;
  }

  // Listen for form submission
  document.getElementById("shillForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const coinName = document.getElementById("coinName").value.trim();
    const ticker = document.getElementById("ticker").value.trim();
    const reasons = document.getElementById("reasons").value.trim();
    const shillText = document.getElementById("shillText").value.trim();

    if (coinName && ticker && reasons && shillText) {
      const thread = { coinName, ticker, reasons, shillText };
      await addShillThread(thread);

      // Clear form inputs
      document.getElementById("shillForm").reset();
    }
  });

  // Real-time listener for new threads
  const threadsRef = collection(db, "threads");
  onSnapshot(threadsRef, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        renderThread(change.doc.data());
      }
    });
  });
</script>
