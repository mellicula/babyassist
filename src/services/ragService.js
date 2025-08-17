// RAG (Retrieval-Augmented Generation) Service
// This simulates document storage and retrieval for parenting knowledge

// Mock document database - in a real app, this would be a vector database like ChromaDB
const DOCUMENTS = [
  {
    id: 'doc-1',
    title: 'Developmental Milestones: 0-12 Months',
    content: 'Babies develop at their own pace, but here are general milestones to expect: 0-3 months: Lifts head when on tummy, follows moving objects with eyes, smiles responsively. 4-6 months: Rolls over, sits with support, reaches for objects. 7-9 months: Sits without support, crawls, babbles. 10-12 months: Pulls to standing, says first words, walks with support.',
    url: 'https://www.cdc.gov/ncbddd/actearly/milestones/index.html',
    category: 'development'
  },
  {
    id: 'doc-2',
    title: 'Safe Sleep Guidelines',
    content: 'Always place babies on their back to sleep. Use a firm, flat sleep surface. Keep soft objects and loose bedding out of the sleep area. Share your room, not your bed. Avoid overheating. Never smoke around your baby.',
    url: 'https://www.cdc.gov/sids/about/safe-sleep-for-babies.htm',
    category: 'sleep'
  },
  {
    id: 'doc-3',
    title: 'Feeding Guidelines: 0-6 Months',
    content: 'Breast milk or formula provides all the nutrition your baby needs for the first 6 months. Feed on demand, typically 8-12 times per day. Watch for hunger cues like rooting, sucking on hands, or crying. Consult your pediatrician about feeding concerns.',
    url: 'https://www.cdc.gov/nutrition/infantandtoddlernutrition/babies.html',
    category: 'feeding'
  },
  {
    id: 'doc-4',
    title: 'Baby-Proofing Your Home',
    content: 'Install safety gates at stairs and doorways. Cover electrical outlets. Secure furniture to walls. Keep small objects out of reach. Use cabinet locks. Install window guards. Keep cleaning products locked away. Set water heater to 120°F or lower.',
    url: 'https://www.safekids.org/baby-proofing',
    category: 'safety'
  },
  {
    id: 'doc-5',
    title: 'Language Development: Birth to 3 Years',
    content: 'Language development begins at birth. 0-3 months: Coos and makes pleasure sounds. 4-6 months: Babbles with different sounds. 7-12 months: Says first words, understands simple commands. 12-18 months: Uses 5-20 words, follows simple directions. 18-24 months: Uses 2-word phrases, asks simple questions.',
    url: 'https://www.asha.org/public/speech/development/speech-and-language/',
    category: 'language'
  },
  {
    id: 'doc-6',
    title: 'When to Call the Doctor',
    content: 'Call your pediatrician if your baby: Has a fever over 100.4°F (under 3 months) or 102.2°F (3-6 months), refuses to eat, has persistent crying, shows signs of dehydration, has difficulty breathing, has a rash with fever, or if you have any concerns about your baby\'s health or development.',
    url: 'https://www.healthychildren.org/English/health-issues/conditions/fever/Pages/When-to-Call-the-Pediatrician.aspx',
    category: 'health'
  }
];

// Simple keyword matching for document retrieval
function calculateRelevance(query, document) {
  const queryWords = query.toLowerCase().split(' ');
  const docText = (document.title + ' ' + document.content).toLowerCase();
  
  let score = 0;
  queryWords.forEach(word => {
    if (docText.includes(word)) {
      score += 1;
    }
  });
  
  return score;
}

export class RAGService {
  static async retrieveRelevantDocuments(query, limit = 3) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Calculate relevance scores for all documents
    const scoredDocs = DOCUMENTS.map(doc => ({
      ...doc,
      relevance: calculateRelevance(query, doc)
    }));
    
    // Sort by relevance and return top results
    return scoredDocs
      .filter(doc => doc.relevance > 0)
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, limit);
  }
  
  static async generateContextAwareResponse(query, childInfo, documents) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    if (documents.length === 0) {
      return {
        response: "I don't have specific information about that topic yet, but I'd be happy to help with general parenting questions about milestones, sleep, feeding, safety, or health concerns.",
        sources: []
      };
    }
    
    // Create context from retrieved documents
    const context = documents.map(doc => 
      `${doc.title}\n${doc.content}`
    ).join('\n\n');
    
    // Generate response based on context
    const response = this.generateResponseFromContext(query, childInfo, context);
    
    // Format sources
    const sources = documents.map(doc => ({
      title: doc.title,
      url: doc.url,
      excerpt: doc.content.substring(0, 150) + '...'
    }));
    
    return { response, sources };
  }
  
  static generateResponseFromContext(query, childInfo, context) {
    const lowerQuery = query.toLowerCase();
    const childName = childInfo?.name || 'your child';
    
    // Simple rule-based response generation based on context
    if (lowerQuery.includes('milestone') || lowerQuery.includes('development')) {
      return `Based on the developmental guidelines, ${childName} should be reaching age-appropriate milestones. Remember that every child develops at their own pace. If you have concerns about ${childName}'s development, consult your pediatrician.`;
    }
    
    if (lowerQuery.includes('sleep') || lowerQuery.includes('bedtime')) {
      return `For safe sleep, always place ${childName} on their back to sleep on a firm, flat surface. Keep the sleep area free of soft objects and loose bedding. Room sharing (but not bed sharing) is recommended for the first 6-12 months.`;
    }
    
    if (lowerQuery.includes('feed') || lowerQuery.includes('food') || lowerQuery.includes('eating')) {
      return `For feeding, breast milk or formula provides complete nutrition for the first 6 months. Feed ${childName} on demand and watch for hunger cues. Always consult your pediatrician about feeding concerns.`;
    }
    
    if (lowerQuery.includes('safe') || lowerQuery.includes('safety')) {
      return `To keep ${childName} safe, baby-proof your home by installing safety gates, covering electrical outlets, securing furniture, and keeping small objects out of reach. Never leave ${childName} unattended.`;
    }
    
    if (lowerQuery.includes('doctor') || lowerQuery.includes('health') || lowerQuery.includes('sick')) {
      return `Call your pediatrician if ${childName} has a fever over 100.4°F (under 3 months), refuses to eat, shows signs of dehydration, has difficulty breathing, or if you have any concerns about their health.`;
    }
    
    // Default response
    return `I found some relevant information that might help. Based on the guidelines, ${childName} should follow age-appropriate patterns for development, sleep, feeding, and safety. Always consult your pediatrician for specific medical advice.`;
  }
  
  // Method to add new documents (for future expansion)
  static async addDocument(document) {
    // In a real implementation, this would add to the vector database
    console.log('Adding document:', document.title);
    return { success: true, id: `doc-${Date.now()}` };
  }
  
  // Method to search documents by category
  static async searchByCategory(category) {
    return DOCUMENTS.filter(doc => doc.category === category);
  }
} 