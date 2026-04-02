# 100 Free APIs and Datasets Every Developer Should Know

**The modern web runs on APIs, and dozens of the best ones cost nothing.** This curated directory covers 100 free (or generous free-tier) APIs and public datasets across 20 categories — all selected for clean documentation, simple authentication, and the ability to power visually impressive demo applications. Whether you're building a portfolio project, prototyping a startup, or teaching a workshop, these resources give you production-quality data with minimal setup. Each entry includes the authentication requirement, a documentation link, and a concrete app idea to spark your next build.

---

## 🌤️ Weather and climate

| # | API | Description | URL | Auth | Demo App Idea |
|---|-----|-------------|-----|------|---------------|
| 1 | **Open-Meteo** | High-resolution forecasts, 80+ years of historical data, air quality, and marine weather from national weather services worldwide | https://open-meteo.com/ | **None** | Climate change visualizer comparing current weather to the same date across past decades |
| 2 | **OpenWeatherMap** | Current weather, 5-day forecasts, air pollution, and UV index for 200,000+ cities — the most popular weather API | https://openweathermap.org/api | API key (free) | Real-time weather dashboard with animated icons, 5-day forecast, and air quality index |
| 3 | **WeatherAPI** | Real-time weather, 14-day forecasts, astronomy data (sunrise/sunset/moon phases), sports weather, and marine data | https://www.weatherapi.com/docs/ | API key (free, 1M calls/month) | Outdoor activity planner recommending best times for hiking or stargazing based on multi-factor weather data |
| 4 | **Visual Crossing** | Current conditions, 15-day forecasts, and 50+ years of historical weather with ~100 weather elements per record | https://www.visualcrossing.com/weather-api | API key (free, 1K records/day) | "What was the weather on your birthday?" lookup tool with decade-over-decade comparison charts |
| 5 | **Tomorrow.io** | AI-powered hyperlocal weather with 80+ data fields including pollen, road risk, and fire index | https://www.tomorrow.io/weather-api/ | API key (free, 500 calls/day) | Commuter weather app with minute-by-minute precipitation and road risk scores |

---

## 💰 Finance and stocks

| # | API | Description | URL | Auth | Demo App Idea |
|---|-----|-------------|-----|------|---------------|
| 6 | **Alpha Vantage** | Stock prices, forex, crypto, 60+ technical indicators, fundamentals, and AI-scored news sentiment | https://www.alphavantage.co/documentation/ | API key (free, 25 req/day) | Stock portfolio tracker with interactive price charts and technical indicator overlays |
| 7 | **Twelve Data** | Stocks, forex, crypto, ETFs with 100+ technical indicators and WebSocket streaming; SDKs for 6 languages | https://twelvedata.com/docs | API key (free, 8 credits/min) | Real-time market scanner with live WebSocket price streaming and customizable watchlists |
| 8 | **Finnhub** | Institutional-grade stock data with earnings calendars, SEC filings, IPO data, and company fundamentals | https://finnhub.io/docs/api | API key (free, 60 calls/min) | Earnings surprise tracker showing analyst estimates vs. actual results with price reaction charts |
| 9 | **Frankfurter** | Open-source exchange rates from 30+ central banks covering 160+ currencies, with historical data back to 1999 | https://frankfurter.dev/ | **None** | Currency converter with interactive historical rate charts over custom date ranges |
| 10 | **ExchangeRate-API** | Daily exchange rates for 150+ currencies with a dead-simple open-access endpoint | https://www.exchangerate-api.com/docs/free | **None** | Travel budget calculator converting amounts with real-time rates and cost-of-living context |

---

## 🗺️ Maps and geolocation

| # | API | Description | URL | Auth | Demo App Idea |
|---|-----|-------------|-----|------|---------------|
| 11 | **Nominatim (OpenStreetMap)** | Free forward/reverse geocoding powered by OpenStreetMap — convert addresses to coordinates and back | https://nominatim.org/release-docs/latest/api/Overview/ | **None** (1 req/sec) | Neighborhood explorer that reverse-geocodes clicked map positions to show address details and nearby POIs |
| 12 | **REST Countries** | Comprehensive data on 250+ countries: borders, flags, populations, currencies, languages, timezones, and calling codes | https://restcountries.com/ | **None** | World quiz game testing users on capitals, flags, and currencies with interactive country cards |
| 13 | **Mapbox** | Beautiful 3D maps, geocoding, navigation, and data visualization with web and mobile SDKs | https://docs.mapbox.com/ | API key (free, 50K map loads/month) | Restaurant finder with 3D map, walking/driving directions, and estimated travel times |
| 14 | **ip-api** | IP geolocation returning country, region, city, lat/long, timezone, and ISP for any IP address | https://ip-api.com/docs | **None** (45 req/min) | Visitor insights dashboard auto-detecting location and showing personalized local info |
| 15 | **Geoapify** | Maps, geocoding, routing, isochrones, and POI search built on open data with commercial-use rights | https://apidocs.geoapify.com/ | API key (free, 3K req/day) | Isochrone map tool showing how far you can travel by car, bike, or foot within a set time |

---

## 📰 News and media

| # | API | Description | URL | Auth | Demo App Idea |
|---|-----|-------------|-----|------|---------------|
| 16 | **NewsAPI** | Aggregates 150,000+ sources in 14 languages across 55 countries with Boolean search | https://newsapi.org/docs | API key (free for dev, 100 req/day) | Personalized news aggregator filtering headlines by topic and country in a card-based UI |
| 17 | **The Guardian Open Platform** | Full access to 1.7M+ articles back to 1999 with article body text, tags, and multimedia | https://open-platform.theguardian.com/ | API key (free, 5K calls/day) | News timeline explorer visualizing how coverage of a topic evolved over 25+ years |
| 18 | **Currents API** | Global news from 120K+ domains across 70+ countries in 20+ languages — one of the best free-tier news APIs | https://currentsapi.services/en/docs/ | API key (free, 1K req/day) | Multi-language news reader with country toggle and category filtering |
| 19 | **New York Times APIs** | Article Search (back to 1851), Top Stories, Most Popular, Books bestsellers, and Movie Reviews | https://developer.nytimes.com/ | API key (free, 500 req/day) | "This day in history" app pulling NYT articles from the same date in past decades |
| 20 | **Hacker News API (Algolia)** | Full-text search across all HN stories, comments, and users with date range filtering | https://hn.algolia.com/api | **None** | Tech trend tracker visualizing trending HN topics over time with point thresholds |

---

## 🎬 Entertainment — movies, music, games, and books

| # | API | Description | URL | Auth | Demo App Idea |
|---|-----|-------------|-----|------|---------------|
| 21 | **TMDB (The Movie Database)** | 800K+ movies and TV shows with posters, cast/crew, ratings, trailers, and trending discovery | https://developer.themoviedb.org/docs | API key (free, 40 req/10s) | Movie discovery app with trending films, cast details, and "similar movies" recommendations |
| 22 | **OMDb API** | Streamlined movie data returning IMDb, Rotten Tomatoes, and Metacritic scores in a single call | https://www.omdbapi.com/ | API key (free, 1K req/day) | Movie ratings comparator showing three critic scores side-by-side for any film |
| 23 | **RAWG** | Largest open video game database with 500K+ games, screenshots, Metacritic ratings, and where-to-buy links | https://rawg.io/apidocs | API key (free for personal use) | Game discovery platform with genre/platform filtering, screenshots, and purchase links |
| 24 | **PokéAPI** | Complete Pokémon data — species, abilities, moves, types, evolutions, and sprites for all generations | https://pokeapi.co/ | **None** (100 req/min) | Interactive Pokédex with type matchups, evolution chains, and stat comparison charts |
| 25 | **Open Library** | 30M+ book titles with cover images, author data, edition details, and reading logs from Internet Archive | https://openlibrary.org/developers/api | **None** | Personal reading tracker with book search, cover art, reading lists, and progress tracking |
| 26 | **Jikan (MyAnimeList)** | Anime and manga data including synopsis, ratings, episodes, characters, seasonal charts, and recommendations | https://docs.api.jikan.moe/ | **None** (~3 req/sec) | Anime discovery app with seasonal charts, top-rated lists, and recommendation engine |
| 27 | **MusicBrainz** | Open music encyclopedia with 1.7M+ artists, 2.5M+ releases, and comprehensive recording metadata | https://musicbrainz.org/doc/MusicBrainz_API | **None** (1 req/sec, User-Agent required) | Music catalog explorer with artist discographies, release timelines, and related artists |

---

## ⚽ Sports

| # | API | Description | URL | Auth | Demo App Idea |
|---|-----|-------------|-----|------|---------------|
| 28 | **TheSportsDB** | Open, crowd-sourced multi-sport database covering NFL, NBA, soccer, cricket with team logos and fan art | https://www.thesportsdb.com/documentation | Test key "3" (free) | Multi-sport dashboard with upcoming events, team badges, and past results across leagues |
| 29 | **BallDontLie** | Sports data across 20+ leagues (NBA, NFL, MLB, NHL, EPL) with live scores, stats, and betting odds | https://www.balldontlie.io/docs | API key (free, 5 req/min) | NBA player comparison tool with head-to-head season averages and career trajectory charts |
| 30 | **Football-Data.org** | Soccer data for 12 major competitions (Premier League, La Liga, Champions League) with fixtures and standings | https://www.football-data.org/documentation/quickstart | API key (free, 10 calls/min) | Live soccer dashboard with league tables, upcoming fixtures, and recent results |
| 31 | **API-Football** | One of the most complete football/soccer APIs with livescores, player stats, odds, and transfers | https://www.api-football.com/ | API key (free, 100 req/day) | Fantasy football assistant with player form ratings and fixture difficulty analysis |
| 32 | **The Odds API** | Aggregated betting odds from major sportsbooks across NFL, NBA, soccer, tennis, and MMA | https://the-odds-api.com/ | API key (free, 500 credits/month) | Odds comparison tool finding the best lines across sportsbooks for upcoming games |

---

## 🚀 Science and space

| # | API | Description | URL | Auth | Demo App Idea |
|---|-----|-------------|-----|------|---------------|
| 33 | **NASA APIs** | Astronomy Picture of the Day, Mars Rover photos, asteroid tracking, Earth imagery, and satellite data — 15 TB collected daily | https://api.nasa.gov/ | API key (free; `DEMO_KEY` works) | Daily space dashboard with APOD image, nearby asteroids, and latest Mars rover photos |
| 34 | **SpaceX API** | Launch history, rockets, capsules, Starlink satellites, launchpads, and landing pads for all SpaceX missions | https://github.com/r-spacex/SpaceX-API | **None** | SpaceX launch tracker with timeline, rocket reuse stats, and countdown to next launch |
| 35 | **Open Notify (ISS)** | Real-time International Space Station position (lat/long) and current crew manifest | http://open-notify.org/Open-Notify-API/ | **None** | Live ISS tracker on an interactive map with crew info and ground track trail |
| 36 | **USGS Earthquake Hazards** | Real-time global earthquake data in GeoJSON — filter by time, magnitude, and geographic bounding box | https://earthquake.usgs.gov/fdsnws/event/1/ | **None** | Global earthquake monitor map with magnitude-coded markers and date/magnitude filters |
| 37 | **Launch Library 2 (TheSpaceDevs)** | All orbital launches worldwide, space events, astronaut data, and agency info — past and upcoming | https://thespacedevs.com/llapi | **None** (15 req/hr unregistered) | Space launch calendar with countdowns, live stream links, and launch site maps |

---

## 🏛️ Government and public data

| # | API | Description | URL | Auth | Demo App Idea |
|---|-----|-------------|-----|------|---------------|
| 38 | **World Bank Indicators** | 16,000 development indicators for 200+ countries spanning 50+ years — GDP, poverty, health, education, climate | https://datahelpdesk.worldbank.org/knowledgebase/articles/889392 | **None** | Global development dashboard comparing countries with animated time-lapse charts |
| 39 | **U.S. Census Bureau** | Dozens of datasets (ACS, Decennial Census) with demographics, housing, income, and education down to block-group level | https://www.census.gov/data/developers.html | API key (free) | U.S. demographic explorer with interactive county-level maps and regional comparisons |
| 40 | **FBI Crime Data** | Uniform Crime Reporting data from 18,000+ law enforcement agencies with offense, arrest, and clearance stats | https://cde.ucr.cjis.gov/ | API key (free via data.gov) | Crime statistics explorer with state/city maps and decade-over-decade trend analysis |
| 41 | **FBI Most Wanted** | Fugitive data with photos, descriptions, reward amounts, and field office assignments | https://www.fbi.gov/wanted/api | **None** | Searchable wanted persons browser with photo cards, reward info, and field office map |
| 42 | **Data.gov** | Gateway to 250,000+ federal datasets from 25+ agencies covering health, energy, environment, and transport | https://data.gov/developers/apis/ | API key (free, 1K req/hr) | Federal open data meta-search engine with dataset preview and one-click API access |

---

## 🍔 Food and nutrition

| # | API | Description | URL | Auth | Demo App Idea |
|---|-----|-------------|-----|------|---------------|
| 43 | **TheMealDB** | Open meal recipe database with images, ingredients, instructions, and category/area filtering | https://www.themealdb.com/api.php | Test key "1" (no signup) | "What's for dinner?" app with random recipes, ingredient lists, and step-by-step instructions |
| 44 | **TheCocktailDB** | Crowd-sourced cocktail recipes with high-quality images, ingredient lists, and glass type info | https://www.thecocktaildb.com/api.php | Test key "1" (no signup) | Cocktail discovery app — search by ingredient ("What can I make with gin?") with full recipes |
| 45 | **Spoonacular** | 380,000+ recipes with meal planning, nutrition analysis, and "what's in my fridge" ingredient search | https://spoonacular.com/food-api | API key (free, 150 req/day) | Smart meal planner matching recipes to available ingredients with dietary restriction filters |
| 46 | **Open Food Facts** | Collaborative database of 4M+ food products — scan barcodes for ingredients, Nutri-Score, allergens, and nutrition | https://openfoodfacts.github.io/openfoodfacts-server/api/ | **None** (reads) | Barcode scanner nutrition app with Nutri-Score, allergen warnings, and healthy alternatives |
| 47 | **USDA FoodData Central** | Official U.S. government nutrition database with comprehensive macro/micronutrient data for thousands of foods | https://fdc.nal.usda.gov/api-guide/ | API key (free; `DEMO_KEY` available) | Nutrition comparison tool showing side-by-side macro/micronutrient breakdowns with charts |

---

## 🏥 Health and medical

| # | API | Description | URL | Auth | Demo App Idea |
|---|-----|-------------|-----|------|---------------|
| 48 | **OpenFDA** | FDA datasets on drug adverse events, labeling, recalls, medical devices, and food recalls with rich querying | https://open.fda.gov/apis/ | Optional key (40 req/min without, 240 with) | Drug safety explorer showing adverse events, recall history, and labeling info with frequency charts |
| 49 | **disease.sh** | Open disease statistics for COVID-19 and influenza — global, country-wise, and historical data with vaccination tracking | https://disease.sh/docs/ | **None** | Global disease dashboard with interactive maps, country comparisons, and vaccination progress |
| 50 | **WHO Global Health Observatory** | Global health statistics from 194 countries — life expectancy, mortality, disease burden, and health systems data | https://www.who.int/data/gho/info/gho-odata-api | **None** | Health comparison tool visualizing life expectancy, infant mortality, and spending across countries |
| 51 | **HealthCare.gov API** | Educational content about the U.S. Health Insurance Marketplace in English and Spanish, CORS-enabled | https://www.healthcare.gov/developers/ | **None** | Health insurance literacy tool with glossary, coverage articles, and preventive care topics |
| 52 | **CDC Open Data** | Public health data including disease statistics, vaccination rates, and health conditions by region | https://open.cdc.gov/apis.html | Varies (many open) | Public health trends visualization with disease rates and vaccination coverage across U.S. states |

---

## 🤖 AI and machine learning

| # | API | Description | URL | Auth | Demo App Idea |
|---|-----|-------------|-----|------|---------------|
| 53 | **Hugging Face Inference** | Serverless access to 800,000+ open-source models for text generation, image generation, classification, and speech | https://huggingface.co/docs/api-inference/en/index | Free token | Multi-task AI playground with sentiment analysis, summarization, and image classification in one UI |
| 54 | **Google Gemini** | Frontier multimodal models handling text, code, images, video, and audio with up to 1M token context | https://ai.google.dev/docs | API key (free) | Document Q&A app that analyzes uploaded PDFs or images and answers questions about them |
| 55 | **Groq** | Ultra-fast open-source LLM inference (Llama 3, Mistral) on specialized LPU hardware with OpenAI-compatible API | https://console.groq.com/docs | API key (free) | Speed-demonstrating AI chatbot with near-instant responses for interactive Q&A |
| 56 | **remove.bg** | AI-powered background removal from images — supports people, products, animals, and cars | https://www.remove.bg/api | API key (free, 50 calls/month) | Profile photo editor removing backgrounds and replacing with custom colors or images |
| 57 | **Clarifai** | Visual AI platform for image/video recognition, object detection, face detection, and custom model training | https://docs.clarifai.com/ | API key (free community plan) | Image auto-tagger that detects objects and generates descriptive tags from uploaded photos |

---

## 💬 Social media and communication

| # | API | Description | URL | Auth | Demo App Idea |
|---|-----|-------------|-----|------|---------------|
| 58 | **GitHub REST API** | Repos, users, commits, issues, pull requests, gists, and organizations — the developer's social network | https://docs.github.com/en/rest | **None** for public data (60 req/hr) | Developer portfolio generator creating visual profiles from GitHub repos, languages, and contributions |
| 59 | **Reddit (JSON)** | Public posts, comments, and subreddit data — append `.json` to any Reddit URL for instant API access | https://www.reddit.com/dev/api/ | **None** for `.json` endpoints | Subreddit sentiment analyzer visualizing mood and trending topics with word clouds |
| 60 | **Mastodon** | Decentralized social network API — read public timelines, search posts/users/hashtags without authentication | https://docs.joinmastodon.org/client/intro/ | **None** for public reads | Fediverse explorer browsing public timelines and trending hashtags across Mastodon instances |
| 61 | **Discord** | Build bots with access to channels, messages, users, guilds, reactions, slash commands, and webhooks | https://discord.com/developers/docs/intro | Bot token (free) | Community moderation bot with welcome messages, auto-moderation, and activity stats |
| 62 | **Gravatar** | Globally recognized avatars and profiles based on email hash — used by WordPress, GitHub, and Stack Overflow | https://docs.gravatar.com/api/ | **None** | Contact card generator creating stylish digital cards from email addresses |

---

## 🐾 Animals and nature

| # | API | Description | URL | Auth | Demo App Idea |
|---|-----|-------------|-----|------|---------------|
| 63 | **Dog CEO Dog API** | 20,000+ dog images across 120+ breeds — the internet's biggest open-source dog photo collection | https://dog.ceo/dog-api/documentation/ | **None** | Dog breed explorer with random photos, sub-breed browsing, and "Guess the Breed" game |
| 64 | **Cat Facts (catfact.ninja)** | Random cat facts API — simple, fun, and perfect for beginner projects | https://catfact.ninja/ | **None** | Daily cat facts widget with sharing buttons and a favorites collection |
| 65 | **eBird API 2.0** | Birding observations from Cornell Lab — recent/notable sightings, species info, hotspots, and taxonomy | https://documenter.getpostman.com/view/664302/S1ENwy59 | API key (free) | Birdwatching companion showing rare sightings near you on a map with species info |
| 66 | **iNaturalist** | Millions of citizen-science wildlife observations (photos, species IDs, locations) covering all taxa worldwide | https://api.inaturalist.org/v1/docs/ | **None** for reads | Nature identification explorer mapping nearby wildlife observations with community-verified IDs |
| 67 | **Xeno-canto** | World's largest collection of bird sounds — search by species, country, and recording quality | https://xeno-canto.org/explore/api | **None** | Bird song learning app where users identify species by sound and explore calls from around the world |

---

## ✈️ Transportation and travel

| # | API | Description | URL | Auth | Demo App Idea |
|---|-----|-------------|-----|------|---------------|
| 68 | **OpenSky Network** | Real-time and historical air traffic surveillance from 6,000+ ADS-B sensors tracking aircraft globally | https://openskynetwork.github.io/opensky-api/ | **None** (100 credits/day) | Live flight radar showing aircraft positions on an interactive map with real-time updates |
| 69 | **Amadeus for Developers** | Industry-leading travel APIs for flight search, hotel search, airport info, and travel recommendations | https://developers.amadeus.com/self-service | API key (OAuth2 client credentials, free test env) | Flight deal finder with price calendar visualization and airline comparisons |
| 70 | **AviationStack** | Real-time flight tracking, schedules, airline routes, and airport data covering 250+ countries | https://aviationstack.com/documentation | API key (free, 100 req/month) | Airport arrivals/departures board with real-time flight status and delay alerts |
| 71 | **OpenRouteService** | Open-source routing, isochrones, and elevation profiles for car, bike, wheelchair, and hiking on OSM data | https://openrouteservice.org/dev/#/api-docs | API key (free, 2K req/day) | Multi-modal route planner comparing driving, cycling, and walking with elevation profiles |
| 72 | **GraphHopper** | Open-source routing engine with turn-by-turn directions, route optimization, and matrix calculations | https://docs.graphhopper.com/ | API key (free, 500 req/day) | Road trip optimizer calculating best stop order across multiple destinations |

---

## 📚 Education and reference

| # | API | Description | URL | Auth | Demo App Idea |
|---|-----|-------------|-----|------|---------------|
| 73 | **Wikipedia / MediaWiki** | Access all Wikimedia content — article text, search, page history, images, and metadata in JSON/HTML | https://www.mediawiki.org/wiki/API:REST_API | **None** | "Knowledge rabbit hole" explorer fetching random articles with related topic navigation |
| 74 | **Open Trivia Database** | 4,700+ verified trivia questions across 24 categories with difficulty levels and session tokens to avoid repeats | https://opentdb.com/api_config.php | **None** | Multiplayer trivia game with category selection, timer, difficulty progression, and leaderboards |
| 75 | **Free Dictionary API** | Word definitions, phonetics with audio pronunciation, example sentences, synonyms, and antonyms | https://dictionaryapi.dev/ | **None** | Vocabulary builder with pronunciation audio, usage examples, and spaced-repetition quizzes |
| 76 | **Numbers API** | Fun facts about numbers — trivia, math properties, date facts, and year facts in plain text or JSON | https://numbersapi.com/ | **None** | "This day in history" + number trivia app showing interesting facts about any date or number |
| 77 | **Universities List (Hipolabs)** | Search university names, domains, and websites worldwide — filter by name and/or country | https://github.com/Hipo/university-domains-list-api | **None** | University search and comparison tool with country filtering and links to official websites |

---

## 🪙 Cryptocurrency and blockchain

| # | API | Description | URL | Auth | Demo App Idea |
|---|-----|-------------|-----|------|---------------|
| 78 | **CoinGecko** | The most comprehensive free crypto API — 12,000+ coins, 500+ exchanges, NFTs, and on-chain DEX data | https://www.coingecko.com/en/api/documentation | API key (free, 30 calls/min) | Crypto portfolio tracker with real-time prices, historical charts, and trending coins feed |
| 79 | **CoinCap** | Real-time crypto prices with REST and WebSocket streaming, aggregated from multiple exchanges | https://docs.coincap.io/ | **None** (optional key) | Live crypto ticker board with WebSocket-powered animated price updates |
| 80 | **CoinMarketCap** | World's #1 crypto platform API with global metrics, BTC dominance, trending data, and exchange info | https://coinmarketcap.com/api/documentation/v1/ | API key (free, 10K calls/month) | Crypto market overview with global metrics, top gainers/losers, and market cap treemap |
| 81 | **Blockchain.com Explorer** | Bitcoin on-chain data — block details, transaction info, address balances, and network statistics | https://www.blockchain.com/explorer/api | **None** | Bitcoin block explorer for searching transactions and tracking whale wallet movements |
| 82 | **CoinPaprika** | Extensive crypto data with generous free access — tickers, coin details, exchanges, and global data | https://api.coinpaprika.com/ | **None** | Crypto coin ranker with custom metrics, side-by-side comparisons, and historical ranking changes |

---

## 🛒 E-commerce and products

| # | API | Description | URL | Auth | Demo App Idea |
|---|-----|-------------|-----|------|---------------|
| 83 | **Fake Store API** | Realistic e-commerce data (20 products with real images) plus carts, users, and JWT login endpoints | https://fakestoreapi.com/docs | **None** | Full e-commerce storefront with product listing, cart, user auth, and checkout flow |
| 84 | **DummyJSON** | Feature-rich fake API with 30+ product categories plus users, posts, comments, todos, and recipes; REST and GraphQL | https://dummyjson.com/docs | **None** | Multi-feature dashboard combining product browsing, social feed, and task management |
| 85 | **JSONPlaceholder** | The classic fake REST API — 6 interconnected resources (posts, comments, albums, photos, todos, users) with full CRUD | https://jsonplaceholder.typicode.com/ | **None** | Full-stack CRUD demo blog/task manager demonstrating REST API integration skills |
| 86 | **Platzi Fake Store** | E-commerce API with JWT auth (access + refresh tokens), product filtering, file uploads, and GraphQL support | https://fakeapi.platzi.com/en/about/introduction/ | **None** / JWT for auth routes | Secure e-commerce app with login/registration, token refresh flows, and image uploads |
| 87 | **Open Products Facts** | Open-source database for non-food products (cosmetics, pet food, household items) with barcode lookup | https://world.openproductsfacts.org/data | **None** (reads) | Product safety scanner flagging harmful cosmetic ingredients with eco-friendly alternatives |

---

## 🎨 Art and design

| # | API | Description | URL | Auth | Demo App Idea |
|---|-----|-------------|-----|------|---------------|
| 88 | **Metropolitan Museum of Art** | 470,000+ artworks spanning 5,000 years with high-res CC0-licensed public domain images | https://metmuseum.github.io/ | **None** | "Art of the day" app with random masterworks, high-res zoom, and artist context |
| 89 | **Rijksmuseum** | 800,000+ objects from Amsterdam's Rijksmuseum with tiled zoom images and CC-BY licensing | https://data.rijksmuseum.nl/docs/ | API key (free, instant) | Dutch Masters explorer with hi-res zoomable paintings and virtual exhibition builder |
| 90 | **Art Institute of Chicago** | Artworks, artists, and exhibitions with full-text search and IIIF high-res images — all CC0 | https://api.artic.edu/docs/ | **None** | Art history learning app exploring works by movement with quizzes about artists and periods |
| 91 | **Unsplash** | 3M+ editorial-quality free photos — the standard for stock photography APIs, used by 20,000+ apps | https://unsplash.com/developers | API key (free, 50 req/hr demo) | Visual mood board creator with theme-based photo search and drag-and-drop collage builder |
| 92 | **Lorem Picsum** | "Lorem Ipsum for photos" — placeholder images at any dimensions via URL parameters with blur and grayscale | https://picsum.photos/ | **None** | UI mockup generator auto-populating designs with properly sized placeholder images |

---

## 🌐 Language and text

| # | API | Description | URL | Auth | Demo App Idea |
|---|-----|-------------|-----|------|---------------|
| 93 | **LibreTranslate** | Free, open-source machine translation supporting 30+ languages — self-hostable with no third-party dependencies | https://libretranslate.com/docs/ | API key on public instance; **none** if self-hosted | Real-time multilingual chat where messages auto-translate between participants' languages |
| 94 | **LanguageTool** | Open-source grammar, spelling, and style checker for 30+ languages catching errors spell-checkers miss | https://languagetool.org/http-api/ | **None** (20 req/min) | Writing assistant highlighting grammar mistakes in real-time with inline correction suggestions |
| 95 | **Datamuse** | Word-finding engine for rhymes, synonyms, antonyms, sound-alikes, and concept-related words — powers RhymeZone | https://www.datamuse.com/api/ | **None** (100K req/day) | Creative writing toolkit with rhyme finder, thesaurus, and word explorer for poets and songwriters |
| 96 | **PoetryDB** | The internet's first poetry API — search classic poems by author, title, lines, or line count | https://github.com/thundercomb/poetrydb | **None** | Daily poetry reader pulling poems by author or theme with beautiful typographic display |
| 97 | **Fun Translations** | Translate text into 50+ fun languages — Yoda, Pirate, Shakespeare, Klingon, Morse Code, and more | https://funtranslations.com/api | **None** (5 req/hr free) | Party message translator with toggles for Yoda, Pirate, and Shakespeare speech with share buttons |

---

## 🎲 Miscellaneous fun and interesting

| # | API | Description | URL | Auth | Demo App Idea |
|---|-----|-------------|-----|------|---------------|
| 98 | **RandomUser** | Generate realistic fake user data — names, emails, addresses, phone numbers, and profile photos for 30+ nationalities | https://randomuser.me/documentation | **None** | Mock social network UI populated with realistic profiles for UI/UX prototyping |
| 99 | **JokeAPI** | Unified jokes in 6 categories (programming, pun, misc, dark, spooky, Christmas) with safe-mode filtering and multilingual support | https://v2.jokeapi.dev/ | **None** (120 req/min) | Joke-of-the-day widget with category filters, safe mode toggle, and embeddable web component |
| 100 | **Chuck Norris Jokes** | Hand-curated Chuck Norris facts with category filtering, text search, and Slack/Messenger integration | https://api.chucknorris.io/ | **None** | Daily humor dashboard with category selection, search, and social sharing |
| 101 | **Advice Slip** | Random life advice in clean JSON — minimal, fast, and perfect for quick integrations | https://api.adviceslip.com/ | **None** | Virtual fortune cookie app with cracking animation revealing random advice |
| 102 | **Deck of Cards** | Simulate a deck of playing cards — draw, shuffle, create piles, and manage multiple decks via REST | https://deckofcardsapi.com/ | **None** | Browser-based card game (Blackjack, War, or Solitaire) with animated card drawing |

---

## How to pick the right API for your next project

The **42 APIs above that require zero authentication** (marked "None") are the fastest path from idea to working demo — no signup, no keys, no waiting. They're ideal for hackathons, tutorials, and proof-of-concepts where every minute counts. Open-Meteo, REST Countries, PokéAPI, JSONPlaceholder, and the museum APIs stand out here as particularly rich datasets that need zero setup.

For more powerful builds, the **API-key-required options** (TMDB, NASA, CoinGecko, Hugging Face, OpenWeatherMap) unlock substantially richer data while keeping the signup process under two minutes. None of these require a credit card or complex OAuth flows — you register, get a key, and start querying.

The strongest portfolio projects typically **combine 2-3 APIs** from different categories. A flight tracker (OpenSky) plotted on a map (Mapbox) with destination weather (Open-Meteo) is far more impressive than any single-API demo. A recipe app (TheMealDB) with nutrition analysis (USDA FoodData) and ingredient photos (Unsplash) tells a richer story. The developer who stitches APIs together demonstrates the architecture and integration skills that hiring managers actually look for.

Several patterns emerge across the strongest entries. **Government and institutional APIs** (NASA, USGS, World Bank, Census Bureau, FDA) tend to be the most generous with rate limits and the most stable long-term — they're funded by taxpayers, not VC runway. **Community-maintained APIs** (PokéAPI, TheSportsDB, MusicBrainz, Open Library) offer the deepest niche data but may have slower update cycles. **Commercial free-tier APIs** (TMDB, CoinGecko, Mapbox) provide the most polished developer experience but carry the risk of future pricing changes — always check current terms before building production features on them.

One final note: API availability and rate limits shift over time. The documentation URLs above were verified as of early 2026, but always confirm current terms on the official site before committing to a project. The GitHub repository **public-apis/public-apis** (418,000+ stars) remains the single best living reference for discovering new additions as they appear.