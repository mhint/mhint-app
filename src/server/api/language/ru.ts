import dotenv from 'dotenv';
import { createNewThreadWithAssistant, sendMessageToAssistant } from '../../utils/openai.js';

dotenv.config();

export const runAssistant = async () => {
  try {
    // Initialize the thread
    const threadId = await createNewThreadWithAssistant(process.env.OPENAI_ASSISTANT_ID!);
    const userMessage = 'Follow system instructions';
    
    // Await the response from sending the user message
    const assistantResponse = await sendMessageToAssistant({ threadId, userMessage });

    return assistantResponse;
  } catch (error) {
    return `Error during assistant interaction: ${error}`;
  }
}

export default runAssistant;
