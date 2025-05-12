import OpenAI from 'openai';
import { TweetData } from './csvParser';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

export async function analyzeTwitterData(tweets: TweetData[]): Promise<AnalysisResult> {
  try {
    // Prepare data summary for OpenAI
    const totalTweets = tweets.length;
    
    // Get basic stats to help the model
    const totalImpressions = tweets.reduce((sum, tweet) => sum + tweet.impressions, 0);
    const totalEngagements = tweets.reduce((sum, tweet) => sum + tweet.engagements, 0);
    const avgEngagementRate = totalEngagements / totalImpressions * 100;
    
    // Sort tweets by engagement rate
    const sortedTweets = [...tweets].sort((a, b) => b.engagement_rate - a.engagement_rate);
    const topTweets = sortedTweets.slice(0, 5);
    
    // Create a summary for the AI to analyze
    const tweetSummary = topTweets.map(t => 
      `Tweet: "${t.tweet_text.substring(0, 100)}${t.tweet_text.length > 100 ? '...' : ''}"
       Time: ${t.time}
       Impressions: ${t.impressions}
       Engagements: ${t.engagements}
       Engagement Rate: ${t.engagement_rate.toFixed(2)}%
       Likes: ${t.likes}
       Retweets: ${t.retweets}
       Replies: ${t.replies}`
    ).join('\n\n');

    // Construct the prompt for GPT-4o
    const prompt = `
You are a Twitter analytics expert. Analyze this Twitter data and provide growth insights.

SUMMARY STATISTICS:
- Total Tweets Analyzed: ${totalTweets}
- Total Impressions: ${totalImpressions}
- Average Engagement Rate: ${avgEngagementRate.toFixed(2)}%

TOP PERFORMING TWEETS:
${tweetSummary}

Based on this data, provide:
1. A detailed analysis of what content performs best
2. Patterns in the best times to post
3. Content themes that drive the most engagement
4. Specific growth opportunities and actionable recommendations
5. Key metrics summary (followers growth potential, optimal posting frequency, etc.)

Format your response as follows:
{
  "summary": {
    "totalImpressions": [number],
    "avgEngagementRate": [number],
    "topPerformingContent": ["type1", "type2", "type3"],
    "growthOpportunities": ["opportunity1", "opportunity2", "opportunity3"],
    "bestPostingTimes": ["time1", "time2"]
  },
  "detailedReport": "Your comprehensive analysis and recommendations here in markdown format"
}`;

    try {
      // Call OpenAI API
      const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: 'You are a Twitter analytics expert that provides data-driven growth insights.' },
          { role: 'user', content: prompt }
        ],
        response_format: { type: 'json_object' },
        temperature: 0.5,
      });
  
      // Extract and parse the response
      const content = response.choices[0].message.content;
      if (!content) {
        throw new Error('No response from OpenAI');
      }
  
      // Parse the JSON response
      const analysisResult = JSON.parse(content) as AnalysisResult;
      return analysisResult;
    } catch (error: any) {
      console.error('OpenAI API Error:', error);
      
      // Check if it's a quota error
      if (error.code === 'insufficient_quota' || (error.error && error.error.code === 'insufficient_quota')) {
        console.log('Using fallback mock data due to quota limitations');
        
        // In dev mode, return mock data for testing
        if (process.env.NODE_ENV === 'development') {
          return getMockAnalysisResult(totalTweets, totalImpressions, avgEngagementRate);
        }
      }
      
      // Re-throw for other errors or in production
      throw error;
    }
  } catch (error) {
    console.error('Error analyzing Twitter data:', error);
    throw error;
  }
}

// Mock data function for development/testing
function getMockAnalysisResult(totalTweets: number, totalImpressions: number, avgEngagementRate: number): AnalysisResult {
  // Calcola dati più realistici basati sui dati reali forniti
  const formattedImpressions = totalImpressions >= 1000 
    ? `${(totalImpressions / 1000).toFixed(1)}K` 
    : totalImpressions.toString();
  
  const engagementQuality = avgEngagementRate > 3 
    ? "above average" 
    : avgEngagementRate > 1 
      ? "average" 
      : "below average";
  
  const tweetFrequencyRecommendation = totalTweets < 10 
    ? "Increase posting frequency to 5-7 times per week" 
    : totalTweets < 20 
      ? "Maintain your current posting cadence of 3-5 times per week" 
      : "Consider focusing on quality over quantity";

  return {
    summary: {
      totalImpressions: totalImpressions,
      avgEngagementRate: avgEngagementRate,
      topPerformingContent: ["Threads", "Personal stories", "Tips & tricks"],
      growthOpportunities: [
        tweetFrequencyRecommendation,
        "Engage with larger accounts (50K+ followers) in your niche",
        "Create more thread content with 5+ posts per thread"
      ],
      bestPostingTimes: ["9-11 AM", "7-9 PM"]
    },
    detailedReport: `## Twitter Growth Analysis (Simulated)

> **Note:** This is a simulated analysis because the OpenAI API quota has been exceeded. The analysis is based on your actual tweet data but uses predetermined insights.

### Data Summary
* Total Tweets Analyzed: ${totalTweets}
* Total Impressions: ${formattedImpressions}
* Average Engagement Rate: ${avgEngagementRate.toFixed(2)}% (${engagementQuality} for your account size)

### Content Performance
Your top-performing content appears to be threads about productivity and personal stories. Longer posts with multiple points tend to outperform shorter, single-point tweets.

### Posting Patterns
Based on general Twitter analytics, optimal posting times are typically weekdays between 9-11 AM and 7-9 PM. Tuesday and Thursday often show the highest engagement rates.

### Growth Recommendations
1. **Optimize Content Strategy**: Create 2 in-depth threads per week with at least 5 tweets each
2. **${tweetFrequencyRecommendation}**
3. **Increase Engagement**: Spend 20 minutes daily engaging with larger accounts in your niche
4. **Content Mix**: Balance educational content (60%) with personal stories (30%) and promotional content (10%)

### Growth Potential
With the right strategy, you could potentially see a 15-20% increase in followers per month.

*This is a simulated analysis. For a complete AI-powered analysis, please ensure your OpenAI API quota is sufficient.*`
  };
} 