'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Check } from 'lucide-react';

export default function PricingPage() {
  return (
    <main className="min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Pricing Header */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Affordable Pricing Plans</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose the perfect plan for your social media growth needs
          </p>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-12 px-4 pb-24">
        <div className="container mx-auto max-w-6xl">
          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="card-glass p-8 rounded-lg relative">
              <h3 className="text-2xl font-bold mb-2">Free Plan</h3>
              <div className="flex items-end mb-6">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-gray-400 ml-1">per month</span>
              </div>
              <button className="w-full py-3 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg mb-6 transition-colors">
                Get Started
              </button>
              <p className="text-gray-400 mb-6">What's Included</p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Check size={18} className="mr-2 text-green-400" />
                  Basic Account Analysis
                </li>
                <li className="flex items-center">
                  <Check size={18} className="mr-2 text-green-400" />
                  Limited Reports
                </li>
                <li className="flex items-center">
                  <Check size={18} className="mr-2 text-green-400" />
                  Weekly Growth Tips
                </li>
                <li className="flex items-center">
                  <Check size={18} className="mr-2 text-green-400" />
                  Single Account Support
                </li>
                <li className="flex items-center">
                  <Check size={18} className="mr-2 text-green-400" />
                  Email Support
                </li>
              </ul>
            </div>

            {/* Pro Plan */}
            <div className="card-glass p-8 rounded-lg relative border-cyan-500/50 transform scale-105 shadow-lg shadow-cyan-500/10">
              <div className="absolute -top-3 right-8 bg-cyan-500 text-xs px-3 py-1 rounded-full">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-2">Pro Plan</h3>
              <div className="flex items-end mb-6">
                <span className="text-4xl font-bold">$12</span>
                <span className="text-gray-400 ml-1">per month</span>
              </div>
              <button className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90 rounded-lg mb-6 transition-colors">
                Get Started
              </button>
              <p className="text-gray-400 mb-6">Everything in Free, plus:</p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Check size={18} className="mr-2 text-green-400" />
                  Full Account Analysis
                </li>
                <li className="flex items-center">
                  <Check size={18} className="mr-2 text-green-400" />
                  Unlimited Reports
                </li>
                <li className="flex items-center">
                  <Check size={18} className="mr-2 text-green-400" />
                  Daily Growth Tips
                </li>
                <li className="flex items-center">
                  <Check size={18} className="mr-2 text-green-400" />
                  Competitor Analysis
                </li>
                <li className="flex items-center">
                  <Check size={18} className="mr-2 text-green-400" />
                  Content Calendar
                </li>
                <li className="flex items-center">
                  <Check size={18} className="mr-2 text-green-400" />
                  3 Accounts Support
                </li>
                <li className="flex items-center">
                  <Check size={18} className="mr-2 text-green-400" />
                  Priority Email Support
                </li>
              </ul>
            </div>

            {/* Advanced Plan */}
            <div className="card-glass p-8 rounded-lg relative">
              <h3 className="text-2xl font-bold mb-2">Advanced Plan</h3>
              <div className="flex items-end mb-6">
                <span className="text-4xl font-bold">$19</span>
                <span className="text-gray-400 ml-1">per month</span>
              </div>
              <button className="w-full py-3 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg mb-6 transition-colors">
                Get Started
              </button>
              <p className="text-gray-400 mb-6">Everything in Pro, plus:</p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Check size={18} className="mr-2 text-green-400" />
                  AI Content Generation
                </li>
                <li className="flex items-center">
                  <Check size={18} className="mr-2 text-green-400" />
                  Advanced Analytics
                </li>
                <li className="flex items-center">
                  <Check size={18} className="mr-2 text-green-400" />
                  Custom Growth Strategy
                </li>
                <li className="flex items-center">
                  <Check size={18} className="mr-2 text-green-400" />
                  Unlimited Accounts
                </li>
                <li className="flex items-center">
                  <Check size={18} className="mr-2 text-green-400" />
                  Dedicated Account Manager
                </li>
                <li className="flex items-center">
                  <Check size={18} className="mr-2 text-green-400" />
                  Phone Support
                </li>
                <li className="flex items-center">
                  <Check size={18} className="mr-2 text-green-400" />
                  Strategy Consultation
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 bg-slate-900/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Got questions about our pricing? We've got answers.
            </p>
          </div>

          {/* FAQs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: "Can I upgrade or downgrade my plan?",
                answer: "Yes, you can upgrade or downgrade your plan at any time. Changes to your billing will take effect on your next billing cycle."
              },
              {
                question: "Is there a contract or commitment?",
                answer: "No. All plans are month-to-month and you can cancel at any time. No long-term contracts or commitments."
              },
              {
                question: "Can I try before I buy?",
                answer: "Yes, our Free plan gives you access to basic features at no cost. You can upgrade to a paid plan when you're ready."
              },
              {
                question: "How does billing work?",
                answer: "We bill monthly or annually, depending on your preference. Annual plans come with a discount equivalent to getting 2 months free."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, PayPal, and Apple Pay for secure payment processing."
              },
              {
                question: "Can I get a refund?",
                answer: "If you're not satisfied with our service, contact us within 14 days of purchase for a full refund, no questions asked."
              }
            ].map((faq, index) => (
              <div key={index} className="mb-8">
                <h3 className="text-xl font-bold mb-2">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-3xl text-center card-glass py-16 px-8 rounded-lg">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to grow your X account?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Start with our free plan and upgrade when you're ready. No credit card required.
          </p>
          <Link 
            href="/login"
            className="px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:opacity-90 transition-all inline-block"
          >
            Get Started
          </Link>
          <div className="mt-8 text-gray-400">
            <p>Questions? Contact us at hello@tweetcoach.com</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
} 