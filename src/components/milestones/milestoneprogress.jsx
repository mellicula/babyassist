import React from 'react';
import { TrendingUp } from 'lucide-react';

export default function MilestoneProgress({ milestones }) {
  const totalMilestones = milestones.length;
  const achievedMilestones = milestones.filter(m => m.achieved).length;
  const progressPercentage = totalMilestones > 0 ? (achievedMilestones / totalMilestones) * 100 : 0;

  return (
    <div className="glass-effect rounded-3xl p-4 mb-6">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">Progress Overview</h3>
          <p className="text-sm text-gray-600">
            {achievedMilestones} of {totalMilestones} milestones achieved
          </p>
        </div>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-green-400 to-emerald-400 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      
      <p className="text-xs text-gray-500 mt-2 text-center">
        {Math.round(progressPercentage)}% complete
      </p>
    </div>
  );
}
