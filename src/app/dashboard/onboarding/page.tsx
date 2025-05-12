'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  UploadCloud, 
  ArrowRight, 
  CheckCircle, 
  AlertTriangle,
  FileText,
  BarChart2
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingComplete, setProcessingComplete] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  
  // Handle file upload simulation
  const handleFileUpload = async (file: File) => {
    try {
      setFileName(file.name);
      setIsUploading(true);
      setError(null);
      
      // Create form data for the API
      const formData = new FormData();
      formData.append('file', file);
      
      // Upload file and get analysis
      const response = await fetch('/api/twitter-analysis', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error analyzing Twitter data');
      }
      
      // Process succeeded
      setIsUploading(false);
      setUploadComplete(true);
      setIsProcessing(true);
      
      // Simulate processing time for better UX
      setTimeout(() => {
        setIsProcessing(false);
        setProcessingComplete(true);
      }, 3000);
      
      // Store analysis result in localStorage to access across app
      const result = await response.json();
      localStorage.setItem('twitterAnalysis', JSON.stringify(result));
      
    } catch (err) {
      console.error('Error processing file:', err);
      setIsUploading(false);
      setIsProcessing(false);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    }
  };
  
  // Handle drag and drop events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      if (e.dataTransfer.files[0].name.endsWith('.csv')) {
        handleFileUpload(e.dataTransfer.files[0]);
      } else {
        setError('Please upload a CSV file');
      }
    }
  };
  
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      if (e.target.files[0].name.endsWith('.csv')) {
        handleFileUpload(e.target.files[0]);
      } else {
        setError('Please upload a CSV file');
      }
    }
  };
  
  // Go to dashboard with delay
  const goToDashboard = () => {
    setTimeout(() => {
      router.push('/dashboard');
    }, 1000);
  };
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header with logo */}
      <header className="border-b border-white/10 py-6 px-8">
        <div className="flex justify-center">
          <Link href="/" className="flex items-center">
            <Image 
              src="/images/logo.png" 
              alt="TweetCoach" 
              width={28} 
              height={28}
              className="mr-2" 
            />
            <span className="text-lg font-semibold">
              <span className="text-white">tweetcoa</span><span className="text-cyan-400">.ch</span>
            </span>
          </Link>
        </div>
      </header>
      
      {/* Main content */}
      <main className="py-12 px-4 max-w-4xl mx-auto">
        {/* Progress steps */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-xs font-medium">
              1
            </div>
            <span className="text-sm font-medium">Upload CSV</span>
          </div>
          <div className="w-20 h-px bg-white/20 mx-2"></div>
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${uploadComplete ? 'bg-cyan-500' : 'bg-white/10'}`}>
              2
            </div>
            <span className={`text-sm ${uploadComplete ? 'text-white font-medium' : 'text-gray-400'}`}>Process Data</span>
          </div>
          <div className="w-20 h-px bg-white/20 mx-2"></div>
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${processingComplete ? 'bg-cyan-500' : 'bg-white/10'}`}>
              3
            </div>
            <span className={`text-sm ${processingComplete ? 'text-white font-medium' : 'text-gray-400'}`}>All Set</span>
          </div>
        </div>
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-3">
          {!uploadComplete ? 'Upload your Twitter Analytics' : 
           !processingComplete ? 'Processing your data' : 
           'You\'re all set!'}
        </h1>
        <p className="text-gray-400 text-center mb-10 max-w-lg mx-auto">
          {!uploadComplete ? 
            'Get started by uploading your Twitter Analytics CSV file to see personalized insights and growth strategies.' : 
           !processingComplete ? 
            'We\'re analyzing your Twitter data to generate personalized insights.' : 
            'Your dashboard is ready with personalized analytics and growth insights.'}
        </p>
        
        {/* Upload section */}
        {!uploadComplete ? (
          <div className="max-w-2xl mx-auto">
            <div 
              className={`border-2 border-dashed rounded-xl p-10 text-center ${
                dragActive 
                  ? 'border-cyan-400 bg-cyan-500/10' 
                  : 'border-white/20 hover:border-white/30 bg-white/5'
              } transition-all cursor-pointer mb-8`}
              onClick={() => fileInputRef.current?.click()}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".csv"
                onChange={handleFileInput}
              />
              
              {!isUploading ? (
                <>
                  <div className="mb-6 w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto">
                    <UploadCloud size={40} className="text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Upload Twitter Analytics CSV</h3>
                  <p className="text-gray-400 mb-6">Drag and drop your CSV file here, or click to browse</p>
                  <button className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-lg transition-colors flex items-center mx-auto">
                    <UploadCloud size={18} className="mr-2" />
                    Select CSV File
                  </button>
                </>
              ) : (
                <div className="py-4">
                  <div className="flex items-center justify-center mb-4">
                    <div className="animate-spin w-10 h-10 border-[3px] border-white/10 border-t-cyan-400 rounded-full"></div>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Uploading file...</h3>
                  <p className="text-sm text-gray-400">{fileName}</p>
                </div>
              )}
            </div>
            
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-sm mb-8">
                <div className="flex items-start">
                  <AlertTriangle className="text-red-400 mr-2 flex-shrink-0 mt-0.5" size={16} />
                  <div>
                    <h4 className="font-medium text-red-400 mb-1">Error Uploading File</h4>
                    <p className="text-red-300">{error}</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Instructions */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-3 flex items-center">
                <FileText size={18} className="mr-2 text-cyan-400" />
                How to export your Twitter Analytics
              </h3>
              <ol className="space-y-3">
                <li className="flex">
                  <span className="bg-white/10 text-xs rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">1</span>
                  <p className="text-sm text-gray-300">Log into your Twitter account and go to the Analytics section</p>
                </li>
                <li className="flex">
                  <span className="bg-white/10 text-xs rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">2</span>
                  <p className="text-sm text-gray-300">Navigate to the "Tweets" tab to see your tweet performance</p>
                </li>
                <li className="flex">
                  <span className="bg-white/10 text-xs rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">3</span>
                  <p className="text-sm text-gray-300">Click on "Export data" and select your desired date range</p>
                </li>
                <li className="flex">
                  <span className="bg-white/10 text-xs rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">4</span>
                  <p className="text-sm text-gray-300">Download the CSV file and upload it here for analysis</p>
                </li>
              </ol>
            </div>
          </div>
        ) : !processingComplete ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/5 border border-white/10 rounded-xl p-10 text-center mb-8">
              <div className="flex flex-col items-center">
                {isProcessing ? (
                  <>
                    <div className="animate-pulse w-20 h-20 rounded-full bg-purple-500/30 flex items-center justify-center mb-6">
                      <BarChart2 size={40} className="text-purple-400" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">Analyzing your Twitter data</h3>
                    <p className="text-sm text-gray-400 mb-8">This may take a minute...</p>
                    
                    <div className="w-full max-w-md h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full animate-progress"></div>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-3">What's happening behind the scenes</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center text-cyan-400 bg-cyan-400/10 mr-2 flex-shrink-0 mt-0.5">
                    <CheckCircle size={12} />
                  </div>
                  <p className="text-sm text-gray-300">Parsing your Twitter Analytics CSV file</p>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center text-cyan-400 bg-cyan-400/10 mr-2 flex-shrink-0 mt-0.5">
                    <CheckCircle size={12} />
                  </div>
                  <p className="text-sm text-gray-300">Identifying trends in engagement and performance</p>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center text-white bg-white/10 mr-2 flex-shrink-0 mt-0.5 animate-pulse">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                  </div>
                  <p className="text-sm text-gray-300">Generating personalized growth strategies</p>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center text-white bg-white/10 mr-2 flex-shrink-0 mt-0.5">
                    <span className="w-1 h-1 bg-white/30 rounded-full"></span>
                  </div>
                  <p className="text-sm text-gray-400">Setting up your personalized dashboard</p>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/5 border border-white/10 rounded-xl p-10 text-center mb-8">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                  <CheckCircle size={40} className="text-green-400" />
                </div>
                <h3 className="text-xl font-medium mb-2">Analysis Complete!</h3>
                <p className="text-sm text-gray-400 mb-6">Your data has been successfully analyzed and your dashboard is ready</p>
                
                <button 
                  className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-lg transition-colors flex items-center"
                  onClick={goToDashboard}
                >
                  Go to Dashboard
                  <ArrowRight size={18} className="ml-2" />
                </button>
              </div>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-3">What you'll find in your dashboard</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center text-cyan-400 bg-cyan-400/10 mr-2 flex-shrink-0 mt-0.5">
                    <CheckCircle size={12} />
                  </div>
                  <p className="text-sm text-gray-300">Complete analytics with engagement metrics and growth trends</p>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center text-cyan-400 bg-cyan-400/10 mr-2 flex-shrink-0 mt-0.5">
                    <CheckCircle size={12} />
                  </div>
                  <p className="text-sm text-gray-300">Personalized growth strategy tailored to your Twitter account</p>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center text-cyan-400 bg-cyan-400/10 mr-2 flex-shrink-0 mt-0.5">
                    <CheckCircle size={12} />
                  </div>
                  <p className="text-sm text-gray-300">AI-powered content recommendations for higher engagement</p>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center text-cyan-400 bg-cyan-400/10 mr-2 flex-shrink-0 mt-0.5">
                    <CheckCircle size={12} />
                  </div>
                  <p className="text-sm text-gray-300">Priority tasks to help you grow your Twitter presence</p>
                </li>
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 