export class User {
  static async me() {
    // Mock user data for development
    return {
      id: 'user-1',
      email: 'parent@example.com',
      name: 'Parent User',
      created_date: new Date().toISOString()
    };
  }
} 