/**
 * RAG Service for Baby Assistant
 * 
 * This service provides Retrieval-Augmented Generation capabilities by:
 * 1. Storing parenting documents in Supabase
 * 2. Retrieving relevant documents based on user queries
 * 3. Enhancing AI responses with context from authoritative sources
 * 
 * @service
 * @description Supabase-powered RAG system for parenting advice
 */

import { createClient } from '@supabase/supabase-js';

/**
 * Supabase client configuration
 * 
 * IMPORTANT: Store these in your .env file:
 * VITE_SUPABASE_URL=your-supabase-url
 * VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
 */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. RAG functionality will be limited.');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Document structure for parenting resources
 */
const DOCUMENT_SOURCES = [
  {
    title: "Baby Development 0-3 Months",
    url: "https://www.qld.gov.au/health/condition/child-health/babies-and-toddlers/how-your-baby-develops-from-0-to-3-months",
    category: "development",
    age_range: "0-3 months"
  },
  {
    title: "Baby Development 3-6 Months", 
    url: "https://www.qld.gov.au/health/condition/child-health/babies-and-toddlers/how-your-baby-develops-3-6-months",
    category: "development",
    age_range: "3-6 months"
  },
  {
    title: "Baby Development 6-9 Months",
    url: "https://www.qld.gov.au/health/condition/child-health/babies-and-toddlers/how-your-baby-develops-6-9-months", 
    category: "development",
    age_range: "6-9 months"
  },
  {
    title: "Baby Development 9-12 Months",
    url: "https://www.qld.gov.au/health/condition/child-health/babies-and-toddlers/how-your-baby-develops-9-12-months",
    category: "development", 
    age_range: "9-12 months"
  },
  {
    title: "Teething Guide",
    url: "https://www.qld.gov.au/health/condition/child-health/babies-and-toddlers/teething",
    category: "health",
    age_range: "3+ months"
  },
  {
    title: "Breastfeeding Support",
    url: "https://www.health.nsw.gov.au/kidsfamilies/MCFhealth/child/Pages/breastfeeding.aspx",
    category: "feeding",
    age_range: "0+ months"
  },
  {
    title: "Immunization Schedule",
    url: "https://www.health.gov.au/topics/immunisation/when-to-get-vaccinated/immunisation-for-infants-and-children",
    category: "health",
    age_range: "0+ months"
  }
];

/**
 * Retrieves relevant documents based on user query and child context
 * 
 * @async
 * @function retrieveRelevantDocuments
 * @param {string} query - User's question or query
 * @param {Object} childInfo - Information about the child (age, etc.)
 * @param {number} [limit=3] - Maximum number of documents to retrieve
 * @returns {Promise<Array>} Array of relevant documents with metadata
 * 
 * @example
 * const docs = await retrieveRelevantDocuments(
 *   "How can I help my baby sleep better?",
 *   { age: "6 months" }
 * );
 */
export async function retrieveRelevantDocuments(query, childInfo = null, limit = 3) {
  try {
    // For now, we'll use a simple keyword-based approach
    // In production, you'd implement semantic search with embeddings
    
    const relevantDocs = DOCUMENT_SOURCES.filter(doc => {
      const queryLower = query.toLowerCase();
      const titleLower = doc.title.toLowerCase();
      
      // Check if query keywords match document title or category
      const keywords = queryLower.split(' ');
      return keywords.some(keyword => 
        titleLower.includes(keyword) || 
        doc.category.includes(keyword) ||
        doc.age_range.includes(keyword)
      );
    });

    // If no exact matches, return general development docs
    if (relevantDocs.length === 0 && childInfo) {
      const childAge = calculateAgeInMonths(childInfo.birthday);
      return DOCUMENT_SOURCES.filter(doc => 
        doc.category === 'development' && 
        isAgeRelevant(doc.age_range, childAge)
      ).slice(0, limit);
    }

    return relevantDocs.slice(0, limit);

  } catch (error) {
    console.error('Error retrieving documents:', error);
    return [];
  }
}

/**
 * Generates a context-aware response using retrieved documents
 * 
 * @async
 * @function generateContextAwareResponse
 * @param {string} query - User's question
 * @param {Object} childInfo - Information about the child
 * @param {Array} documents - Retrieved relevant documents
 * @returns {Promise<Object>} AI response with context and sources
 * 
 * @example
 * const response = await generateContextAwareResponse(
 *   "Sleep training tips",
 *   { name: "Emma", age: "6 months" },
 *   relevantDocs
 * );
 */
export async function generateContextAwareResponse(query, childInfo, documents) {
  try {
    // Create context from retrieved documents
    const context = documents.map(doc => 
      `Source: ${doc.title}\nURL: ${doc.url}\nAge Range: ${doc.age_range}\nCategory: ${doc.category}`
    ).join('\n\n');

    // Create enhanced prompt with context
    const enhancedPrompt = `
Based on the following authoritative parenting resources, please answer this question: "${query}"

Context about the child: ${childInfo ? `${childInfo.name} is ${calculateAgeInMonths(childInfo.birthday)} months old` : 'No specific child information provided'}

Relevant resources:
${context}

IMPORTANT: Provide a CONCISE, focused answer (2-3 sentences maximum). Only elaborate if specifically asked. Include 2-3 relevant follow-up questions that the parent might want to ask next. Format your response as:

Answer: [brief, focused response]

Follow-up questions:
• [question 1]
• [question 2] 
• [question 3]

Keep it short and actionable. Avoid overwhelming with too much information.
`;

    // This would be sent to your AI service
    return {
      prompt: enhancedPrompt,
      sources: documents,
      context: context
    };

  } catch (error) {
    console.error('Error generating context-aware response:', error);
    return {
      prompt: query,
      sources: [],
      context: ''
    };
  }
}

/**
 * Stores a new document in Supabase (for admin use)
 * 
 * @async
 * @function storeDocument
 * @param {Object} document - Document to store
 * @param {string} document.title - Document title
 * @param {string} document.url - Source URL
 * @param {string} document.content - Document content
 * @param {string} document.category - Document category
 * @param {string} document.age_range - Relevant age range
 * @returns {Promise<Object>} Stored document with ID
 */
export async function storeDocument(document) {
  try {
    const { data, error } = await supabase
      .from('documents')
      .insert([{
        title: document.title,
        url: document.url,
        content: document.content,
        category: document.category,
        age_range: document.age_range,
        created_at: new Date().toISOString()
      }])
      .select();

    if (error) throw error;
    return data[0];

  } catch (error) {
    console.error('Error storing document:', error);
    throw error;
  }
}

/**
 * Retrieves documents by category and age range
 * 
 * @async
 * @function getDocumentsByCategory
 * @param {string} category - Document category to filter by
 * @param {string} ageRange - Age range to filter by
 * @returns {Promise<Array>} Array of matching documents
 */
export async function getDocumentsByCategory(category, ageRange = null) {
  try {
    let query = supabase
      .from('documents')
      .select('*')
      .eq('category', category);

    if (ageRange) {
      query = query.eq('age_range', ageRange);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];

  } catch (error) {
    console.error('Error retrieving documents by category:', error);
    return [];
  }
}

/**
 * Helper function to calculate age in months
 * 
 * @function calculateAgeInMonths
 * @param {string} birthday - Child's birthday (ISO string)
 * @returns {number} Age in months
 */
function calculateAgeInMonths(birthday) {
  const birthDate = new Date(birthday);
  const now = new Date();
  const months = (now.getFullYear() - birthDate.getFullYear()) * 12 + 
                (now.getMonth() - birthDate.getMonth());
  return Math.max(0, months);
}

/**
 * Helper function to check if age range is relevant
 * 
 * @function isAgeRelevant
 * @param {string} ageRange - Document age range (e.g., "6-9 months")
 * @param {number} childAge - Child's age in months
 * @returns {boolean} Whether the age range is relevant
 */
function isAgeRelevant(ageRange, childAge) {
  if (!ageRange || ageRange === '0+ months') return true;
  
  const range = ageRange.match(/(\d+)-(\d+)\s*months?/);
  if (range) {
    const min = parseInt(range[1]);
    const max = parseInt(range[2]);
    return childAge >= min && childAge <= max;
  }
  
  const single = ageRange.match(/(\d+)\+\s*months?/);
  if (single) {
    const min = parseInt(single[1]);
    return childAge >= min;
  }
  
  return false;
} 