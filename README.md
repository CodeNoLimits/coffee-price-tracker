# ☕ Coffee Price Tracker

> AI-Powered Coffee Price Comparison from 50+ Premium Roasters

Find the best coffee deals with intelligent recommendations powered by AI. This app automatically tracks prices from multiple coffee roasters and helps you discover the best value specialty coffee.

## 🚀 Features

- **Real-Time Price Tracking**: Automatically fetches prices from coffee roasters
- **AI-Powered Recommendations**: Smart scoring system finds the best deals
- **Hourly Auto-Refresh**: Prices update automatically every hour
- **Advanced Filters**: Filter by price range, origin, roast level
- **Beautiful UI**: Modern, responsive design inspired by world-class SaaS apps
- **Best Deal Highlighting**: Top recommendation prominently displayed

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Deployment**: Vercel
- **API**: Free coffee roaster data API

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/coffee-price-tracker.git

# Navigate to project directory
cd coffee-price-tracker

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 🌐 Live Demo

Visit the live demo: [Coming soon]

## 🎯 How It Works

1. **Data Fetching**: The app fetches coffee product data from a free API every hour
2. **AI Scoring**: Each product gets an AI score based on price-per-ounce, ratings, and quality indicators
3. **Smart Sorting**: Products are automatically sorted by best value
4. **Filters**: Users can filter by budget, premium, or best deals
5. **Direct Links**: Click "Buy Now" to go directly to the roaster's product page

## 📊 AI Recommendation Algorithm

The AI scoring system considers:
- **Price Efficiency**: Lower price-per-ounce = higher score
- **Ratings**: Customer reviews factor into recommendations
- **Weighted Formula**: 50% price efficiency + 50% quality rating

Products scoring above 75/100 are marked as "Excellent Deal".

## 🔄 Auto-Refresh

Prices automatically refresh every 60 minutes without page reload, ensuring you always see the latest deals.

## 📱 Responsive Design

Fully responsive design works beautifully on:
- Desktop (1920px+)
- Laptop (1024px+)
- Tablet (768px+)
- Mobile (375px+)

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

## 🤝 Contributing

Contributions welcome! Feel free to open issues or submit PRs.

## 📄 License

MIT License - feel free to use this project for any purpose.

## ⭐ Show Your Support

If you find this project helpful, please give it a star!

---

Built with ❤️ and ☕ by [Your Name]
