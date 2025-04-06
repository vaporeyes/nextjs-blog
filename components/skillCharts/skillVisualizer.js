// components/SkillVisualizer.js
import { useState } from 'react';
import SkillRadar from './skillRadar';
import SkillTree from './skillTree';
import SkillBubbles from './skillBubbles';

const SkillVisualizer = () => {
  const [visualizationType, setVisualizationType] = useState('radar');

  return (
    <div className="my-8">
      <div className="flex items-center justify-center mb-6">
        <label htmlFor="visualization-type" className="mr-2 text-sm font-medium">
          Visualization:
        </label>
        <select
          id="visualization-type"
          value={visualizationType}
          onChange={(e) => setVisualizationType(e.target.value)}
          className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
        >
          <option value="radar">Radar Chart</option>
          <option value="tree">Skill Tree</option>
          <option value="bubbles">Interactive Bubbles</option>
        </select>
      </div>

      {visualizationType === 'radar' && <SkillRadar />}
      {visualizationType === 'tree' && <SkillTree />}
      {visualizationType === 'bubbles' && <SkillBubbles />}
    </div>
  );
};

export default SkillVisualizer;