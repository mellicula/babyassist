// Mock data storage
let childrenData = [];

export class Child {
  static async create(childData) {
    const newChild = {
      id: `child-${Date.now()}`,
      ...childData,
      created_by: 'parent@example.com', // Add the user email
      created_date: new Date().toISOString()
    };
    childrenData.push(newChild);
    console.log('Child created:', newChild);
    console.log('All children:', childrenData);
    return newChild;
  }

  static async filter(filters = {}, sort = '') {
    // Simple mock filtering
    let filtered = [...childrenData];
    
    if (filters.created_by) {
      filtered = filtered.filter(child => child.created_by === filters.created_by);
    }
    
    // Simple mock sorting
    if (sort === '-created_date') {
      filtered.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
    }
    
    return filtered;
  }

  static async get(id) {
    return childrenData.find(child => child.id === id);
  }

  static async update(id, updates) {
    const index = childrenData.findIndex(child => child.id === id);
    if (index !== -1) {
      childrenData[index] = { ...childrenData[index], ...updates };
      return childrenData[index];
    }
    return null;
  }

  static async delete(id) {
    const index = childrenData.findIndex(child => child.id === id);
    if (index !== -1) {
      childrenData.splice(index, 1);
      return true;
    }
    return false;
  }
} 