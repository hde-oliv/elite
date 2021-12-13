import { initializeApp } from "firebase/app";
import {
  collection,
  getDocs,
  getFirestore,
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyAhUgRnnqlTQDoZoYiI_goe-oGXwLFtxig",
  authDomain: "elite-eeb6b.firebaseapp.com",
  projectId: "elite-eeb6b",
  storageBucket: "elite-eeb6b.appspot.com",
  messagingSenderId: "1020982133387",
  appId: "1:1020982133387:web:86d9966ce19dfbcdbd4a8e",
  measurementId: "G-W116RDRH7V",
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

export async function getPosts() {
  const q = query(collection(database, "posts"), orderBy("date", "desc"));
  const postSnap = await getDocs(q);
  return postSnap.docs.map((doc) => postToJSON(doc));
}

export async function getPost(name) {
  const postRef = doc(database, "posts", name);
  const postSnap = await getDoc(postRef);
  if (postSnap.exists()) return postToJSON(postSnap);
  return null;
}

export async function getAnime(name) {
  const animeRef = doc(database, "animes", name);
  const docSnap = await getDoc(animeRef);
  if (docSnap.exists()) return docSnap.data();
  return null;
}

export async function getAnimes() {
  const animesCol = collection(database, "animes");
  const animesSnap = await getDocs(animesCol);
  return animesSnap.docs.map((doc) => doc.data());
}

export async function getFilm(name) {
  const filmRef = doc(database, "films", name);
  const docSnap = await getDoc(filmRef);
  if (docSnap.exists()) return docSnap.data();
  return null;
}

export async function getFilms() {
  const filmsCol = collection(database, "films");
  const filmsSnap = await getDocs(filmsCol);
  return filmsSnap.docs.map((doc) => doc.data());
}

export async function getSpecial(name) {
  const specialRef = doc(database, "specials", name);
  const docSnap = await getDoc(specialRef);
  if (docSnap.exists()) return docSnap.data();
  return null;
}

export async function getSpecials() {
  const specialsCol = collection(database, "specials");
  const specialsSnap = await getDocs(specialsCol);
  return specialsSnap.docs.map((doc) => doc.data());
}

export async function getStatus() {
  const statusCol = collection(database, "status");
  const statusSnap = await getDocs(statusCol);
  return statusSnap.docs.map((doc) => doc.data());
}

export async function getStaff() {
  const staffCol = collection(database, "staff");
  const staffSnap = await getDocs(staffCol);
  return staffSnap.docs.map((doc) => doc.data());
}

export async function setPost(post) {
  try {
    await setDoc(doc(database, "posts", post.slug), {
      ...post,
      date: serverTimestamp(),
    });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    date: data?.date.toDate().toLocaleDateString() || 0,
  };
}
