
import React from 'react';
import { FilmIcon } from './icons';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-3">
          <FilmIcon />
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Storyboard <span className="text-cyan-400">AI</span>
          </h1>
        </div>
      </div>
    </header>
  );
};
