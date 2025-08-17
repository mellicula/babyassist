import React from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { MessageCircle, Calendar, Baby } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils.js";
import { format } from "date-fns";

export default function ChildCard({ child, age }) {
  const getInitial = (name) => name.charAt(0).toUpperCase();
  
  const gradients = [
    "from-rose-400 to-pink-400",
    "from-blue-400 to-indigo-400", 
    "from-green-400 to-emerald-400",
    "from-purple-400 to-violet-400",
    "from-amber-400 to-orange-400"
  ];
  
  const gradientIndex = child.name.length % gradients.length;

  return (
    <Card className="glass-effect border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${gradients[gradientIndex]} flex items-center justify-center shadow-lg`}>
            {child.photo_url ? (
              <img 
                src={child.photo_url} 
                alt={child.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-2xl font-bold text-white">
                {getInitial(child.name)}
              </span>
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-800">{child.name}</h3>
            <p className="text-gray-600 flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {age}
            </p>
            <p className="text-xs text-gray-500">
              Born {format(new Date(child.birthday), 'MMM dd, yyyy')}
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <Link 
            to={`/chat?child=${child.id}`}
            className="w-full"
            onClick={() => console.log('Navigating to chat with child:', child.id)}
          >
            <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-full py-3 font-medium">
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat with AI Assistant
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
