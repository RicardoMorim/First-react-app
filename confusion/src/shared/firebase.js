import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

function startFirebase() {
  const firebaseConfig = {
    apiKey: "AIzaSyBfAt9NOO6rR3bj1yMC-dVnRM_lsHR2aMs",
    authDomain: "confusion-database.firebaseapp.com",
    projectId: "confusion-database",
    storageBucket: "confusion-database.appspot.com",
    messagingSenderId: "738879050562",
    appId: "1:738879050562:web:3712813191eb1b1ebfeedb",
    measurementId: "G-CEL1DPF2HC",
  };

  const app = initializeApp(firebaseConfig);
  return getDatabase(app);
}

export default startFirebase;
