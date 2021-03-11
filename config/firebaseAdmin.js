import * as firebaseAdmin from "firebase-admin";

if (!firebaseAdmin.apps.length) {
    firebaseAdmin.initializeApp({

        credential:
            firebaseAdmin.credential.cert({
                privateKey: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
                clientEmail: process.env.CLIENT_EMAIL,
                projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
            }),
            databaseUrl: process.env.NEXT_PUBLIC_DB_URL

        }
    )
}

export {firebaseAdmin}