import dotenv from 'dotenv';
import { OpenAI } from 'openai';

dotenv.config();

let assistant: OpenAI.Beta.Assistants.Assistant;

const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Renamed function to clarify purpose
export async function createNewThreadWithAssistant(assistantId: string): Promise<string> {
  console.log(`Initializing assistant with ID: ${assistantId}`);
  
  assistant = await openaiClient.beta.assistants.retrieve(assistantId);
  console.log(`Assistant retrieved: ${assistant.id}`);
  
  const newThread = await openaiClient.beta.threads.create();
  console.log(`New thread created with ID: ${newThread.id}`);
  
  return newThread.id;
}

export async function sendMessageToAssistant({
  threadId,
  userMessage,
}: {
  threadId: string;
  userMessage: string;
}): Promise<string> {
  console.log(`Sending message to thread ${threadId}: ${userMessage}`);
  
  await openaiClient.beta.threads.messages.create(threadId, {
    role: 'user',
    content: userMessage,
  });

  console.log('User message sent. Creating assistant run...');
  
  const runResult = await openaiClient.beta.threads.runs.create(threadId, {
    assistant_id: assistant.id,
    instructions: assistant.instructions,
  });
  console.log(`Assistant run created with ID: ${runResult.id}`);

  const threadMessages = await waitForRunCompletion(threadId, runResult.id);
  const firstContent = threadMessages.data[0].content[0];
  
  if (firstContent.type !== 'text') {
    throw new Error(`Expected text message content, got ${firstContent.type}`);
  }
  
  console.log(`Received response: ${firstContent.text.value}`);
  return firstContent.text.value;
}

// Renamed for better clarity and added console logs
async function waitForRunCompletion(
  threadId: string,
  runId: string
): Promise<OpenAI.Beta.Threads.Messages.MessagesPage> {
  return new Promise((resolve) => {
    const poll = async () => {
      console.log(`Polling for run status with runId: ${runId}`);
      
      const runStatus = await openaiClient.beta.threads.runs.retrieve(threadId, runId);

      if (runStatus.status === 'completed') {
        console.log('Run completed. Fetching messages...');
        const messagesPage = await openaiClient.beta.threads.messages.list(threadId);
        resolve(messagesPage);
      } else {
        console.log('Waiting for assistant response...');
        setTimeout(poll, 3000);
      }
    };
    poll();
  });
}
