import { initializeApp, getApps } from "firebase/app"
import { getFirestore, collection, collectionGroup, where, getDocs, getDoc, onSnapshot, addDoc, deleteDoc, updateDoc, doc, enableIndexedDbPersistence, orderBy, query, limit, serverTimestamp, arrayUnion, arrayRemove } from "firebase/firestore"
import { getAuth, updateProfile, onAuthStateChanged, signOut, GoogleAuthProvider, GithubAuthProvider, TwitterAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, getIdTokenResult } from "firebase/auth"
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
	apiKey: "AIzaSyC4cLZQNfHIIlptqTkEoezZ6A1kME7oTCc",
	authDomain: "coursedvid.firebaseapp.com",
	projectId: "coursedvid",
	storageBucket: "coursedvid.appspot.com",
	messagingSenderId: "260025059322",
	appId: "1:260025059322:web:c9a503cc945035589ec643",
	measurementId: "G-K9SM3L4G0S"
}
const apps = getApps()
let firebaseApp;
if (!apps.length) {
	firebaseApp = initializeApp(firebaseConfig)
} else {
	firebaseApp = apps[0]
}
const db = getFirestore(firebaseApp, {})
const auth = getAuth(firebaseApp, {})

let analytics;
isSupported().then((isSupported) => {
	if (isSupported) {
		analytics = getAnalytics(firebaseApp, {});
	}
});

// Providers
const googleProvider = new GoogleAuthProvider();
// const githubProvider = new GithubAuthProvider();
const twitterProvider = new TwitterAuthProvider();


/**
 * AUTH FUNCTIONS
 **/


/**
 * Sign in with email and password
 * @param {string} email - email
 * @param {string} password - password
 * @returns {object} user object
 */
const signIn = async (email, password) => {
	try {
		let res = await signInWithEmailAndPassword(auth, email, password);

		// check custom claims
		let idTokenResult = await auth.currentUser.getIdTokenResult();

		if (idTokenResult.claims.admin) {
			console.log("Admin user")
			res.admin = true;
			return res;
		} else {
			console.log("Not admin user")
			return res;
		}

	} catch (error) {
		console.log('firebase-error', error);
		return error;
	}
}

/**
 * Sign in with google
 * @param {ref} signinProvider - signin provider
 * @returns {object} user Object
 */
const socialSignIn = async (signinProvider) => {

	let provider;
	switch (signinProvider) {
		case "google":
			provider = googleProvider;
			provider.addScope('profile');
			provider.addScope('email');
			break;

		case "github":
			provider = githubProvider;
			break;

		case "twitter":
			provider = twitterProvider;
			break;
	}

	try {
		let res = await signInWithPopup(auth, provider);
		// console.log("res", res);
		return res;
	} catch (error) {
		console.log("error", error);
	}
};

const signOutUser = async () => {
	try {
		let res = await signOut(auth);
		console.log("Sign-out successful", res);
		return res;
	} catch (error) {
		// An error happened.
		console.log("An error happened", error);
		return error;
	}
}

/**
 * DATABASE FUNCTIONS
 **/

/**
 * Get documents from a collection
 * @param {String} collectionName - name of the collection
 * @returns {Array} array of items
 * @example getDocsFromFirestore('products')
 */
const getDocsFromFirestore = async (collectionName) => {
	try {
		let items = [];
		const q = query(collection(db, collectionName));
		let res = await getDocs(q);
		res.forEach((doc) => {
			let newdoc = doc.data();
			newdoc.uid = doc.id;
			items.push(newdoc);
		});
		return items;
	} catch (error) {
		console.log('getDocsFromFirestore-error', error);
		return error;
	}
}

/**
 * Get documents from a subcollection
 * @param {String} docId - document id
 * @param {String} collectionName - collection name
 * @param {String} subcollectionName - subcollection name
 * @returns {Array} array of subcollection items
 * @example getSubcollectionFromFirestore('123', 'products', 'reviews')
 */
const getSubcollectionFromFirestore = async (docId, collectionName, subcollectionName) => {
	try {
		let items = [];
		const q = query(collection(db, `${collectionName}/${docId}/${subcollectionName}`), orderBy("createdAt", "desc"));
		let res = await getDocs(q);

		res.forEach((doc) => {
			let newdoc = doc.data();
			newdoc.uid = doc.id;
			items.push(newdoc);
		});
		return items;
	} catch (error) {
		console.log('getSubcollectionFromFirestore-error', error);
		return error;
	}
}

/**
 * Get documents from a subcollection with a filter
 * @param {string} subcollectionName - subcollection name
 * @param {array} whereOptions - where options
 * @returns {array} array of subcollection items
 * @example getSubcollectionFromFirestore('bookmark', ['uid', '==', 'xdcfjjDGbgkkj'])
 */
const getDocsFromSubcollection = async (subcollectionName, whereOptions) => {
	try {
		let items = [];
		const filtered = query(collectionGroup(db, subcollectionName), where(whereOptions[0], whereOptions[1], whereOptions[2]));
		const querySnapshot = await getDocs(filtered);
		querySnapshot.forEach((doc) => {
			let newdoc = doc.data();
			newdoc.uid = doc.id;
			items.push(newdoc);
		});
		return items;
	}
	catch (error) {
		console.log('getSubcollectionFromFirestore-error', error);
		return error;
	}
}

/**
 * Get a single document from a collection
 * @param {String} collectionName - collection name
 * @param {String} docId - document id
 * @example getDocFromFirestore('products', '123')
 */
const getDocFromFirestore = async (collectionName, docId) => {
	try {
		const docRef = doc(db, collectionName, docId);
		let res = await getDoc(docRef);
		// console.log("getDocFromFirestore", res.data());
		return res.data();
	} catch (error) {
		console.log('getDocFromFirestore-error', error);
		return error;
	}
}

/**
 * Get documents that match query from a collection
 * @param  {string} collectionName - collection name
 * @param  {array} whereOptions - array of strings
 * @example getDocsFromFirestoreWithQuery("products", ["title", "==", "test"])
 */
const getDocsFromFirestoreWithQuery = async (collectionName, whereOptions) => {
	try {
		let items = [];
		const q = query(collection(db, collectionName), where(whereOptions[0], whereOptions[1], whereOptions[2]));
		let res = await getDocs(q);
		res.forEach((doc) => {
			let newdoc = doc.data();
			newdoc.uid = doc.id;
			items.push(newdoc);
		});
		return items;
	} catch (error) {
		console.log('getDocsFromFirestoreWithQuery-error', error);
		return error;
	}
}

/**
 * Add a document to a collection
 * @param {string} collectionName - collection name
 * @param {object} doc - document to add
 * @example addDocToFirestore('products', { title: "test", body: "test" })
 */
const addDocToFirestore = async (collectionName, doc) => {
	try {
		let res = await addDoc(collection(db, collectionName), doc);
		return res;
	} catch (error) {
		console.log('addDocToFirestore-error', error);
		return error;
	}
}

/**
 * Add a document to a sub collection
 * @param  {string} collectionName - the collection name
 * @param  {string} docId -	the document id
 * @param  {string} subcollectionName - the sub collection name
 * @param  {object} doc - the document to add
 * @example addDocToSubcollection("products", "123", "reviews", { title: "test", body: "test" })
 */
const addDocToSubcollection = async (collectionName, docId, subcollectionName, doc) => {
	try {
		let res = await addDoc(collection(db, `${collectionName}/${docId}/${subcollectionName}`), doc);
		return res;
	} catch (error) {
		console.log('addDocToSubcollection-error', error);
		return error;
	}
}

/**
 * Delete a document in a collection
 * @param  {string} collectionName - the name of the collection
 * @param  {string} docId - document id
 */
const deleteDocFromFirestore = async (collectionName, docId) => {
	try {
		const docRef = doc(db, collectionName, docId);
		let res = await deleteDoc(docRef);
		return res;
	} catch (error) {
		console.log('deleteDocFromFirestore-error', error);
		return error;
	}
}

/**
 * Update a document in a collection
 * @param {string} collectionName - the collection name
 * @param {string} uid - the document id
 * @param {object} data - the data to update
 * @example updateDocInFirestore('products', '123', { title: "test", body: "test" })
 */
const updateDocInFirestore = async (collectionName, uid, data) => {
	try {
		let res = await updateDoc(doc(db, collectionName, uid), data);
		return res;
	} catch (error) {
		console.log('updateDocInFirestore-error', error);
		return error;
	}
}

/**
 * update user profile
 * @param {object} data - the data to update 
 * @example updateUserProfile({ name: "test", email: "test" })
 */
const updateUserProfile = async (data) => {
	try {
		let res = await updateProfile(auth.currentUser, data);
		return res;
	} catch (error) {
		console.log('updateUserProfile-error', error);
		return error;
	}
}

export { db, auth, signOutUser, socialSignIn, signIn, addDocToFirestore, addDocToSubcollection, getDocsFromFirestore, getDocFromFirestore, getDocsFromFirestoreWithQuery, getDocsFromSubcollection, deleteDocFromFirestore, updateDocInFirestore, onSnapshot, collection, doc, getSubcollectionFromFirestore, updateUserProfile, serverTimestamp, arrayUnion, arrayRemove };