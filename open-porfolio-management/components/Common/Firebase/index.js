import { useEffect, useState } from 'react'

import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { getFirebaseConfig } from './config.js'
import setUser from '../../../lib_client/setUser'

const firebaseAppConfig = getFirebaseConfig()

initializeApp(firebaseAppConfig)

// Signs-in
export async function signInGoogle() {
  var provider = new GoogleAuthProvider()

  await signInWithPopup(getAuth(), provider)
}

// Signs-out
export function signOutGoogle() {
  signOut(getAuth())
}

// Returns the signed-in user's profile Pic URL.
export function getProfilePicUrl() {
  return getAuth().currentUser.photoURL + "?height=4"
}

// Returns the signed-in user's display name.
export function getGoogleUserName() {
  return getAuth().currentUser.displayName
}

// Returns the signed-in user's display name.
export function getGoogleUserEmail() {
  return getAuth().currentUser.email
}

// Returns true if a user is signed-in.
export function isSignedInGoogle() {
  return !!getAuth().currentUser
}

export function initFirebaseAuth(authStateObserver) {
  onAuthStateChanged(getAuth(), authStateObserver)
}

export const GoogleCheck = () => {
  const [isSignedIn, setIsSignedIn] = useState(() => isSignedInGoogle())

  useEffect(() => {
    initFirebaseAuth((user) => {
      if (user) {
        setIsSignedIn(true)
        setUser(getGoogleUserName(), getGoogleUserEmail())
      } else setIsSignedIn(false)
    })
  }, [])

  return isSignedIn
}
