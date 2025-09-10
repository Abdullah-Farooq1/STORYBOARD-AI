
import React from 'react';
import type { StoryboardScene } from '../types';
import { CameraIcon, PenIcon } from './icons';

interface SceneCardProps {
  scene: StoryboardScene;
}

export const SceneCard: React.FC<SceneCardProps> = ({ scene }) => {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:border-cyan-500/50 hover:shadow-cyan-500/10">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-cyan-400">Scene {scene.scene_number}: {scene.title}</h3>
          <span className="text-xs font-mono bg-gray-700 text-gray-300 px-2 py-1 rounded">
            SCENE_{String(scene.scene_number).padStart(2, '0')}
          </span>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="flex items-center text-gray-400 mb-2">
              <PenIcon />
              <h4 className="ml-2 font-semibold uppercase tracking-wider text-sm">Action & Description</h4>
            </div>
            <p className="text-gray-300 leading-relaxed">{scene.description}</p>
          </div>
          
          <div className="border-t border-gray-700 pt-4">
            <div className="flex items-center text-gray-400 mb-2">
              <CameraIcon />
              <h4 className="ml-2 font-semibold uppercase tracking-wider text-sm">Visual Suggestion</h4>
            </div>
            <p className="text-gray-300 leading-relaxed italic">{scene.visual_suggestion}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
