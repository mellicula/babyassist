import React, { useState, useEffect } from 'react';
import { Child } from '../entities/Child.js';
import { User } from '../entities/User.js';
import { Card, CardContent } from '../components/ui/card.jsx';

export default function Milestones() {
  const [children, setChildren] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadChildren();
  }, []);

  const loadChildren = async () => {
    try {
      const userData = await User.me();
      const data = await Child.filter({ created_by: userData.email }, '-created_date');
      setChildren(data);
    } catch (error) {
      console.error('Error loading children:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-sm mx-auto p-4">
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="glass-effect rounded-3xl p-6 animate-pulse">
              <div className="h-5 bg-gray-200 rounded-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded-full w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-sm mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Milestones</h1>
        <p className="text-gray-600">Track your child's developmental progress</p>
      </div>

      {children.length === 0 ? (
        <Card>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No children added yet</p>
              <p className="text-sm text-gray-400">Add a child from the home page to start tracking milestones</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {children.map((child) => (
            <Card key={child.id}>
              <CardContent>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{child.name}</h3>
                <p className="text-gray-600 mb-4">Milestone tracking coming soon!</p>
                <div className="text-sm text-gray-500">
                  This will include age-appropriate milestone checklists and progress tracking.
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
