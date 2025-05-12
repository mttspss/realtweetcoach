import Papa from 'papaparse';

export interface TweetData {
  time: string;
  tweet_text: string;
  impressions: number;
  engagements: number;
  engagement_rate: number;
  retweets: number;
  replies: number;
  likes: number;
  profile_clicks?: number;
  url_clicks?: number;
  detail_expands?: number;
  media_views?: number;
  hashtag_clicks?: number;
}

export interface AnalysisSummary {
  totalImpressions: number;
  avgEngagementRate: number;
  topPerformingContent: string[];
  growthOpportunities: string[];
  bestPostingTimes: string[];
  totalTweets: number;
  totalEngagements: number;
  avgLikes: number;
  avgRetweets: number;
  avgReplies: number;
  bestDayOfWeek: string;
  bestTimeOfDay: string;
  contentCategorization: Record<string, number>;  // e.g. {"threads": 5, "tips": 3}
}

/**
 * Parse Twitter Analytics CSV and return structured tweet data
 */
export function parseTwitterAnalyticsCSV(csvText: string): Promise<TweetData[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      complete: (results: Papa.ParseResult<any>) => {
        try {
          const { data } = results;
          
          if (!data || data.length === 0) {
            throw new Error('No data found in CSV file');
          }
          
          // First, detect column names as they can vary
          const firstRow = data[0];
          const columnNames = Object.keys(firstRow);
          
          // Try to find relevant columns by checking different possible names
          const timeColumn = findColumn(columnNames, ['time', 'date', 'timestamp', 'tweet time', 'time posted']);
          const textColumn = findColumn(columnNames, ['text', 'tweet text', 'tweet', 'content']);
          const impressionsColumn = findColumn(columnNames, ['impressions', 'views', 'tweet impressions']);
          const engagementsColumn = findColumn(columnNames, ['engagements', 'total engagements']);
          const engagementRateColumn = findColumn(columnNames, ['engagement rate', 'engagement']);
          const retweetsColumn = findColumn(columnNames, ['retweets', 'rt', 'retweeted']);
          const repliesColumn = findColumn(columnNames, ['replies', 'reply']);
          const likesColumn = findColumn(columnNames, ['likes', 'like', 'favorites', 'favs']);
          const profileClicksColumn = findColumn(columnNames, ['profile clicks', 'profile views']);
          const urlClicksColumn = findColumn(columnNames, ['url clicks', 'link clicks', 'links']);
          const detailExpandsColumn = findColumn(columnNames, ['detail expands', 'expands']);
          const mediaViewsColumn = findColumn(columnNames, ['media views', 'media engagements']);
          const hashtagClicksColumn = findColumn(columnNames, ['hashtag clicks']);
          
          console.log('Detected columns:', {
            time: timeColumn,
            text: textColumn,
            impressions: impressionsColumn,
            engagements: engagementsColumn,
            engagementRate: engagementRateColumn,
            retweets: retweetsColumn,
            replies: repliesColumn,
            likes: likesColumn
          });
          
          // Map to our TweetData structure
          const tweets = data.map(row => {
            // Try to extract numeric values
            const getNumericValue = (value: any): number => {
              if (typeof value === 'number') return value;
              if (typeof value === 'string') {
                // Handle percentage format
                if (value.includes('%')) {
                  return parseFloat(value.replace('%', '')) / 100;
                }
                // Handle thousands separator
                return parseFloat(value.replace(/,/g, '')) || 0;
              }
              return 0;
            };
            
            const tweet: TweetData = {
              time: row[timeColumn] || '',
              tweet_text: row[textColumn] || '',
              impressions: getNumericValue(row[impressionsColumn]),
              engagements: getNumericValue(row[engagementsColumn]),
              engagement_rate: getNumericValue(row[engagementRateColumn]),
              retweets: getNumericValue(row[retweetsColumn]),
              replies: getNumericValue(row[repliesColumn]),
              likes: getNumericValue(row[likesColumn]),
            };
            
            // Add optional fields if they exist
            if (profileClicksColumn) {
              tweet.profile_clicks = getNumericValue(row[profileClicksColumn]);
            }
            
            if (urlClicksColumn) {
              tweet.url_clicks = getNumericValue(row[urlClicksColumn]);
            }
            
            if (detailExpandsColumn) {
              tweet.detail_expands = getNumericValue(row[detailExpandsColumn]);
            }
            
            if (mediaViewsColumn) {
              tweet.media_views = getNumericValue(row[mediaViewsColumn]);
            }
            
            if (hashtagClicksColumn) {
              tweet.hashtag_clicks = getNumericValue(row[hashtagClicksColumn]);
            }
            
            // If engagement rate is not provided, calculate it
            if (!tweet.engagement_rate && tweet.impressions > 0) {
              tweet.engagement_rate = tweet.engagements / tweet.impressions;
            }
            
            return tweet;
          });
          
          console.log(`Successfully parsed ${tweets.length} tweets`);
          resolve(tweets);
        } catch (error) {
          console.error('Error parsing CSV:', error);
          reject(error);
        }
      },
      error: (error) => {
        console.error('CSV parsing error:', error);
        reject(error);
      }
    });
  });
}

/**
 * Helper to find a column by possible names
 */
function findColumn(columns: string[], possibleNames: string[]): string {
  const found = columns.find(col => 
    possibleNames.some(name => 
      col.trim().toLowerCase().includes(name.toLowerCase())
    )
  );
  return found || '';
}

/**
 * Analyze tweet data and generate insights
 */
export function analyzeTweetData(tweets: TweetData[]): AnalysisSummary {
  if (!tweets || tweets.length === 0) {
    throw new Error('No tweets to analyze');
  }
  
  // Basic metrics
  const totalTweets = tweets.length;
  const totalImpressions = tweets.reduce((sum, tweet) => sum + tweet.impressions, 0);
  const totalEngagements = tweets.reduce((sum, tweet) => sum + tweet.engagements, 0);
  const avgEngagementRate = totalImpressions > 0 ? 
    (totalEngagements / totalImpressions) * 100 : 0;
  
  const avgLikes = tweets.reduce((sum, tweet) => sum + tweet.likes, 0) / totalTweets;
  const avgRetweets = tweets.reduce((sum, tweet) => sum + tweet.retweets, 0) / totalTweets;
  const avgReplies = tweets.reduce((sum, tweet) => sum + tweet.replies, 0) / totalTweets;
  
  // Find top performing tweets based on engagement rate
  const topTweets = [...tweets]
    .sort((a, b) => b.engagement_rate - a.engagement_rate)
    .slice(0, 5);
  
  // Analyze posting times
  const timeData = analyzePostingTimes(tweets);
  
  // Content categorization (basic implementation)
  const contentCategories = categorizeContent(tweets);
  
  // Find top performing content types based on engagement
  const topPerformingContent = getTopContentTypes(contentCategories, tweets);
  
  // Generate growth opportunities based on the data
  const growthOpportunities = generateGrowthOpportunities(tweets, timeData, contentCategories);
  
  return {
    totalImpressions,
    avgEngagementRate,
    topPerformingContent,
    growthOpportunities,
    bestPostingTimes: [timeData.bestTimeOfDay],
    totalTweets,
    totalEngagements,
    avgLikes,
    avgRetweets,
    avgReplies,
    bestDayOfWeek: timeData.bestDayOfWeek,
    bestTimeOfDay: timeData.bestTimeOfDay,
    contentCategorization: contentCategories
  };
}

/**
 * Analyze posting times to find optimal times
 */
function analyzePostingTimes(tweets: TweetData[]) {
  const dayPerformance: Record<string, {count: number, engagementSum: number}> = {};
  const timePerformance: Record<string, {count: number, engagementSum: number}> = {};
  
  // Days of the week
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  tweets.forEach(tweet => {
    try {
      const tweetDate = new Date(tweet.time);
      
      // Get day of week
      const dayOfWeek = days[tweetDate.getDay()];
      if (!dayPerformance[dayOfWeek]) {
        dayPerformance[dayOfWeek] = { count: 0, engagementSum: 0 };
      }
      dayPerformance[dayOfWeek].count += 1;
      dayPerformance[dayOfWeek].engagementSum += tweet.engagement_rate;
      
      // Get time of day (hour)
      const hour = tweetDate.getHours();
      const timeBlock = getTimeBlock(hour);
      if (!timePerformance[timeBlock]) {
        timePerformance[timeBlock] = { count: 0, engagementSum: 0 };
      }
      timePerformance[timeBlock].count += 1;
      timePerformance[timeBlock].engagementSum += tweet.engagement_rate;
    } catch (e) {
      // Skip tweets with invalid dates
      console.warn('Invalid date format:', tweet.time);
    }
  });
  
  // Find best day and time
  let bestDayOfWeek = 'Monday';
  let bestDayEngagement = 0;
  
  Object.entries(dayPerformance).forEach(([day, data]) => {
    const avgEngagement = data.engagementSum / data.count;
    if (avgEngagement > bestDayEngagement && data.count >= 3) { // Require at least 3 tweets
      bestDayEngagement = avgEngagement;
      bestDayOfWeek = day;
    }
  });
  
  let bestTimeOfDay = 'Morning (8-11 AM)';
  let bestTimeEngagement = 0;
  
  Object.entries(timePerformance).forEach(([time, data]) => {
    const avgEngagement = data.engagementSum / data.count;
    if (avgEngagement > bestTimeEngagement && data.count >= 2) { // Require at least 2 tweets
      bestTimeEngagement = avgEngagement;
      bestTimeOfDay = time;
    }
  });
  
  return {
    bestDayOfWeek,
    bestTimeOfDay
  };
}

/**
 * Categorize tweets into content types
 */
function categorizeContent(tweets: TweetData[]): Record<string, number> {
  const categories: Record<string, number> = {
    'threads': 0,
    'tips': 0,
    'questions': 0,
    'announcements': 0,
    'insights': 0,
    'media': 0,
    'links': 0,
    'other': 0
  };
  
  tweets.forEach(tweet => {
    const text = tweet.tweet_text.toLowerCase();
    
    // Simple categorization based on content markers
    if (text.includes('thread') || text.includes('🧵')) {
      categories['threads']++;
    } else if (text.includes('tip') || text.includes('how to') || text.includes('guide')) {
      categories['tips']++;
    } else if (text.includes('?') || text.startsWith('what') || text.startsWith('how') || text.startsWith('why')) {
      categories['questions']++;
    } else if (text.includes('announcing') || text.includes('launch') || text.includes('new')) {
      categories['announcements']++;
    } else if (text.includes('insight') || text.includes('data') || text.includes('learn')) {
      categories['insights']++;
    } else if (tweet.media_views && tweet.media_views > 0) {
      categories['media']++;
    } else if (tweet.url_clicks && tweet.url_clicks > 0) {
      categories['links']++;
    } else {
      categories['other']++;
    }
  });
  
  return categories;
}

/**
 * Find top performing content types based on engagement
 */
function getTopContentTypes(categories: Record<string, number>, tweets: TweetData[]): string[] {
  const contentTypePerformance: Record<string, {count: number, engagementSum: number}> = {};
  
  // Initialize with categories that have content
  Object.entries(categories).forEach(([category, count]) => {
    if (count > 0) {
      contentTypePerformance[category] = { count: 0, engagementSum: 0 };
    }
  });
  
  // Calculate engagement by content type
  tweets.forEach(tweet => {
    const text = tweet.tweet_text.toLowerCase();
    
    if (text.includes('thread') || text.includes('🧵')) {
      contentTypePerformance['threads'].count++;
      contentTypePerformance['threads'].engagementSum += tweet.engagement_rate;
    } else if (text.includes('tip') || text.includes('how to') || text.includes('guide')) {
      contentTypePerformance['tips'].count++;
      contentTypePerformance['tips'].engagementSum += tweet.engagement_rate;
    } else if (text.includes('?') || text.startsWith('what') || text.startsWith('how') || text.startsWith('why')) {
      contentTypePerformance['questions'].count++;
      contentTypePerformance['questions'].engagementSum += tweet.engagement_rate;
    } else if (text.includes('announcing') || text.includes('launch') || text.includes('new')) {
      contentTypePerformance['announcements'].count++;
      contentTypePerformance['announcements'].engagementSum += tweet.engagement_rate;
    } else if (text.includes('insight') || text.includes('data') || text.includes('learn')) {
      contentTypePerformance['insights'].count++;
      contentTypePerformance['insights'].engagementSum += tweet.engagement_rate;
    } else if (tweet.media_views && tweet.media_views > 0) {
      contentTypePerformance['media'].count++;
      contentTypePerformance['media'].engagementSum += tweet.engagement_rate;
    } else if (tweet.url_clicks && tweet.url_clicks > 0) {
      contentTypePerformance['links'].count++;
      contentTypePerformance['links'].engagementSum += tweet.engagement_rate;
    } else {
      contentTypePerformance['other'].count++;
      contentTypePerformance['other'].engagementSum += tweet.engagement_rate;
    }
  });
  
  // Calculate average engagement per content type
  const avgEngagementByType: Record<string, number> = {};
  Object.entries(contentTypePerformance).forEach(([type, data]) => {
    if (data.count > 0) {
      avgEngagementByType[type] = data.engagementSum / data.count;
    }
  });
  
  // Sort by average engagement
  return Object.entries(avgEngagementByType)
    .sort(([, a], [, b]) => b - a)
    .filter(([type, _]) => categories[type] >= 2) // Require at least 2 tweets of this type
    .map(([type, _]) => type);
}

/**
 * Generate growth recommendations based on data analysis
 */
function generateGrowthOpportunities(
  tweets: TweetData[], 
  timeData: {bestDayOfWeek: string, bestTimeOfDay: string}, 
  contentCategories: Record<string, number>
): string[] {
  const opportunities: string[] = [];
  
  // Best posting time recommendation
  opportunities.push(
    `Post on ${timeData.bestDayOfWeek}s during the ${timeData.bestTimeOfDay} to maximize engagement.`
  );
  
  // Content type recommendations
  const contentTypeEntries = Object.entries(contentCategories);
  contentTypeEntries.sort((a, b) => b[1] - a[1]);
  
  const topContentType = contentTypeEntries[0][0];
  opportunities.push(
    `Continue creating ${topContentType} as they perform well with your audience.`
  );
  
  // Check tweet frequency
  const daysBetweenFirstAndLast = getDateDifferenceInDays(tweets);
  const tweetsPerDay = tweets.length / (daysBetweenFirstAndLast || 1);
  
  if (tweetsPerDay < 1) {
    opportunities.push(
      'Increase your posting frequency to at least 1-2 tweets per day for better visibility.'
    );
  }
  
  // Check overall engagement
  const avgEngagement = tweets.reduce((sum, t) => sum + t.engagement_rate, 0) / tweets.length;
  if (avgEngagement < 0.02) { // Less than 2%
    opportunities.push(
      'Work on increasing engagement by asking questions and encouraging replies.'
    );
  }
  
  // Check for media content
  const mediaCount = tweets.filter(t => t.media_views && t.media_views > 0).length;
  const mediaPercentage = (mediaCount / tweets.length) * 100;
  
  if (mediaPercentage < 30) {
    opportunities.push(
      'Include more visual content like images, GIFs, or videos to increase engagement.'
    );
  }
  
  // Check if threads are underutilized
  if (contentCategories['threads'] < 3 && tweets.length >= 10) {
    opportunities.push(
      'Create more thread-style content to share in-depth insights with your audience.'
    );
  }
  
  return opportunities;
}

/**
 * Get time block label for an hour
 */
function getTimeBlock(hour: number): string {
  if (hour >= 5 && hour < 8) return 'Early Morning (5-8 AM)';
  if (hour >= 8 && hour < 12) return 'Morning (8-11 AM)';
  if (hour >= 12 && hour < 15) return 'Early Afternoon (12-2 PM)';
  if (hour >= 15 && hour < 18) return 'Late Afternoon (3-5 PM)';
  if (hour >= 18 && hour < 21) return 'Evening (6-8 PM)';
  if (hour >= 21 || hour < 5) return 'Night (9 PM-4 AM)';
  return 'Unknown';
}

/**
 * Calculate the difference in days between the first and last tweet
 */
function getDateDifferenceInDays(tweets: TweetData[]): number {
  if (tweets.length < 2) return 1;
  
  try {
    // Sort tweets by date
    const sortedTweets = [...tweets].sort((a, b) => {
      return new Date(a.time).getTime() - new Date(b.time).getTime();
    });
    
    const firstDate = new Date(sortedTweets[0].time);
    const lastDate = new Date(sortedTweets[sortedTweets.length - 1].time);
    
    const diffTime = Math.abs(lastDate.getTime() - firstDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays || 1; // Return at least 1 day
  } catch (e) {
    console.warn('Error calculating date difference:', e);
    return 1;
  }
} 