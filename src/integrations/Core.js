// Mock AI integration for development
export async function InvokeLLM({ prompt }) {
  // Simulate AI response delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return a mock response based on the prompt
  if (prompt.includes('welcome')) {
    return "Welcome to BabyAssistant! I'm here to help you track your child's development and provide parenting guidance. Let me know if you have any questions!";
  }
  
  if (prompt.includes('milestone')) {
    return "Great question about milestones! Every child develops at their own pace. I'd be happy to help you understand what to expect at different ages.";
  }
  
  return "Thank you for your question! I'm here to support you on your parenting journey. Feel free to ask me anything about child development, milestones, or parenting tips.";
} 