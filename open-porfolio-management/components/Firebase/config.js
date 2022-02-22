const config = {
    apiKey: process.env.NEXT_PUBLIC_OPEN_PORTFOLIO_GOOGLE_API, //process.env.OPEN_PORTFOLIO_GOOGLE_API ,
    authDomain: "openportfolio-6a53e.firebaseapp.com",
    projectId: "openportfolio-6a53e",
    storageBucket: "openportfolio-6a53e.appspot.com",
    messagingSenderId: "664495550335",
    appId: "1:664495550335:web:f6630861ca8e80c495f44a",
    measurementId: "G-YN4Z4M7WZ8",
};

export function getFirebaseConfig() {
    if (!config || !config.apiKey) {
        throw new Error(
            "No Firebase configuration object provided." +
                "\n" +
                "Add your web app's configuration object to firebase-config.js"
        );
    } else {
        return config;
    }
}
