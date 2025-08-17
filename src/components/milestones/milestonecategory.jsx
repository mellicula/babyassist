import React from 'react';

export default function MilestoneCategory({ category, milestones, childAge, onToggle }) {
  const categoryNames = {
    physical: 'Physical Development',
    cognitive: 'Cognitive Development',
    language: 'Language Development',
    social: 'Social Development',
    emotional: 'Emotional Development'
  };

  const categoryColors = {
    physical: 'from-blue-400 to-indigo-400',
    cognitive: 'from-green-400 to-emerald-400',
    language: 'from-purple-400 to-violet-400',
    social: 'from-amber-400 to-orange-400',
    emotional: 'from-rose-400 to-pink-400'
  };

  return (
    <div className="space-y-3">
      <h3 className={`text-lg font-semibold bg-gradient-to-r ${categoryColors[category]} bg-clip-text text-transparent`}>
        {categoryNames[category]}
      </h3>
      <div className="space-y-2">
        {milestones.map((milestone) => (
          <div key={milestone.id} className="flex items-center gap-3 p-3 glass-effect rounded-2xl">
            <input
              type="checkbox"
              checked={milestone.achieved}
              onChange={(e) => onToggle(milestone.id, e.target.checked)}
              className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
            />
            <div className="flex-1">
              <p className={`text-sm ${milestone.achieved ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                {milestone.title}
              </p>
              <p className="text-xs text-gray-500">
                Typically achieved around {milestone.typical_age_months} months
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
