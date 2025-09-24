import { ChevronLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router';

interface NewsArticle {
  id: number;
  image: string;
  title: string;
  fullTitle: string;
  description: string;
  fullContent: string;
  date: string;
}

export default function NewsDetail() {
  const location = useLocation();
  const article = location.state?.article;

  // Default article data if none is passed
  const defaultArticle: NewsArticle = {
    id: 1,
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=400&fit=crop&crop=center',
    title: 'SafeMediDisposal Green Ca...',
    fullTitle: 'SafeMediDisposal Green Campaign: Planting a Thousand Trees',
    description: 'SafeMediDisposal launched a green campaign by planting trees to promote environmental sus...',
    fullContent: `In commemoration of Earth Day, SafeMediDisposal launched a green campaign by planting a thousand trees in various cities in Indonesia. This activity involved hundreds of volunteers who enthusiastically planted trees in vacant lots and green open areas.

The purpose of this campaign is to raise public awareness about the importance of preserving the environment and reducing air pollution. SafeMediDisposal hopes that through this action, people will be more aware of the positive impact of tree planting on the environment.`,
    date: '16 March 2025'
  };

  const currentArticle = article || defaultArticle;

  return (
    <div className="min-h-screen bg-[#F5F9F9]">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center border-b border-gray-100">
        <Link to="/news" className="p-2 -ml-2">
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </Link>
        <h1 className="text-lg font-semibold text-gray-900 ml-4">News Detail</h1>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {/* News Image */}
        <div className="mb-6">
          <img
            src={currentArticle.image.replace(/w=\d+&h=\d+/, 'w=1000&h=500')}
            alt={currentArticle.fullTitle}
            className="w-full h-80 rounded-2xl object-cover shadow-lg"
          />
        </div>

        {/* News Content */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          {/* Title */}
          <h1 className="text-xl font-bold text-black mb-4 leading-tight">
            {currentArticle.fullTitle}
          </h1>

          {/* Date */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-gray-600"></div>
            </div>
            <p className="text-gray-500 text-sm">
              {currentArticle.date}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-sm max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {currentArticle.fullContent}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom indicator */}
      <div className="flex justify-center pb-8">
        <div className="w-32 h-1 bg-gray-900 rounded-full"></div>
      </div>
    </div>
  );
}
