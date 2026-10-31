// One entry per project. `slug` matches assets/videos/<slug>(-preview).mp4 and assets/posters/<slug>.jpg
window.PROJECTS = [
  {
    slug: "tracking", wide: true, client: "LEGXI",
    title: "Tracking Server",
    text: "Follows tracking links through every redirect in a real headless browser, pulls out the click IDs you choose, and keeps Google Ads tracking suffixes fresh on a schedule.",
    chips: ["Django", "Celery", "Playwright", "Google Ads API"]
  },
  {
    slug: "ga-mcp", title: "GA4 MCP Server",
    text: "Ask Claude about your Google Analytics in plain English. 10 tools, including user journeys and the pages your converters visited.",
    chips: ["Python", "FastMCP", "GA4 Data API", "OAuth"]
  },
  {
    slug: "google-ads-mcp", title: "Google Ads MCP",
    text: "Run any Google Ads report by asking. Claude writes the GAQL, works across MCC accounts and pulls Keyword Planner ideas.",
    chips: ["Python", "MCP", "Google Ads API", "GAQL"]
  },
  {
    slug: "meta-ads-mcp", title: "Meta Ads MCP",
    text: "26 tools for Meta Ads: insights from account down to ad, creatives, custom conversions, leads and change history.",
    chips: ["Python", "MCP", "Meta Marketing API"]
  },
  {
    slug: "geo-visibility-checker", title: "GEO Visibility Checker",
    text: "Does ChatGPT recommend your brand? Claude writes 10 buyer questions, ChatGPT answers them live, and you get a visibility score out of 10.",
    chips: ["Claude API", "OpenAI API", "Python"]
  },
  {
    slug: "internal-link-graph", title: "Internal Link Graph",
    text: "Paste a sitemap, get a live graph of every page and internal link. Orphan pages light up in one click.",
    chips: ["Django", "D3.js", "Concurrent crawling"]
  },
  {
    slug: "content-duplication-checker", title: "Content Duplication Checker",
    text: "Finds pages that say the same thing. Compares every page pair with TF-IDF and cosine similarity, ranked Critical, High and Medium.",
    chips: ["Python", "scikit-learn", "TF-IDF"]
  }
];
