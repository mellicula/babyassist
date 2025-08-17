
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Child } from '../entities/Child';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function Chat() {
  const [searchParams] = useSearchParams();
  const [child, setChild] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const childId = searchParams.get('child');

  useEffect(() => {
    if (childId) {
      loadChild();
    }
  }, [childId]);

  const loadChild = async () => {
    try {
      console.log('Loading child with ID:', childId);
      const childData = await Child.get(childId);
      console.log('Child data loaded:', childData);
      setChild(childData);
    } catch (error) {
      console.error('Error loading child:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-sm mx-auto p-4">
        <div className="glass-effect rounded-3xl p-6 animate-pulse">
          <div className="h-6 bg-gray-200 rounded-full mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-4 bg-gray-200 rounded-full"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!child) {
    return (
      <div className="max-w-sm mx-auto p-4">
        <div className="glass-effect rounded-3xl p-6 text-center">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Child Not Found</h2>
          <p className="text-gray-600">The specified child could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-sm mx-auto p-4">
      {/* Header with back button */}
      <div className="flex items-center gap-3 mb-4">
        <Link to="/">
          <Button variant="outline" size="sm" className="rounded-full">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <h1 className="text-lg font-bold text-gray-800">Chat</h1>
      </div>
      
      <div className="glass-effect rounded-3xl p-6 mb-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Chat with {child.name}</h2>
        <p className="text-gray-600">Ask me anything about {child.name}'s development!</p>
      </div>
      
      <div className="glass-effect rounded-3xl p-6">
        <div className="text-center text-gray-500">
          <p>Chat functionality coming soon!</p>
          <p className="text-sm mt-2">This will include AI-powered parenting advice and milestone tracking.</p>
        </div>
      </div>
    </div>
  );
}

