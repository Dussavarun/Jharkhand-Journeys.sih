// app/api/plan/route.js
import { NextResponse } from 'next/server';
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { HumanMessage } from "@langchain/core/messages";

class JharkhandTravelPlannerAPI {
  constructor() {
    this.llm = new ChatGoogleGenerativeAI({
      model: "gemini-1.5-flash",
      temperature: 0.1,
      apiKey: process.env.GOOGLE_API_KEY,
      timeout: 45000,
    });

    this.searchTool = null;
    if (process.env.TAVILY_API_KEY) {
      this.searchTool = new TavilySearchResults({
        maxResults: 6,
        searchDepth: "advanced",
        apiKey: process.env.TAVILY_API_KEY,
      });
    }

    this.tools = this.searchTool ? [this.searchTool] : [];

    this.agent = createReactAgent({
      llm: this.llm,
      tools: this.tools,
      messageModifier: `You are a Jharkhand travel planner with real-time search access. 

CRITICAL INSTRUCTIONS:
1. ALWAYS search for current real-time prices using your search tool
2. Base recommendations on user preferences (waterfall, temple, forest, hills, valleys, tribal culture)
3. Suggest destinations matching their preferred transport mode
4. Use MULTIPLE searches to get accurate pricing data
5. Calculate realistic budgets based on ACTUAL search results

SEARCH STRATEGY:
- Search transport prices from origin to Jharkhand destinations
- Search accommodation rates in recommended destinations
- Search attraction entry fees and activity costs
- Search local transport and food costs
- Focus on destinations matching user preferences

RESPONSE FORMAT:
1. Recommended Destinations (based on preferences)
2. Transport Analysis (bus/train/flight with real prices)
3. Accommodation with real rates
4. Day-wise itinerary with costs
5. Total budget breakdown

NEVER make assumptions about prices - always search for real data.`,
    });
  }

  getDestinationsByPreference(preferences) {
    const destinationMap = {
      waterfalls: ['Hundru Falls', 'Jonha Falls', 'Dassam Falls', 'Hirni Falls'],
      temples: ['Deoghar (Baidyanath Temple)', 'Rajrappa Temple', 'Pahari Mandir Ranchi'],
      forests: ['Betla National Park', 'Dalma Wildlife Sanctuary', 'Palamau Tiger Reserve'],
      hills: ['Netarhat', 'Parasnath Hill', 'Tagore Hill Ranchi'],
      valleys: ['Hundru Valley', 'Ranchi Valley', 'Koderma Valley'],
      tribal: ['Khunti District', 'Saraikela', 'Tribal villages near Ranchi'],
      adventure: ['Rock climbing at Ranchi Rock Garden', 'Trekking at Parasnath', 'River rafting'],
      heritage: ['Jagannath Temple Ranchi', 'Tribal museums', 'Archaeological sites']
    };

    let destinations = [];
    preferences.forEach(pref => {
      if (destinationMap[pref.toLowerCase()]) {
        destinations.push(...destinationMap[pref.toLowerCase()]);
      }
    });

    // Remove duplicates and limit to 5-6 destinations
    return [...new Set(destinations)].slice(0, 6);
  }

  async searchWithRetry(query, maxRetries = 2) {
    if (!this.searchTool) {
      return "Search tool not available - add TAVILY_API_KEY to environment";
    }

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const result = await this.searchTool.invoke(query);
        return result;
      } catch (error) {
        console.log(`Search attempt ${attempt} failed:`, error.message);
        if (attempt === maxRetries) {
          return `Search failed: ${error.message}`;
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }

  async gatherPricingData(origin, transport, destinations, people, days) {
    const searches = [];
    
    // Transport searches based on preference
    if (transport.includes('bus')) {
      searches.push(`bus fare ${origin} to Ranchi Jharkhand 2025 ticket price online booking`);
      searches.push(`bus ticket cost ${origin} to Jamshedpur Jharkhand 2025 current rates`);
    }
    
    if (transport.includes('train')) {
      searches.push(`train ticket price ${origin} to Ranchi Jharkhand 2025 railway fare booking`);
      searches.push(`train fare ${origin} to Dhanbad Jharkhand 2025 railway ticket cost`);
    }
    
    if (transport.includes('flight')) {
      searches.push(`flight tickets ${origin} to Ranchi airport 2025 airfare cost booking`);
    }

    // Accommodation searches
    searches.push(`hotel prices Ranchi Jharkhand per night room cost 2025 accommodation`);
    searches.push(`budget hotels Jamshedpur Jharkhand room rates 2025 lodging`);
    searches.push(`resorts near ${destinations[0]} Jharkhand accommodation rates 2025`);

    // Activity searches
    destinations.slice(0, 3).forEach(dest => {
      searches.push(`${dest} entry fee ticket price 2025 Jharkhand tourist attraction`);
    });

    searches.push(`local transport Jharkhand auto taxi fare 2025 cab rates`);
    searches.push(`food prices Jharkhand restaurant meal cost local cuisine 2025`);

    const results = {};
    
    for (let i = 0; i < Math.min(searches.length, 10); i++) {
      try {
        const result = await this.searchWithRetry(searches[i]);
        results[`search_${i + 1}`] = result;
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        console.log(`Search ${i + 1} failed:`, error.message);
        results[`search_${i + 1}`] = `Search failed: ${error.message}`;
      }
    }

    return results;
  }

  async createTravelPlan(planData) {
    const { origin, people, budget, days, transport, preferences } = planData;
    
    const recommendedDestinations = this.getDestinationsByPreference(preferences);
    console.log('Gathering pricing data...');
    const pricingData = await this.gatherPricingData(origin, transport, recommendedDestinations, people, days);

    const planningPrompt = `Create a Jharkhand travel plan using REAL PRICING DATA:

TRIP DETAILS:
- Origin: ${origin}
- People: ${people}
- Budget: Rs.${budget} total (Rs.${Math.floor(budget / people)} per person)
- Days: ${days}
- Transport Preference: ${transport.join(', ')}
- Interests: ${preferences.join(', ')}
- Recommended Destinations: ${recommendedDestinations.join(', ')}

REAL-TIME PRICING DATA:
${Object.entries(pricingData).map(([key, value]) => `${key}: ${typeof value === 'string' ? value.substring(0, 200) : value}`).join('\n')}

REQUIREMENTS:
1. Focus on destinations matching preferences: ${preferences.join(', ')}
2. Use preferred transport: ${transport.join(' or ')}
3. Create ${days}-day itinerary with real costs
4. Include specific hotel names and locations
5. Budget breakdown with actual prices from search data
6. Check budget feasibility

RESPONSE FORMAT:
**BUDGET ANALYSIS:** Feasible (YES/NO), Category (Budget/Standard/Premium)

**RECOMMENDED DESTINATIONS:** (based on ${preferences.join(', ')})
- Destination 1: [reason for recommendation]
- Destination 2: [reason for recommendation]

**TRANSPORT OPTIONS:**
- ${transport.join('/')}: [specific prices from search]

**ACCOMMODATION:**
- Hotel names and rates from search results

**${days}-DAY ITINERARY:**
Day 1: [activities + costs]
Day 2: [activities + costs]
...
Day ${days}: [activities + costs]

**COST BREAKDOWN:**
- Transport: Rs.___
- Hotels: Rs.___
- Food: Rs.___
- Attractions: Rs.___
- Local transport: Rs.___
- TOTAL: Rs.___

Keep response detailed but under 400 words.`;

    try {
      console.log('Creating travel plan...');
      const result = await this.agent.invoke({
        messages: [new HumanMessage(planningPrompt)]
      });

      return {
        success: true,
        plan: result.messages[result.messages.length - 1].content,
        destinations: recommendedDestinations,
        searchData: Object.keys(pricingData).length
      };

    } catch (error) {
      console.error('Plan creation error:', error);
      return {
        success: false,
        error: error.message,
        plan: "Unable to create travel plan at this time. Please try again."
      };
    }
  }
}

// POST handler for Next.js 15 App Router
export async function POST(request) {
  console.log('API route hit: POST /api/plan');
  
  try {
    const body = await request.json();
    console.log('Request body:', body);
    
    const { origin, people, budget, days, transport, preferences } = body;

    // Validation
    if (!origin || !people || !budget || !days || !transport || !preferences) {
      return NextResponse.json({ 
        error: 'Missing required fields: origin, people, budget, days, transport, preferences',
        received: { origin, people, budget, days, transport, preferences }
      }, { status: 400 });
    }

    if (!process.env.GOOGLE_API_KEY) {
      return NextResponse.json({ 
        error: 'Google API key not configured in environment variables' 
      }, { status: 500 });
    }

    console.log('Creating planner instance...');
    // Create planner instance
    const planner = new JharkhandTravelPlannerAPI();
    
    console.log('Generating travel plan...');
    // Generate plan
    const result = await planner.createTravelPlan({
      origin: origin.trim(),
      people: parseInt(people),
      budget: parseInt(budget),
      days: parseInt(days),
      transport: Array.isArray(transport) ? transport : [transport],
      preferences: Array.isArray(preferences) ? preferences : [preferences]
    });

    console.log('Plan generated successfully');
    return NextResponse.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}

// OPTIONS handler for CORS
export async function OPTIONS(request) {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}