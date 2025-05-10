'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FileUpload } from '@/components/FileUpload';
import { Button } from '@/components/Button';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Upload, AlertCircle } from 'lucide-react';

export default function UploadPage() {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);
  
  const handleFilesAdded = (newFiles: File[]) => {
    setFiles(newFiles);
    setUploadError('');
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (files.length === 0) {
      setUploadError('Please select a file to upload.');
      return;
    }
    
    setIsUploading(true);
    setUploadError('');
    
    try {
      // In a real application, you would upload the file to your server here
      // For this example, we'll just simulate a successful upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setUploadSuccess(true);
      // Redirect to dashboard after a successful upload
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    } catch (error) {
      console.error('Upload error:', error);
      setUploadError('Something went wrong during the upload. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };
  
  return (
    <main className="min-h-screen bg-gradient-dark">
      {/* Background pattern with dot grid */}
      <div className="fixed inset-0 bg-grid opacity-10 pointer-events-none"></div>
      
      {/* Navbar */}
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 pt-24">
        {/* Page Header */}
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="sm"
            className="mr-4"
            leftIcon={<ArrowLeft size={16} />}
            onClick={() => router.back()}
          >
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-white">Upload CSV File</h1>
            <p className="text-primary-darker mt-1">
              Upload your Twitter analytics CSV to analyze your data
            </p>
          </div>
        </div>
        
        {/* Upload Form */}
        <div className="max-w-2xl mx-auto">
          <div className="glass-card p-6 backdrop-blur-md rounded-xl">
            <form onSubmit={handleSubmit}>
              <FileUpload 
                onFilesAdded={handleFilesAdded}
                acceptedFileTypes=".csv"
                maxFiles={1}
                maxSizeMB={10}
                title="Upload your Twitter analytics CSV"
                description="Drag and drop your analytics file here, or click to browse"
              />
              
              {uploadError && (
                <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start">
                  <AlertCircle className="text-red-400 w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-red-400">{uploadError}</p>
                </div>
              )}
              
              {uploadSuccess && (
                <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <p className="text-sm text-green-400">
                    File uploaded successfully! Redirecting to dashboard...
                  </p>
                </div>
              )}
              
              <div className="flex justify-end mt-6">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  leftIcon={<Upload size={16} />}
                  isLoading={isUploading}
                  loadingText="Uploading..."
                  disabled={files.length === 0 || uploadSuccess}
                >
                  Upload and Analyze
                </Button>
              </div>
            </form>
          </div>
          
          <div className="mt-8 glass-card p-6 backdrop-blur-md rounded-xl">
            <h2 className="text-lg font-medium text-white mb-4">
              How to download your Twitter analytics CSV
            </h2>
            <ol className="space-y-3 list-decimal list-inside text-primary-darker text-sm">
              <li>Log in to your Twitter account</li>
              <li>Go to Twitter Analytics (analytics.twitter.com)</li>
              <li>Navigate to the "Tweets" section</li>
              <li>Click on "Export data" in the top-right corner</li>
              <li>Select the date range you want to analyze</li>
              <li>Download the CSV file</li>
              <li>Upload the downloaded file here</li>
            </ol>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </main>
  );
} 