import React from 'react';
import { auth, provider, db, doc, setDoc, addDoc } from "@/firebase/firebaseConfig.js";
import { v4 as uuidv4 } from 'uuid';

export const AddProject = async (categories = [], description = "", progress = 0, task = null, user = null) => {
    try {
        if (!categories || !progress || !task || !user || !description) {
            console.error("Missing required fields");
            return;
        }
        const user = auth.currentUser;
        const uniqueId = uuidv4(); // Generate a unique ID
        if (user) {
            // User is signed in, get user details
            const projectData = {
                categories: categories,
                description: description,
                progress: progress,
                tasks: arrayUnion(task),
                users: arrayUnion(user.uid),
                // createdByName: user.displayName
            };
            await setDoc(doc(db, "projects", uniqueId), projectData);
            console.log("Event added:", eventData);
        } else {
            console.log("No user is signed in");
        }
    } catch (error) {
        console.error("Error adding event to Firestore", error);
    }
};

export const GenerateTaskFromProject = async (project_description) => {
    try {
        // Prepare the project description to send to the Flask API
        const projectDescription = project_description;

        // Make a POST request to the Flask API
        const response = await fetch('http://localhost:5000/generate-tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ project_description: projectDescription }),
        });

        if (!response.ok) {
            throw new Error('Failed to generate tasks from the API.');
        }

        // Parse the response to get the generated tasks
        const data = await response.json();
        const generatedTasks = data.tasks;

        // Log the generated tasks (or process them further)
        console.log("Generated Tasks:", generatedTasks);

        // Call AddEventToDB to save the generated tasks (if needed)
        await AddTask(generatedTasks); // Pass the generated tasks to AddTask

        console.log("Event generated from task");
    } catch (error) {
        console.error("Error generating event from task", error);
    }
};