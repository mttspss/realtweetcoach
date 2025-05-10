'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, AlertCircle, X, Check } from 'lucide-react';
import { Button } from './Button';

type FileUploadStatus = 'idle' | 'hover' | 'uploading' | 'success' | 'error';

interface FileUploadProps {
  onFilesAdded: (files: File[]) => void;
  acceptedFileTypes?: string;
  maxFiles?: number;
  maxSizeMB?: number;
  title?: string;
  description?: string;
  className?: string;
}

export function FileUpload({
  onFilesAdded,
  acceptedFileTypes = '.csv',
  maxFiles = 1,
  maxSizeMB = 10,
  title = 'Upload your CSV file',
  description = 'Drag and drop your file here, or click to browse',
  className = '',
}: FileUploadProps) {
  const [uploadStatus, setUploadStatus] = useState<FileUploadStatus>('idle');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  
  const inputRef = useRef<HTMLInputElement>(null);
  
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setUploadStatus('hover');
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setUploadStatus('idle');
  };
  
  const validateFiles = (files: File[]): boolean => {
    // Check number of files
    if (files.length > maxFiles) {
      setErrorMessage(`You can only upload ${maxFiles} file${maxFiles > 1 ? 's' : ''} at a time.`);
      return false;
    }
    
    // Check file types and sizes
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Check file size
      if (file.size > maxSizeBytes) {
        setErrorMessage(`File "${file.name}" exceeds the ${maxSizeMB}MB size limit.`);
        return false;
      }
      
      // Check file type if acceptedFileTypes is specified
      if (acceptedFileTypes && !file.name.toLowerCase().endsWith(acceptedFileTypes)) {
        setErrorMessage(`File "${file.name}" is not a supported file type. Please upload a ${acceptedFileTypes} file.`);
        return false;
      }
    }
    
    return true;
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const fileArray = Array.from(e.dataTransfer.files);
      
      if (validateFiles(fileArray)) {
        setSelectedFiles(fileArray);
        setUploadStatus('success');
        onFilesAdded(fileArray);
      } else {
        setUploadStatus('error');
      }
    }
  };
  
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileArray = Array.from(e.target.files);
      
      if (validateFiles(fileArray)) {
        setSelectedFiles(fileArray);
        setUploadStatus('success');
        onFilesAdded(fileArray);
      } else {
        setUploadStatus('error');
      }
    }
  };
  
  const handleRemoveFile = (index: number) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
    
    if (newFiles.length === 0) {
      setUploadStatus('idle');
    }
  };
  
  const handleRetry = () => {
    setSelectedFiles([]);
    setErrorMessage('');
    setUploadStatus('idle');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };
  
  // Determine background and border colors based on status
  const getStylesForStatus = (): string => {
    switch (uploadStatus) {
      case 'hover':
        return 'border-accent/80 bg-accent/5';
      case 'success':
        return 'border-green-500/30 bg-green-500/5';
      case 'error':
        return 'border-red-500/30 bg-red-500/5';
      default:
        return 'border-card-border/50 bg-card/20 hover:border-card-border/80 hover:bg-card/30';
    }
  };
  
  // Determine the icon to show based on status
  const getIconForStatus = () => {
    switch (uploadStatus) {
      case 'success':
        return <Check className="w-8 h-8 text-green-400" />;
      case 'error':
        return <AlertCircle className="w-8 h-8 text-red-400" />;
      default:
        return <UploadCloud className="w-8 h-8 text-accent/70" />;
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Upload area */}
      <div
        className={`relative border-2 border-dashed ${getStylesForStatus()} rounded-xl p-6 transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer backdrop-blur-sm`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        {/* Hidden file input */}
        <input
          ref={inputRef}
          type="file"
          multiple={maxFiles > 1}
          accept={acceptedFileTypes}
          className="hidden"
          onChange={handleFileInputChange}
        />
        
        {/* Icon and text */}
        <div className="mb-4">
          {getIconForStatus()}
        </div>
        
        {uploadStatus === 'error' ? (
          <>
            <h3 className="text-base font-medium text-white mb-1">Upload Failed</h3>
            <p className="text-sm text-red-400 mb-4">{errorMessage}</p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleRetry();
              }}
            >
              Try Again
            </Button>
          </>
        ) : uploadStatus === 'success' ? (
          <>
            <h3 className="text-base font-medium text-white mb-1">Upload Successful</h3>
            <p className="text-sm text-primary-darker">Your file has been uploaded successfully</p>
          </>
        ) : (
          <>
            <h3 className="text-base font-medium text-white mb-1">{title}</h3>
            <p className="text-sm text-primary-darker">{description}</p>
            <p className="text-xs text-primary-darker/80 mt-2">
              {acceptedFileTypes} files up to {maxSizeMB}MB
            </p>
          </>
        )}
      </div>
      
      {/* File list */}
      {selectedFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          {selectedFiles.map((file, index) => (
            <div 
              key={`${file.name}-${index}`}
              className="flex items-center justify-between p-3 rounded-lg border border-card-border/30 bg-card/20"
            >
              <div className="flex items-center">
                <FileText className="w-4 h-4 text-primary-darker mr-2" />
                <div>
                  <p className="text-sm font-medium text-white">{file.name}</p>
                  <p className="text-xs text-primary-darker">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <button
                className="p-1 rounded-full hover:bg-card/70 text-primary-darker hover:text-white transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFile(index);
                }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 