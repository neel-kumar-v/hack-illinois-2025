import React from 'react';
import { auth, provider, db, doc, setDoc, addDoc } from "@/firebase/firebaseConfig.js";
import { v4 as uuidv4 } from 'uuid';

const AddTask = () => {
    const AddTaskToDB = async () => {
        try {
            const user = auth.currentUser;
            const uniqueId = uuidv4(); // Generate a unique ID
            if (user) {
                // User is signed in, get user details
                const taskData = {
                    category: "Sample Task",
                    deadline: new Date().toISOString(),
                    description: "Sample Location",
                    difficulty: 0,
                    finished: false,
                    tags: "Sample Tag",
                    title: "Sample Title",
                    user: user.uid,
                };
                await setDoc(doc(db, "tasks", uniqueId), taskData);
                console.log("Event added:", taskData);
            } else {
                console.log("No user is signed in");
            }
        }  catch (error) {
            console.error("Error adding event to Firestore", error);
        }
    };

    const GenerateEventFromTask = async () => {
        try {
            await AddEventToDB();
            console.log("Event generated from task");
        } catch (error) {
            console.error("Error generating event from task", error);
        }
    };

  return (
    <div>
      {/* <button onClick={AddTaskToDB}>Add Task</button> */}
    </div>
  );
};

export default AddTask;