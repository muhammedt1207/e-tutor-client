import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const FileUpload = ({ acceptedFileTypes, onDrop }) => {
  const onDropHandler = useCallback(acceptedFiles => {
    onDrop(acceptedFiles);
  }, [onDrop]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: acceptedFileTypes.join(','),
    onDrop: onDropHandler,
  });

  return (
    <div
      {...getRootProps()}
      className="flex flex-col items-center justify-center w-64 h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-100 transition duration-200"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-12 h-12 text-gray-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <p className="mt-2 text-gray-400">Drag and drop files here or click to select files</p>
        </>
      )}
    </div>
  );
};

const Sample = () => {
  const onDrop = acceptedFiles => {
    // Handle the dropped files here
    console.log(acceptedFiles);
  };

  return (
    <div className="p-8 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Add documents</h1>
      <p className="mb-4">Upload files in formats jpg, png and pdf:</p>
      <ul className="list-disc list-inside mb-4">
        <li>
          <FileUpload
            acceptedFileTypes={['.jpg', '.png', '.pdf']}
            onDrop={onDrop}
          />
          <span className="ml-2">Passport/National ID</span>
        </li>
        <li>
          <FileUpload
            acceptedFileTypes={['.jpg', '.png', '.pdf']}
            onDrop={onDrop}
          />
          <span className="ml-2">School Transcript</span>
        </li>
      </ul>
      <p className="mb-4">This step is mandatory to become a tutor</p>
    </div>
  );
};

export default Sample;