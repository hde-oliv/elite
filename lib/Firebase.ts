import { initializeApp } from "firebase/app";
import {
  collection,
  getDocs,
  getFirestore,
  startAfter,
  limit,
  doc,
  deleteDoc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  query,
  orderBy,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore/lite";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import Post from "../models/Post";
import Status from "../models/Status";
import Anime from "../models/Anime";

const firebaseConfig = {
  apiKey: "AIzaSyAhUgRnnqlTQDoZoYiI_goe-oGXwLFtxig",
  authDomain: "elite-eeb6b.firebaseapp.com",
  projectId: "elite-eeb6b",
  storageBucket: "elite-eeb6b.appspot.com",
  messagingSenderId: "1020982133387",
  appId: "1:1020982133387:web:86d9966ce19dfbcdbd4a8e",
  measurementId: "G-W116RDRH7V",
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);

export async function getPosts() {
  const q = query(collection(database, "posts"), orderBy("date", "desc"));
  const postSnap = await getDocs(q);
  return postSnap.docs.map((doc) => postToJSON(doc));
}

export async function getPaginatedPosts(page: number) {
  if (page === 0) {
    const firstBatch = query(
      collection(database, "posts"),
      orderBy("date", "desc"),
      limit(4)
    );
    const postSnap = await getDocs(firstBatch);
    return postSnap.docs.map((doc) => postToJSON(doc));
  } else {
    const firstBatch = query(
      collection(database, "posts"),
      orderBy("date", "desc"),
      limit(page * 4)
    );
    const firstSnap = await getDocs(firstBatch);
    const lastPost = firstSnap.docs[firstSnap.docs.length - 1];
    const nextBatch = query(
      collection(database, "posts"),
      orderBy("date", "desc"),
      startAfter(lastPost),
      limit(4)
    );
    const postSnap = await getDocs(nextBatch);
    return postSnap.docs.map((doc) => postToJSON(doc));
  }
}

export async function getPost(name: string) {
  const postRef = doc(database, "posts", name);
  const postSnap = await getDoc(postRef);
  if (postSnap.exists()) return postToJSON(postSnap);
  return null;
}

export async function getAnime(name: string) {
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

export async function getFilm(name: string) {
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

export async function getSpecial(name: string) {
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

export async function setPost(post: Post) {
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

export async function setNewStatus(status: Status) {
  try {
    await setDoc(doc(database, "status", status.slug), status);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function updateStatus(status: Status) {
  try {
    await updateDoc(doc(database, "status", status.slug), { ...status });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function setAnime(anime: Anime) {
  try {
    await setDoc(doc(database, `${anime.type}s`, anime.slug), anime);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function updatePost(post: Post) {
  try {
    await updateDoc(doc(database, "posts", post.slug), {
      ...post,
    });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function deleteStatus(status: Status) {
  try {
    await deleteDoc(doc(database, "status", status.slug));
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function deletePost(post: Post) {
  try {
    await deleteDoc(doc(database, "posts", post.slug));
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function updateAnime(anime: Anime, prevAnime: Anime) {
  if (anime.type !== prevAnime.type || anime.slug !== prevAnime.slug) {
    try {
      await deleteDoc(doc(database, `${prevAnime.type}s`, prevAnime.slug));
      setAnime(anime);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  } else {
    try {
      await updateDoc(doc(database, `${anime.type}s`, anime.slug), {
        ...anime,
      });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}

export async function deleteAnime(anime: Anime) {
  try {
    await deleteDoc(doc(database, `${anime.type}s`, anime.slug));
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export function postToJSON(doc: QueryDocumentSnapshot<DocumentData>) {
  const data = doc.data();
  return {
    ...data,
    date: data?.date.toDate().toLocaleDateString() || 0,
  };
}

export async function setUserInfo(user: User) {
  try {
    await setDoc(doc(database, "users", user.uid), {
      email: user.email,
    });
  } catch (e) {
    console.log({ e });
  }
}

export async function loginWithGoogle() {
  await signInWithPopup(auth, provider).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.log({ errorCode, errorMessage, email, credential });
  });
}

export async function logoutFromGoogle() {
  await signOut(auth);
}

export async function checkAdmin(user: User) {
  const staff = await getStaff();
  const admins = staff.filter((member) => member.admin);
  if (admins.length === 0) {
    return false;
  } else {
    const result = admins.map((member) => member.email).includes(user.email);
    return result;
  }
}
