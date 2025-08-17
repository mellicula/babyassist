// Enhanced AI integration with RAG capabilities
import { RAGService } from '../services/ragService.js';

export async function InvokeLLM({ prompt, childInfo = null }) {
  try {
    // Use RAG to get relevant documents and generate response
    const documents = await RAGService.retrieveRelevantDocuments(prompt, 3);
    const result = await RAGService.generateContextAwareResponse(prompt, childInfo, documents);
    
    return {
      response: result.response,
      sources: result.sources
    };
  } catch (error) {
    console.error('Error in InvokeLLM:', error);
    return {
      response: "I'm having trouble accessing my knowledge base right now. Please try again in a moment.",
      sources: []
    };
  }
} 