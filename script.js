// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDOQJW1ccfv3CpCQd1uaaplv26gKtv6qFk",
    authDomain: "quantum-shilll.firebaseapp.com",
    databaseURL: "https://quantum-shilll-default-rtdb.firebaseio.com/",
    projectId: "quantum-shilll",
    storageBucket: "quantum-shilll.firebasestorage.app",
    messagingSenderId: "973795769709",
    appId: "1:973795769709:web:01fc2aa6e50a3f94a7ee64",
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Reference the Realtime Database
  const database = firebase.database();
  const shillThreadsRef = database.ref('shillThreads');
  
  // Form Submit Event Listener
  document.getElementById('shillForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    // Collect Form Data
    const coinName = document.getElementById('coinName').value;
    const ticker = document.getElementById('ticker').value;
    const reasons = document.getElementById('reasons').value;
    const shillText = document.getElementById('shillText').value;
  
    // Save Data to Firebase
    const newShillThread = {
      coinName,
      ticker,
      reasons,
      shillText,
      timestamp: Date.now()
    };
    shillThreadsRef.push(newShillThread);
  
    // Reset Form
    document.getElementById('shillForm').reset();
  });
  
  // Listen for New Shill Threads in Firebase
  shillThreadsRef.on('child_added', function(snapshot) {
    const shillData = snapshot.val();
    const shillThread = document.createElement('div');
    shillThread.classList.add('shillThread');
  
    // Construct the Thread Content
    shillThread.innerHTML = `
      <h3 class="command">[Terminal]: Shilling ${shillData.coinName} (${shillData.ticker})</h3>
      <p>
        <span class="command">#Reasons to Buy:</span>
        <span>${shillData.reasons}</span>
      </p>
      <p>
        <span class="command">#Shill/Promote:</span>
        <span>${shillData.shillText}</span>
      </p>
    `;
  
    // Append Thread to Container
    document.getElementById('shillThreadContainer').appendChild(shillThread);
  });
  