'use client';

import { useCallback, useState } from 'react';
import { useDropzone, FileRejection, DropEvent } from 'react-dropzone'; // Assicurati di aver installato react-dropzone
import { UploadCloud, FileText, Check, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface DropCsvProps {
  onFileDrop?: (file: File) => void;
}

export function DropCsv({ onFileDrop }: DropCsvProps = {}) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);

  const handleFileDrop = async (file: File) => {
    if (onFileDrop) {
      onFileDrop(file);
      return;
    }

    // Default implementation if no callback is provided
    setUploading(true);
    
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Success simulation
    setUploading(false);
    setUploadComplete(true);
    toast.success('CSV file uploaded successfully!');
    
    // Reset after a few seconds
    setTimeout(() => {
      setUploadComplete(false);
    }, 3000);
  };

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[], event: DropEvent) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
          setFileName(file.name);
          handleFileDrop(file);
        } else {
          setFileName(null);
          toast.error('Invalid file type. Please upload a CSV file.');
        }
      } else if (fileRejections && fileRejections.length > 0) {
        setFileName(null);
        toast.error('File rejected. Ensure it is a CSV and not too large.');
      }
    },
    [onFileDrop]
  );

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    accept: { 'text/csv': ['.csv'] },
    multiple: false,
    maxSize: 5 * 1024 * 1024, // 5MB limit
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 md:p-12 text-center cursor-pointer transition-colors
        ${isDragAccept ? 'border-green-500 bg-green-500/10' : ''}
        ${isDragReject ? 'border-red-500 bg-red-500/10' : ''}
        ${!isDragActive ? 'border-gray-600 hover:border-gray-500' : ''}
        ${uploading ? 'border-cyan-500 bg-cyan-500/10 cursor-wait' : ''}
        ${uploadComplete ? 'border-green-500 bg-green-500/10' : ''}
      `}
    >
      <input {...getInputProps()} disabled={uploading} />
      
      {uploading ? (
        <div className="flex flex-col items-center text-cyan-400">
          <div className="mb-3 animate-pulse">
            <UploadCloud size={48} />
          </div>
          <p className="text-lg font-semibold">Uploading {fileName}...</p>
          <div className="mt-4 w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-cyan-500 animate-[progress_1.5s_ease-in-out_infinite]"></div>
          </div>
        </div>
      ) : uploadComplete ? (
        <div className="flex flex-col items-center text-green-400">
          <Check size={48} className="mb-3" />
          <p className="text-lg font-semibold">Upload Complete!</p>
          <p className="text-sm text-green-300 mt-1">{fileName}</p>
        </div>
      ) : fileName ? (
        <div className="flex flex-col items-center text-gray-200">
          <FileText size={48} className="mb-3 text-cyan-400" />
          <p className="font-semibold">{fileName}</p>
          <p className="text-sm text-gray-400">CSV file selected. Click or drag another file to replace.</p>
        </div>
      ) : isDragActive ? (
        isDragAccept ? (
          <div className="flex flex-col items-center text-green-400">
            <UploadCloud size={48} className="mb-3" />
            <p className="text-lg font-semibold">Drop the CSV file here!</p>
          </div>
        ) : (
          <div className="flex flex-col items-center text-red-400">
            <AlertCircle size={48} className="mb-3" />
            <p className="text-lg font-semibold">Invalid file type. Only CSV is accepted.</p>
          </div>
        )
      ) : (
        <div className="flex flex-col items-center text-gray-400">
          <UploadCloud size={48} className="mb-3" />
          <p className="text-lg font-semibold">
            Drag & drop your CSV file here, or click to select.
          </p>
          <p className="text-sm mt-2">Export your Twitter analytics data as CSV and upload it here.</p>
          <p className="text-sm mt-4">Max file size: 5MB</p>
        </div>
      )}
      
      <style jsx>{`
        @keyframes progress {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 0%; }
        }
      `}</style>
    </div>
  );
} 