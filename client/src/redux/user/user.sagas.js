import { takeLatest, all, call, put } from "redux-saga/effects";

import { 
    auth, 
    googleProvider,
    createUserProfileDocument, 
    getCurrentUser
} from "../../firebase/firebase.utils";

import UserActionTypes from "./user.type";
import { 
    signInFailure, 
    signInSuccess,
    signOutFailure,
    signOutSuccess,
    signUpFailure,
    signUpSuccess, 
} from "./user.action";


export function* getSnapshotFromAuth(userAuth, additionalData) {
    try{
        const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
        const userSnapshot = yield userRef.get();
        yield put(signInSuccess({
            id: userSnapshot.id,
            ...userSnapshot.data()
        }))
    } catch(err) {
        yield put(signInFailure(err))
    }
}

export function* signInWithGoogle() {
    try{
        const { user } = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromAuth(user)
    } catch(err) {
        yield put(signInFailure(err))
    }
}

export function* signInWithEmail({ payload: { email, password } }) {
    try{
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromAuth(user)
    } catch(err) {
        yield put(signInFailure(err))
    }
}

export function* isUserAuthenticated() {
    try{
        const userAuth = yield getCurrentUser();
        if (!userAuth) return;
        yield getSnapshotFromAuth(userAuth);
    } catch(err) {
        yield put(signInFailure(err))
    }
}

export function* isUserSignOut() {
    try{
        yield auth.signOut();
        yield put(signOutSuccess());
    } catch(err) {
        yield put(signOutFailure(err));
    }
}

export function* signUpUser({ payload: {email, password, displayName} }) {
    try{
        const { user } = yield auth.createUserWithEmailAndPassword(email, password);
        yield put(signUpSuccess({ user, additionalData: { displayName } }))
    } catch(err) {
        yield put(signUpFailure(err))
    }
}

export function* signInAfterSignUp({payload: { user, additionalData} }) {
    yield getSnapshotFromAuth(user, additionalData);
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, isUserSignOut)
}

export function* onSignUpStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUpUser)
}

export function* onSignUpSuccess() {
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess)
    ])
}