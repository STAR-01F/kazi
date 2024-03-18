#Firebase API

This API is part of a larger application, providing Database and Authentication services.

## Setup

Before using Firebase services, set up your environment variables. Follow these steps:

1. Create a new file in the frontend folder name `.env`.

2. Add the following variables:

   ```dotenv
   VITE_API_KEY=
   VITE_AUTH_DOMAIN=
   VITE_PROJECT_ID=
   VITE_STORAGE_BUCKET=
   VITE_MESSAGING_SENDER_ID=
   VITE_APP_ID=
   VITE_MEASUREMENT_ID=
   ```

3. Go to the project settings in your Firebase account and under `Your apps` you will find all the values needed for the variables above.

4. Now you have access to all the services in the firebase folder.

### APi Documentation

To find out more about the Firebase API's checkout the [Firebase Documentation](https://firebase.google.com/docs/)
