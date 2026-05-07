// firebase-config.js - UPDATED WITH ABHIJEET PROJECT
const firebaseConfig = {
  apiKey: "AIzaSyD66kWwzsUS4iOZ-4ssE9w9kG1N4fBOOzk",
  authDomain: "abhijeet-69d56.firebaseapp.com",
  databaseURL: "https://abhijeet-69d56-default-rtdb.firebaseio.com",
  projectId: "abhijeet-69d56",
  storageBucket: "abhijeet-69d56.firebasestorage.app",
  messagingSenderId: "490125802939",
  appId: "1:490125802939:web:3fda6b6b9b4c1af984d89e",
  measurementId: "G-HGLB4WYJCR"
};

// Initialize Firebase only if not already initialized
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Global Variables
const db = firebase.firestore();
const auth = firebase.auth();

// Optional: Enable offline persistence
db.settings({ cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED });
db.enablePersistence().catch((err) => {
    console.error("Persistence failed:", err.code);
}); 

Kya ise aise hi save kar dun?
