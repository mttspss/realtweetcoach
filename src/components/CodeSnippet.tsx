'use client';

import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

interface CodeSnippetProps {
  code: string;
  language?: string;
  title?: string;
}

export function CodeSnippet({ code, language = 'html', title }: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="rounded-xl overflow-hidden border border-card-border/40 bg-black/50 backdrop-blur-sm mb-4">
      {title && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-card-border/40 bg-card/50">
          <span className="text-xs font-medium text-gray-300">{title}</span>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500">{language}</span>
          </div>
        </div>
      )}
      <div className="relative group">
        <pre className="p-4 text-sm overflow-auto max-h-[400px] font-mono">
          <code className={`language-${language}`}>{code}</code>
        </pre>
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <CopyToClipboard text={code} onCopy={handleCopy}>
            <button 
              className="p-1.5 rounded-lg bg-card/70 hover:bg-card border border-card-border/50 text-primary-darker hover:text-accent transition-colors"
              aria-label="Copy code"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </CopyToClipboard>
        </div>
      </div>
    </div>
  );
} 