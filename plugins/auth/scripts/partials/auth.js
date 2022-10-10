import { signInWithRedirect } from "firebase/auth";

const auth = (authModule, authProvider) => {
    signInWithRedirect(authModule, authProvider).then(() => {
        functionSnackbar('pleasewaitbro', 5000)
    })
}

export default auth;