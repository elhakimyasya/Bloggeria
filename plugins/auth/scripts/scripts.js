import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

((dashboardPage, options) => {
    // Check Dashboard Page
    if (location.href.indexOf(dashboardPage) == -1) return;

    initializeApp(options.firebaseConfig);

    const firestoreDatabase = getFirestore();
    const firebaseAuth = getAuth();

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) {
            console.log('user');
            functionSnackbar('pleasewaitpleasewaitpleasewaitpleasewaitpleasewaitpleasewaitpleasewaitpleasewaitpleasewaitpleasewaitpleasewaitpleasewaitpleasewaitpleasewaitpleasewaitpleasewait', 5000)
        } else {
            console.log('notuser')
            functionSnackbar('pleasewaitpleasewaitpleasewaitpleasewaitpleasewaitpleasewaitpleasewaitpleasewaitpleasewaitpleasewaitpleasewaitpleasewaitpleasewaitpleasewaitpleasewaitpleasewait', 5000)
        }
    });
})(authPageIndex, {
    firebaseConfig: firebaseConfig,
})