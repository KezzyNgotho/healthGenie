import firebase from'@react-native-firebase/app';
import '@react-native-firebase/auth';;
import '@react-native-firebase/firestore' ;// Import other Firebase services as needed



const firebaseConfig = {
  apiKey: "AIzaSyB2eegYcBB1gfKEjoCtct3kr3gYBBGSm1o",
  authDomain: "health-fb0ef.firebaseapp.com",
  databaseURL: "https://health-fb0ef-default-rtdb.firebaseio.com",
  projectId: "health-fb0ef",
  storageBucket: "health-fb0ef.appspot.com",
  messagingSenderId: "655005063231",
  appId: "1:655005063231:web:5161ce342645683963008a",
  measurementId: "G-7B8VRT5MF8"
};
  
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export default firebase;