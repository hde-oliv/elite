import { initializeApp } from "firebase/app";
import {
  collection,
  getDocs,
  getFirestore,
  doc,
  getDoc,
} from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

export async function getPosts() {
  const postsCol = collection(database, "posts");
  const postSnapshot = await getDocs(postsCol);
  return postSnapshot.docs.map((doc) => doc.data());
}

export async function getAnime(name) {
  const animeRef = doc(database, "animes", name);
  const docSnap = await getDoc(animeRef);
  if (docSnap.exists()) return docSnap.data();
  return null;
}
