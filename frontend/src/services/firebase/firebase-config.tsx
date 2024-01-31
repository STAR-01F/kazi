
export const firebaseConfig = {
apiKey: import.meta.env.VITE_API_KEY,
authDomain: import.meta.env.VITE_AUTH_DOMAIN,
projectId: import.meta.env.VITE_PROJECT_ID,
storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
appId: import.meta.env.VITE_APP_ID,
measurementId: import.meta.env.VITE_MEASUREMENT_ID
};

// export function getFirebaseConfig() {
//     // if (!firebaseConfig || !firebaseConfig.apiKey) {
//     //   throw new Error('No Firebase configuration object provided.' + '\n' +
//     //   'Add your web app\'s configuration object to firebase-config.ts');
//     // } else {
//       return firebaseConfig;
//    // }
//   }  

