// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.6.5/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.5/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyDCBeiTaFHIa2GOfTTiEWJx0T35KP3al9I",
    authDomain: "fyp-project-1deb6.firebaseapp.com",
    projectId: "fyp-project-1deb6",
    storageBucket: "fyp-project-1deb6.appspot.com",
    messagingSenderId: "743594009104",
    appId: "1:743594009104:web:df838f2f0e10c4cdd76095",
    measurementId: "G-0ME6JEMTNK"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
