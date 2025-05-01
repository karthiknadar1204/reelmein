'use client';

import { useState } from 'react';
import UploadFiles from './upload-files';

export default function Scripts({ video }) {
  const [selectedScript, setSelectedScript] = useState(video.scriptVariant[0]);

  const handleScriptSelect = (script) => {
    setSelectedScript(script);
    console.log('Selected Script ID:', script.scriptId);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{video.topic}</h1>
        <p className="text-gray-500">Select a script variant to proceed</p>
      </div>

      {/* Main Script Display */}
      <div className="mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Selected Script</h2>
          {selectedScript ? (
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                {selectedScript.content}
              </p>
              <div className="mt-4 text-sm text-gray-500">
                Duration: {selectedScript.duration}
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Select a script variant</p>
          )}
        </div>
      </div>

      {/* Script Variants */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {video.scriptVariant.map((script) => (
          <div
            key={script.scriptId}
            onClick={() => handleScriptSelect(script)}
            className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 transition-all cursor-pointer hover:shadow-xl ${
              selectedScript?.scriptId === script.scriptId
                ? 'border-blue-500 dark:border-blue-400'
                : 'border-gray-200 dark:border-gray-700'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Script {script.scriptId}</h2>
              {selectedScript?.scriptId === script.scriptId && (
                <span className="text-blue-500 dark:text-blue-400">✓ Selected</span>
              )}
            </div>
            <p className="text-gray-600 dark:text-gray-300 line-clamp-4">
              {script.content}
            </p>
            <div className="mt-4 text-sm text-gray-500">
              Duration: {script.duration}
            </div>
          </div>
        ))}
      </div>

      {/* Upload Files Component */}
      {selectedScript && <UploadFiles selectedScript={selectedScript} />}
    </div>
  );
} 