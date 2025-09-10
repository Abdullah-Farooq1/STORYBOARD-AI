
import React from 'react';
import type { StoryboardScene } from '../types';
import { SceneCard } from './SceneCard';

interface StoryboardPanelProps {
  scenes: StoryboardScene[];
}

export const StoryboardPanel: React.FC<StoryboardPanelProps> = ({ scenes }) => {
  return (
    <div className="mt-12 w-full">
      <h2 className="text-3xl font-bold text-center mb-8 text-white">Your Generated Storyboard</h2>
      <div className="space-y-6">
        {scenes.map((scene) => (
          <SceneCard key={scene.scene_number} scene={scene} />
        ))}
      </div>
    </div>
  );
};
