/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAebkGi2-NR_2-keusqyLcg4mg0lFaO9Ho",
  authDomain: "book-store-72520.firebaseapp.com",
  projectId: "book-store-72520",
  storageBucket: "book-store-72520.appspot.com",
  messagingSenderId: "871057135844",
  appId: "1:871057135844:web:b09d9079c012b5fb31b4f1",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
