import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyCRv57HNCR9FTh-lxrkbbwhWAGL4_u-tiI",
    authDomain: "linkedein-clone.firebaseapp.com",
    projectId: "linkedein-clone",
    storageBucket: "linkedein-clone.appspot.com",
    messagingSenderId: "1055810949190",
    appId: "1:1055810949190:web:18b158368a5cb8a74c3a47",
    measurementId: "G-3J6E6YJ1MM"
  };


  const firebaseApp = firebase.initializeApp(firebaseConfig);
  // const analytics = getAnalytics(firebaseApp);

  const db = firebaseApp.firestore();
  const auth  = firebase.auth();

  export {db, auth}; 