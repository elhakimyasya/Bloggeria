import { initializeApp } from 'firebase/app';
import { doc, getFirestore, onSnapshot } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import auth from './partials/auth';
import userProfile from './partials/userProfile';
import '../styles/styles.scss'

((dashboardPage, options) => {
    // Check Dashboard Page
    if (location.href.indexOf(dashboardPage) == -1) return;

    initializeApp(options.firebaseConfig);

    const firestoreDatabase = getFirestore();
    const firebaseAuth = getAuth();

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) {
            const documentReference = doc(firestoreDatabase, `users/${currentUser.uid}`);
            onSnapshot(documentReference, (doc) => {
                userProfile(doc);
            });

            functionSnackbar(options.text.textPleaseWait, options.config.snackbarDuration)
        } else {
            const authProvider = new GoogleAuthProvider;
            auth(firebaseAuth, authProvider)

            console.log('notuser')
            functionSnackbar(options.text.textPleaseWait, options.config.snackbarDuration)
        }
    });
})(authPageIndex, {
    firebaseConfig: firebaseConfig,
    config: {
        snackbarDuration: 3000
    },
    text: {
        textPleaseWait: 'Please Wait...'
    }
})