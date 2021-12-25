import { initializeApp } from "firebase/app";
import {
  collection,
  getDocs,
  getFirestore,
  startAt,
  limit,
  doc,
  deleteDoc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore/lite";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";

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

export async function getPaginatedPosts(page) {
  if (!page) {
    const firstBatch = query(
      collection(database, "posts"),
      orderBy("date", "desc"),
      limit(4)
    );
    const postSnap = await getDocs(firstBatch);
    return postSnap.docs.map((doc) => postToJSON(doc));
  } else {
    const nextBatch = query(
      collection(database, "posts"),
      orderBy("date", "desc"),
      startAt(page * 4 + 1),
      limit(4)
    );
    const postSnap = await getDocs(nextBatch);
    return postSnap.docs.map((doc) => postToJSON(doc));
  }
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
    console.error(e);
    return false;
  }
}

export async function setNewStatus(status) {
  try {
    await setDoc(doc(database, "status", status.slug), status);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export async function updateStatus(status) {
  try {
    await updateDoc(doc(database, "status", status.slug), status);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export async function setAnime(anime) {
  try {
    await setDoc(doc(database, `${anime.type}s`, anime.slug), anime);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export async function updatePost(post) {
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

export async function deleteStatus(status) {
  try {
    await deleteDoc(doc(database, "status", status.slug));
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function deletePost(post) {
  try {
    await deleteDoc(doc(database, "posts", post.slug));
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function updateAnime(anime, prevAnime) {
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
      await updateDoc(doc(database, `${anime.type}s`, anime.slug), anime);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}

export async function deleteAnime(anime) {
  try {
    await deleteDoc(doc(database, `${anime.type}s`, anime.slug));
    return true;
  } catch (e) {
    console.error(e);
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

export async function setUserInfo(user) {
  try {
    await setDoc(doc(database, "users", user.uid), {
      email: user.email,
    });
  } catch (e) {
    console.error((setUserError = { e }));
  }
}

export async function loginWithGoogle() {
  await signInWithPopup(auth, provider).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.error(
      (loginError = { errorCode, errorMessage, email, credential })
    );
  });
}

export async function logoutFromGoogle() {
  await signOut(auth);
}

export async function checkAdmin(user) {
  const staff = await getStaff();
  const admins = staff.filter((member) => member.admin);
  if (admins.length === 0) {
    return false;
  } else {
    const result = admins.map((member) => member.email).includes(user.email);
    return result;
  }
}
