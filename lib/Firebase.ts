import { initializeApp } from "firebase/app";
import {
  collection,
  getDocs,
  getFirestore,
  doc,
  getDoc,
  serverTimestamp,
  addDoc,
  setDoc
} from "firebase/firestore";
import Anime from "../types/Anime";
import Post from "../types/Post";

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
const database = getFirestore();

export async function getPosts() {
  const postsCol = collection(database, "posts");
  const postSnapshot = await getDocs(postsCol);
  return postSnapshot.docs.map((doc) => doc.data() as Post);
}

export async function getAnime(name: string) {
  const animeRef = doc(database, "animes", name);
  const docSnap = await getDoc(animeRef);
  if (docSnap.exists()) return docSnap.data() as Anime;
  return null;
}

export async function getPost(name: string) {
  const postRef = doc(database, "posts", name);
  const postSnap = await getDoc(postRef);
  if (postSnap.exists()) return postSnap.data();
  return null;
}

export async function getAnimes() {
  const animesCol = collection(database, "animes")
  const animesSnap = await getDocs(animesCol);
  return animesSnap.docs.map((doc) => doc.data() as Anime)
}

export async function setPost(post: Post) {
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
  try {
    await setDoc(doc(database, "posts", post.slug), {
    title: post.title,
    slug: post.slug,
    image: post.image,
    anime: post.anime,
    text: post.text,
    author: post.author,
    });
    console.log("Post added");
  } catch (e) {
    console.log(e);
  }
}
