
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { PromptInput } from './components/PromptInput';
import { StoryboardPanel } from './components/StoryboardPanel';
import { LoadingSpinner } from './components/LoadingSpinner';
import { Footer } from './components/Footer';
import type { StoryboardScene } from './types';
import { generateStoryboard } from './services/geminiService';
import { ErrorIcon } from './components/icons';

const App: React.FC = () => {
  const [scenes, setScenes] = useState<StoryboardScene[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async (prompt: string) => {
    if (!prompt) {
      setError('Please enter a story idea.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setScenes([]);

    try {
      const generatedScenes = await generateStoryboard(prompt);
      setScenes(generatedScenes);
    } catch (e) {
      console.error(e);
      setError('Failed to generate storyboard. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col font-sans">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center">
        <div className="w-full max-w-4xl">
          <p className="text-center text-gray-400 mb-8 text-lg">
            Describe your vision — a movie scene, a comic strip, a marketing video — and watch as AI brings it to life.
          </p>
          <PromptInput onGenerate={handleGenerate} isLoading={isLoading} />
          {error && (
            <div className="mt-6 p-4 bg-red-900/50 border border-red-700 text-red-300 rounded-lg flex items-center justify-center">
              <ErrorIcon />
              <span className="ml-2">{error}</span>
            </div>
          )}
          {isLoading && <LoadingSpinner />}
          {!isLoading && scenes.length > 0 && <StoryboardPanel scenes={scenes} />}
          {!isLoading && scenes.length === 0 && !error && (
             <div className="text-center text-gray-500 mt-20">
              <h2 className="text-2xl font-semibold mb-2">Your Storyboard Awaits</h2>
              <p>Enter an idea above to get started.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
