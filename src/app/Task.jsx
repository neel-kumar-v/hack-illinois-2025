import React from 'react';
import { auth, provider, db, doc, setDoc, addDoc, getDoc } from "@/firebase/firebaseConfig.js";
import { v4 as uuidv4 } from 'uuid';
import { AddEvent } from "@/app/Event.jsx";

const AddTask = () => {
  let sortedDocuments = [];
    const GenerateEventFromTask = async (title, deadline, category, task, description, hours) => {
 
        // Example: List of document references you want to sort
          try {
        const user = auth.currentUser;
          const userRef = doc(db, "users", user.uid);  // Replace with your collection name and document ID
          const userSnap = await getDoc(userRef);
          let eventsArray = [];
          if (userSnap) {
              const userData = userSnap.data();
              eventsArray = userData.events;  // Replace 'yourArrayField' with the field name that contains the array
              
              console.log(eventsArray[0]);  // Now you have the array
          } else {
              console.log("No such document!");
          }

    
        const sortReferencesByTimestamp = async (documentRefs) => {
          const documentPromises = documentRefs.map((ref) => getDoc(ref));
          const documentsSnapshot = await Promise.all(documentPromises);
    
          const documentsWithTimestamp = documentsSnapshot
            .map((docSnap) => {
              if (docSnap.exists()) {
                return {
                  id: docSnap.id,
                  data: docSnap.data(),
                  start: docSnap.data().start, // Replace with your actual timestamp field
                  end: docSnap.data().end,
                };
              }
              return null;
            })
            .filter((doc) => doc !== null);
    
          // Sort documents by timestamp (ascending)
          documentsWithTimestamp.sort((a, b) => a.start - b.start);
    
         sortedDocuments = documentsWithTimestamp;
        };
    
        sortReferencesByTimestamp(eventsArray);
      }
      catch (error) {
        console.error(error)
      }

      for (let i = 0; i < hours; i++) {
        let largest_gap = 0;
        let cur_time_begin_iteration = Date.now();
        let best_start = cur_time_begin_iteration;
        let best_end = cur_time_begin_iteration;
        sortedDocuments.forEach((doc) => {
            let diff = (doc.start.toDate().getTime() - cur_time_begin_iteration) / 1000 / 60 / 60;
            if (doc.start.toDate().getTime() < deadline.getTime()) {
                if (diff >= 1 && diff > largest_gap) {
                    largest_gap = diff;
                    best_start = cur_time_begin_iteration;
                    best_end = doc.start.toDate().getTime();
                } 
                cur_time_begin_iteration = doc.end.toDate().getTime();
            } else {
                return;
            }
        });

        if (best_start == best_end) {
          let diff = (deadline.getTime() - cur_time_begin_iteration) / 1000 / 60 / 60;
          if (cur_time_begin_iteration < deadline.getTime()) {
            if (diff >= 1) {
              largest_gap = diff;
              best_start = cur_time_begin_iteration;
              best_end = deadline.getTime();
            }
          }
        }

        if (largest_gap >= 1) {
            best_start = Math.floor(gap) + best_start;
            best_end = Math.floor(gap) + 3600000;
            AddEvent(title, description, new Date(best_start), new Date(best_end), category, task);
        } else {
            console.log("No more time slots available");
            break;
        }
        //call sort function again
        sortReferencesByTimestamp(sortedDocuments)
      }
    }


    const AddTask = async () => {
        try {
            const user = auth.currentUser;
            const uniqueId = uuidv4(); // Generate a unique ID
            if (user) {
                // User is signed in, get user details
                const taskData = {
                    category: "Sample Task",
                    deadline: new Date(),
                    description: "Sample Location",
                    difficulty: 0,
                    finished: false,
                    tags: "Sample Tag",
                    title: "Sample Title",
                    user: user.uid,
                };
                await setDoc(doc(db, "tasks", uniqueId), taskData);
                console.log("Event added:", taskData);
                GenerateEventFromTask(taskData.title, taskData.deadline, taskData.category, doc(db, "tasks", user.uid), taskData.description, 10);
    
            } else {
                console.log("No user is signed in");
            }
        }  catch (error) {
            console.error("Error adding event to Firestore", error);
        }
    };

  return (
    <div>
      {/* {<button onClick={AddTask}>Add Task</button> } */}
    </div>
  );
};

export default AddTask;
