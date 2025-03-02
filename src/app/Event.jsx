import React from 'react';
import { auth, provider, db, doc, setDoc, addDoc } from "@/firebase/firebaseConfig.js";
import { v4 as uuidv4 } from 'uuid';

export const AddEventToDB = async (title = "", description = "", start = "", end = "", category = "", task = null) => {

    try {
        if (!title || !description || !start || !end) {
            console.error("Missing required fields");
            return;
        }
        const user = auth.currentUser;
        const uniqueId = uuidv4(); // Generate a unique ID
        if (user) {
            // User is signed in, get user details
            const eventData = {
                title: title,
                description: description,
                start: start,
                end: end,
                category: category,
                task: task,

                // createdByName: user.displayName
            };
            await setDoc(doc(db, "events", uniqueId), eventData);
            console.log("Event added:", eventData);
        } else {
            console.log("No user is signed in");
        }
    } catch (error) {
        console.error("Error adding event to Firestore", error);
    }
};