// Mock data storage for chat messages
let chatMessagesData = [];

export class ChatMessage {
  static async create(messageData) {
    const newMessage = {
      id: `msg-${Date.now()}`,
      ...messageData,
      timestamp: new Date().toISOString()
    };
    chatMessagesData.push(newMessage);
    return newMessage;
  }

  static async filter(filters = {}, sort = '') {
    // Simple mock filtering
    let filtered = [...chatMessagesData];
    
    if (filters.child_id) {
      filtered = filtered.filter(msg => msg.child_id === filters.child_id);
    }
    
    if (filters.message_type) {
      filtered = filtered.filter(msg => msg.message_type === filters.message_type);
    }
    
    // Simple mock sorting
    if (sort === '-timestamp') {
      filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    }
    
    return filtered;
  }

  static async get(id) {
    return chatMessagesData.find(msg => msg.id === id);
  }

  static async update(id, updates) {
    const index = chatMessagesData.findIndex(msg => msg.id === id);
    if (index !== -1) {
      chatMessagesData[index] = { ...chatMessagesData[index], ...updates };
      return chatMessagesData[index];
    }
    return null;
  }

  static async delete(id) {
    const index = chatMessagesData.findIndex(msg => msg.id === id);
    if (index !== -1) {
      chatMessagesData.splice(index, 1);
      return true;
    }
    return false;
  }

  static async bulkCreate(messages) {
    const newMessages = messages.map((msg, index) => ({
      id: `msg-${Date.now()}-${index}`,
      ...msg,
      timestamp: new Date().toISOString()
    }));
    chatMessagesData.push(...newMessages);
    return newMessages;
  }
} 