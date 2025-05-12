'use client';

import React, { useState, useRef } from 'react';
import { 
  Upload, 
  BarChart, 
  FileText, 
  Calendar, 
  CheckSquare, 
  AlertTriangle,
  UploadCloud,
  ArrowRight,
  Clock
} from 'lucide-react';
import Link from 'next/link';
import { marked } from 'marked';

interface AnalysisResult {
  summary: {
    totalImpressions: number;
    avgEngagementRate: number;
    topPerformingContent: string[];
    growthOpportunities: string[];
    bestPostingTimes: string[];
  };
  detailedReport: string;
}

export default function GrowthAnalyserPage() {
  // Stati per le diverse fasi del processo
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [isAnalysing, setIsAnalysing] = useState(false);
  const [analysisDone, setAnalysisDone] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  
  // Function to convert markdown to HTML
  const convertMarkdownToHtml = (markdown: string): string => {
    return marked.parse(markdown) as string;
  };
  
  // Riferimento all'input file nascosto
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Real file upload and analysis function
  const handleFileUpload = async (file: File) => {
    try {
      setFileName(file.name);
      setIsUploading(true);
      setError(null);
      
      // Create form data for the API
      const formData = new FormData();
      formData.append('file', file);
      
      // Upload file
      setTimeout(() => {
        setIsUploading(false);
        setUploadComplete(true);
        setIsAnalysing(true);
      }, 1000);
      
      // Call the API
      const response = await fetch('/api/twitter-analysis', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        
        // Check if it's an OpenAI quota error
        if (errorData.error && errorData.error.includes('quota')) {
          throw new Error('OpenAI API quota exceeded. Please check your billing details or try again later.');
        }
        
        throw new Error(errorData.error || 'Error analyzing Twitter data');
      }
      
      // Get the analysis result
      const result = await response.json();
      setAnalysisResult(result);
      
      // Update UI states
      setIsAnalysing(false);
      setAnalysisDone(true);
      
    } catch (err) {
      console.error('Error processing file:', err);
      setIsUploading(false);
      setIsAnalysing(false);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    }
  };
  
  // Gestione drag and drop
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
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };
  
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };
  
  // Reset dello stato
  const resetAnalysis = () => {
    setFileName('');
    setUploadComplete(false);
    setAnalysisDone(false);
    setAnalysisResult(null);
    setError(null);
  };
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top header */}
      <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 sticky top-0 bg-black/50 backdrop-blur-lg z-10">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-white mr-6">Growth Analyser</h1>
        </div>
      </header>
      
      {/* Page Content */}
      <div className="p-6">
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Twitter Analytics Analyser</h2>
          <p className="text-gray-400">Upload your Twitter Analytics CSV to get AI-powered growth insights</p>
        </div>
        
        {!analysisDone ? (
          <div className="max-w-3xl mx-auto">
            {/* Upload Section */}
            <div 
              className={`border-2 border-dashed rounded-xl p-10 text-center ${
                dragActive 
                  ? 'border-cyan-400 bg-cyan-500/10' 
                  : 'border-white/20 hover:border-white/30 bg-white/5'
              } transition-all cursor-pointer`}
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
              
              {!uploadComplete ? (
                <>
                  <div className="mb-4 w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto">
                    <UploadCloud size={30} className="text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Upload Twitter Analytics CSV</h3>
                  <p className="text-gray-400 mb-6">Drag and drop your CSV file here, or click to browse</p>
                  <div className="flex justify-center">
                    <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center">
                      <Upload size={16} className="mr-2" />
                      Choose file
                    </button>
                  </div>
                </>
              ) : (
                <div className="py-4">
                  {isUploading ? (
                    <>
                      <div className="flex items-center justify-center mb-4">
                        <div className="animate-spin w-10 h-10 border-[3px] border-white/10 border-t-cyan-400 rounded-full"></div>
                      </div>
                      <h3 className="text-lg font-medium mb-2">Uploading file...</h3>
                    </>
                  ) : isAnalysing ? (
                    <>
                      <div className="flex items-center justify-center mb-4">
                        <div className="animate-pulse w-12 h-12 rounded-full bg-purple-500/30 flex items-center justify-center">
                          <BarChart size={24} className="text-purple-400" />
                        </div>
                      </div>
                      <h3 className="text-lg font-medium mb-2">Analysing with AI...</h3>
                      <p className="text-sm text-gray-400">GPT-4o is processing your data to generate insights</p>
                    </>
                  ) : (
                    <>
                      <div className="mb-4 w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto">
                        <FileText size={30} className="text-green-400" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">File uploaded and processed!</h3>
                      <p className="text-sm text-gray-400 mb-4">"{fileName}" has been successfully analysed</p>
                      <button 
                        className="px-5 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg transition-colors flex items-center mx-auto"
                        onClick={() => setAnalysisDone(true)}
                      >
                        View Report
                        <ArrowRight size={16} className="ml-2" />
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
            
            {/* Instructions */}
            <div className="mt-8 bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-3 flex items-center">
                <AlertTriangle size={18} className="mr-2 text-amber-400" />
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
        ) : (
          // Report View section
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white flex items-center">
                <BarChart size={20} className="mr-2 text-cyan-400" />
                Growth Analytics Report {analysisResult && analysisResult.detailedReport.includes('Simulated') && '(Simulated)'}
              </h2>
              <button 
                className="px-3 py-1.5 text-xs bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
                onClick={resetAnalysis}
              >
                Upload new file
              </button>
            </div>
            
            {/* Display file analyzed info */}
            {fileName && (
              <div className="mb-4 p-3 bg-white/5 border border-white/10 rounded-lg flex items-center text-sm">
                <FileText size={16} className="text-cyan-400 mr-2" />
                <div>
                  <span className="text-gray-400">Analyzed file: </span>
                  <span className="text-white">{fileName}</span>
                  {analysisResult && analysisResult.detailedReport.includes('Simulated') && (
                    <span className="ml-2 text-xs text-amber-400">(using fallback analysis due to API quota limits)</span>
                  )}
                </div>
              </div>
            )}
            
            {/* Summary Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-sm text-gray-400 mb-1">Total Impressions</div>
                <div className="text-2xl font-bold text-white mb-1">
                  {analysisResult?.summary.totalImpressions.toString() || '0'}
                </div>
                <div className="text-xs text-green-400">From your analyzed tweets</div>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-sm text-gray-400 mb-1">Avg. Engagement Rate</div>
                <div className="text-2xl font-bold text-white mb-1">
                  {(analysisResult?.summary.avgEngagementRate || 0).toFixed(1)}%
                </div>
                <div className="text-xs text-green-400">
                  {analysisResult?.summary.avgEngagementRate && analysisResult.summary.avgEngagementRate > 2 
                    ? 'Above industry average' 
                    : 'Room for improvement'}
                </div>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-sm text-gray-400 mb-1">Best Content Type</div>
                <div className="text-2xl font-bold text-white mb-1">
                  {analysisResult?.summary.topPerformingContent[0] || 'N/A'}
                </div>
                <div className="text-xs text-cyan-400">Based on engagement data</div>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-sm text-gray-400 mb-1">Best Posting Time</div>
                <div className="text-2xl font-bold text-white mb-1">
                  {analysisResult?.summary.bestPostingTimes[0] || 'N/A'}
                </div>
                <div className="text-xs text-cyan-400 flex items-center">
                  <Clock size={12} className="mr-1" />
                  Based on historical data
                </div>
              </div>
            </div>
            
            {/* Action Cards for Next Steps */}
            <h3 className="text-lg font-bold text-white mb-3">What do you want to do next?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Link href="/dashboard/growth-plan" className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 border border-white/10 rounded-xl p-5 hover:border-cyan-500/30 transition-colors cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center mb-3">
                  <BarChart size={18} className="text-cyan-400" />
                </div>
                <h3 className="font-bold text-white text-sm mb-1">Create Growth Plan</h3>
                <p className="text-xs text-gray-300">Build a tailored growth strategy based on your analytics</p>
              </Link>
              
              <Link href="/dashboard/content-calendar" className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-white/10 rounded-xl p-5 hover:border-purple-500/30 transition-colors cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mb-3">
                  <Calendar size={18} className="text-purple-400" />
                </div>
                <h3 className="font-bold text-white text-sm mb-1">Content Calendar</h3>
                <p className="text-xs text-gray-300">Schedule optimized content based on best times to post</p>
              </Link>
              
              <Link href="/dashboard/tasks" className="bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-white/10 rounded-xl p-5 hover:border-amber-500/30 transition-colors cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center mb-3">
                  <CheckSquare size={18} className="text-amber-400" />
                </div>
                <h3 className="font-bold text-white text-sm mb-1">Action Tasks</h3>
                <p className="text-xs text-gray-300">See prioritized growth tasks based on your analytics</p>
              </Link>
            </div>
            
            {/* Report from AI */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-bold text-white mb-4">AI-Generated Growth Report</h3>
              
              {error ? (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-sm">
                  <div className="flex items-start">
                    <AlertTriangle className="text-red-400 mr-2 flex-shrink-0 mt-0.5" size={16} />
                    <div>
                      <h4 className="font-medium text-red-400 mb-1">Error Processing CSV</h4>
                      <p className="text-red-300">{error}</p>
                      
                      {error.includes('quota') && (
                        <div className="mt-3 space-y-2">
                          <p className="text-red-300">
                            The OpenAI API quota has been exceeded. This typically happens when:
                          </p>
                          <ul className="list-disc list-inside text-red-300 pl-2">
                            <li>You're using a free trial account with limited credits</li>
                            <li>Your billing information needs to be updated</li>
                            <li>You've exceeded your usage limits</li>
                          </ul>
                          <p className="text-red-300">
                            Please check your OpenAI account settings or try again later.
                          </p>
                        </div>
                      )}
                      
                      <button 
                        onClick={resetAnalysis}
                        className="mt-3 px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs rounded-lg transition-colors"
                      >
                        Try Again
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 text-sm">
                  <div className="prose prose-invert max-w-none text-gray-300 prose-headings:text-white prose-headings:font-medium prose-p:text-gray-300">
                    {analysisResult?.detailedReport ? (
                      <div dangerouslySetInnerHTML={{ __html: convertMarkdownToHtml(analysisResult.detailedReport) }} />
                    ) : (
                      <p>No detailed report available. Please try uploading a different CSV file.</p>
                    )}
                  </div>
                  
                  {/* Growth Opportunities */}
                  {analysisResult?.summary.growthOpportunities && analysisResult.summary.growthOpportunities.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-white font-medium mb-2">Key Growth Opportunities:</h4>
                      <ul className="space-y-2">
                        {analysisResult.summary.growthOpportunities.map((opportunity, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center mr-2 text-cyan-400 flex-shrink-0 mt-0.5">
                              {index + 1}
                            </div>
                            <span>{opportunity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 