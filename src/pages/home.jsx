import React, { useState, useEffect } from "react";
import { Child } from "../entities/Child";
import { User } from "../entities/User";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Plus, Baby, Calendar, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils.js";
import { format, differenceInMonths, differenceInDays } from "date-fns";
import AddChildDialog from "../components/home/addchilddialog";
import ChildCard from "../components/home/childcard";
import ProactiveMessaging from "../components/home/proactivemessaging";

export default function Home() {
  const [children, setChildren] = useState([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadUserAndChildren();
  }, []);

  const loadUserAndChildren = async () => {
    try {
      const userData = await User.me();
      setUser(userData);
      
      // Only load children created by the current user
      const data = await Child.filter({ created_by: userData.email }, '-created_date');
      setChildren(data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddChild = async (childData) => {
    try {
      console.log('Adding child with data:', childData);
      const newChild = await Child.create(childData);
      console.log('Child created:', newChild);
      await loadUserAndChildren();
      setShowAddDialog(false);
      
      // For now, just stay on the home page instead of redirecting
      // The child will appear in the list
    } catch (error) {
      console.error('Error adding child:', error);
    }
  };

  const calculateAge = (birthday) => {
    const birthDate = new Date(birthday);
    const now = new Date();
    const months = differenceInMonths(now, birthDate);
    const days = differenceInDays(now, birthDate) % 30;
    
    if (months < 1) {
      return `${days} days old`;
    } else if (months < 12) {
      return `${months} month${months > 1 ? 's' : ''} old`;
    } else {
      const years = Math.floor(months / 12);
      const remainingMonths = months % 12;
      return `${years} year${years > 1 ? 's' : ''}${remainingMonths > 0 ? ` ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}` : ''} old`;
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-sm mx-auto p-4">
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="glass-effect rounded-3xl p-6 animate-pulse">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-5 bg-gray-200 rounded-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded-full w-2/3"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-sm mx-auto p-4">
      {/* Proactive Messaging Component */}
      <ProactiveMessaging children={children} />
      
      {/* Welcome Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Welcome back! 👋
        </h2>
        <p className="text-gray-600">
          {children.length === 0 
            ? "Let's add your first child to get started"
            : `Track ${children.length > 1 ? 'your children\'s' : 'your child\'s'} development journey`
          }
        </p>
      </div>

      {/* Children List */}
      <div className="space-y-4 mb-6">
        {children.map((child) => (
          <ChildCard 
            key={child.id} 
            child={child} 
            age={calculateAge(child.birthday)}
          />
        ))}
        
        {children.length === 0 && (
          <Card className="glass-effect border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-rose-100 to-pink-100 flex items-center justify-center">
                <Baby className="w-10 h-10 text-rose-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                No children added yet
              </h3>
              <p className="text-gray-600 mb-6">
                Add your child to start getting personalized development insights and AI guidance
              </p>
              <Button 
                onClick={() => setShowAddDialog(true)}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-full px-8 py-3 font-medium"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Your First Child
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Add Child Button */}
      {children.length > 0 && (
        <div className="flex justify-center">
          <Button
            onClick={() => setShowAddDialog(true)}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-full px-8 py-4 font-medium shadow-lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Another Child
          </Button>
        </div>
      )}

      <AddChildDialog 
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onAddChild={handleAddChild}
      />
    </div>
  );
}
