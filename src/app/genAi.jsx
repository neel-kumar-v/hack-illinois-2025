import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

export function GeminiTaskGenerator() {
  const [projectDescription, setProjectDescription] = useState('');
  const [generatedTasks, setGeneratedTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const genAI = new GoogleGenerativeAI("AIzaSyCzVpP8HAG-85oo2CGf1cY-M8hKBcnhyxk");

  const handleGenerateTasks = async () => {
    try {
      setLoading(true);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }); 
      const prompt = `List the specific tasks required to complete the following project: ${projectDescription}`;
      const result = await model.generateContent(prompt, {
        generationConfig: {
          maxOutputTokens: 500,
          temperature: 0.7,
          topK: 50,
          topP: 0.9,
        },
      });

      const response = result.response;
      const text = response.text();
      setGeneratedTasks([...generatedTasks, text]);
      setProjectDescription(''); // Clear input
    } catch (error) {
      console.error('Error generating tasks:', error);
    } finally {
      setLoading(false);
    }
  }
};

 