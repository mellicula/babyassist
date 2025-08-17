/**
 * Mock data storage for children
 * In a production environment, this would be replaced with a real database
 */
let childrenData = [];

/**
 * Child Entity Class
 * 
 * This class provides CRUD operations for child data management.
 * It simulates a database interface with in-memory storage for development purposes.
 * 
 * @class Child
 * @static
 */
export class Child {
  /**
   * Creates a new child record
   * 
   * @param {Object} childData - The child information to store
   * @param {string} childData.name - The child's name
   * @param {string} childData.birthday - The child's date of birth (ISO string)
   * @param {string} [childData.gender] - The child's gender (optional)
   * @param {string} [childData.photo_url] - URL to the child's photo (optional)
   * @returns {Promise<Object>} The newly created child object with generated ID and timestamps
   * 
   * @example
   * const newChild = await Child.create({
   *   name: "Baby Emma",
   *   birthday: "2024-01-15",
   *   gender: "female"
   * });
   */
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

  /**
   * Retrieves children based on filter criteria and sorting options
   * 
   * @param {Object} [filters={}] - Filter criteria for children
   * @param {string} [filters.created_by] - Filter by user who created the child
   * @param {string} [sort=''] - Sorting option ('-created_date' for newest first)
   * @returns {Promise<Array>} Array of filtered and sorted children
   * 
   * @example
   * // Get all children created by a specific user, sorted by creation date
   * const children = await Child.filter({ created_by: 'user@example.com' }, '-created_date');
   */
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

  /**
   * Retrieves a specific child by their unique identifier
   * 
   * @param {string} id - The unique identifier of the child
   * @returns {Promise<Object|null>} The child object if found, null otherwise
   * 
   * @example
   * const child = await Child.get('child-1234567890');
   */
  static async get(id) {
    return childrenData.find(child => child.id === id);
  }

  /**
   * Updates an existing child record with new information
   * 
   * @param {string} id - The unique identifier of the child to update
   * @param {Object} updates - Object containing the fields to update
   * @returns {Promise<Object|null>} The updated child object if successful, null if not found
   * 
   * @example
   * const updatedChild = await Child.update('child-1234567890', { 
   *   name: 'Emma Smith',
   *   photo_url: 'https://example.com/photo.jpg'
   * });
   */
  static async update(id, updates) {
    const index = childrenData.findIndex(child => child.id === id);
    if (index !== -1) {
      childrenData[index] = { ...childrenData[index], ...updates };
      return childrenData[index];
    }
    return null;
  }

  /**
   * Removes a child record from the system
   * 
   * @param {string} id - The unique identifier of the child to delete
   * @returns {Promise<boolean>} True if deletion was successful, false otherwise
   * 
   * @example
   * const success = await Child.delete('child-1234567890');
   */
  static async delete(id) {
    const index = childrenData.findIndex(child => child.id === id);
    if (index !== -1) {
      childrenData.splice(index, 1);
      return true;
    }
    return false;
  }
} 