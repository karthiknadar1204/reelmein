'use client';

import { useState, useEffect } from 'react';

export default function UploadFiles({ selectedScript }) {
  const [mediaFiles, setMediaFiles] = useState({
    images: [],
    videos: []
  });

  const MAX_IMAGES = 5;


  useEffect(() => {
    return () => {

      mediaFiles.images.forEach(media => URL.revokeObjectURL(media.preview));
      mediaFiles.videos.forEach(media => URL.revokeObjectURL(media.preview));
    };
  }, [mediaFiles]);

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    
    files.forEach(file => {
      const fileType = file.type.split('/')[0];
      

      if (fileType !== 'image' && fileType !== 'video') {
        alert('Only images and videos are allowed');
        return;
      }


      if (fileType === 'image' && mediaFiles.images.length >= MAX_IMAGES) {
        alert(`You can only upload up to ${MAX_IMAGES} images`);
        return;
      }

      const mediaObject = {
        file,
        preview: URL.createObjectURL(file),
        name: file.name,
        type: fileType,
        size: file.size
      };

      setMediaFiles(prev => ({
        ...prev,
        [fileType === 'image' ? 'images' : 'videos']: 
        [...prev[fileType === 'image' ? 'images' : 'videos'], mediaObject]
      }));
    });
  };

  const handleRemoveFile = (type, index) => {

    const fileToRemove = mediaFiles[type][index];
    URL.revokeObjectURL(fileToRemove.preview);

    setMediaFiles(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  const handleRemoveAll = (type) => {

    mediaFiles[type].forEach(media => URL.revokeObjectURL(media.preview));
    
    setMediaFiles(prev => ({
      ...prev,
      [type]: []
    }));
  };

  const getFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="mt-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4">Upload Media Files</h2>
        <p className="text-gray-500 mb-6">Upload images and videos for your script</p>

        {/* File Upload Area */}
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center mb-6">
          <input
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer flex flex-col items-center justify-center"
          >
            <svg
              className="w-12 h-12 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <span className="text-gray-600 dark:text-gray-300">
              Drag and drop files here or click to browse
            </span>
            <span className="text-sm text-gray-500 mt-2">
              Max {MAX_IMAGES} images allowed. Supported formats: JPG, PNG, MP4
            </span>
          </label>
        </div>

        {/* Uploaded Media Display */}
        <div className="space-y-8">
          {/* Images */}
          {mediaFiles.images.length > 0 && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Images ({mediaFiles.images.length}/{MAX_IMAGES})</h3>
                {mediaFiles.images.length > 0 && (
                  <button
                    onClick={() => handleRemoveAll('images')}
                    className="text-sm text-red-500 hover:text-red-600 flex items-center space-x-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <span>Remove All Images</span>
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {mediaFiles.images.map((media, index) => (
                  <div
                    key={index}
                    className="relative group bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden cursor-pointer"
                    onClick={() => handleRemoveFile('images', index)}
                  >
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="text-white text-center">
                        <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <span className="text-sm font-medium">Click to remove</span>
                      </div>
                    </div>
                    <img
                      src={media.preview}
                      alt={media.name}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-2">
                      <p className="text-sm text-gray-700 dark:text-gray-200 truncate">
                        {media.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {getFileSize(media.size)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Videos */}
          {mediaFiles.videos.length > 0 && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Videos</h3>
                {mediaFiles.videos.length > 0 && (
                  <button
                    onClick={() => handleRemoveAll('videos')}
                    className="text-sm text-red-500 hover:text-red-600 flex items-center space-x-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <span>Remove All Videos</span>
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mediaFiles.videos.map((media, index) => (
                  <div
                    key={index}
                    className="relative group bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden"
                  >
                    <video
                      src={media.preview}
                      className="w-full h-32 object-cover"
                      controls
                    />
                    <div className="p-2">
                      <p className="text-sm text-gray-700 dark:text-gray-200 truncate">
                        {media.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {getFileSize(media.size)}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemoveFile('videos', index)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Remove video"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 