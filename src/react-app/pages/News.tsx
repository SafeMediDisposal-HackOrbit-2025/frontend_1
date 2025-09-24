import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router';

interface NewsArticle {
  id: number;
  image: string;
  title: string;
  description: string;
  fullTitle: string;
  fullContent: string;
  date: string;
}

export default function News() {
  const newsArticles: NewsArticle[] = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=80&h=80&fit=crop&crop=center',
      title: 'SafeMediDisposal Green Ca...',
      description: 'In commemoration of Earth Day, SafeMediDisposal launched a green campaign by planting trees to promote environmental sus...',
      fullTitle: 'SafeMediDisposal Green Campaign: Planting a Thousand Trees',
      fullContent: `In commemoration of Earth Day, SafeMediDisposal launched a green campaign by planting a thousand trees in various cities in Indonesia. This activity involved hundreds of volunteers who enthusiastically planted trees in vacant lots and green open areas.

The purpose of this campaign is to raise public awareness about the importance of preserving the environment and reducing air pollution. SafeMediDisposal hopes that through this action, people will be more aware of the positive impact of tree planting on the environment.`,
      date: '16 March 2025'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=80&h=80&fit=crop&crop=center',
      title: 'Plastic Recycling Innovation...',
      description: 'SafeMediDisposal introduced a new technology to recycle the waste into building materials, promoting sustainable construction and reduc...',
      fullTitle: 'Plastic Recycling Innovation: Building Materials from Waste',
      fullContent: `SafeMediDisposal has introduced groundbreaking technology that transforms plastic waste into high-quality building materials. This innovative process not only addresses the growing plastic pollution problem but also provides sustainable construction solutions.

The new recycling facility processes thousands of tons of plastic waste monthly, converting them into durable construction materials including bricks, tiles, and structural components. This initiative supports circular economy principles while creating job opportunities in the green technology sector.`,
      date: '14 March 2025'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=80&h=80&fit=crop&crop=center',
      title: 'Environmental Education Pr...',
      description: 'SafeMediDisposal collaborates with several schools to conduct environmental education programs. These programs aim to raise awaren...',
      fullTitle: 'Environmental Education Programs: Raising Awareness in Schools',
      fullContent: `SafeMediDisposal has partnered with over 200 schools across Indonesia to implement comprehensive environmental education programs. These initiatives focus on teaching students about sustainable waste management, recycling practices, and environmental conservation.

The programs include interactive workshops, waste sorting activities, and tree planting sessions. Students learn practical skills for reducing waste at home and school while developing a deeper understanding of environmental challenges and solutions.`,
      date: '12 March 2025'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=80&h=80&fit=crop&crop=center',
      title: 'SafeMediDisposal Waste Ba...',
      description: 'SafeMediDisposal waste bank received an award from the Ministry of Environment for its innovative and sustainable waste management practices.',
      fullTitle: 'SafeMediDisposal Receives Environmental Excellence Award',
      fullContent: `The Ministry of Environment has recognized SafeMediDisposal with the prestigious Environmental Excellence Award for its outstanding contributions to sustainable waste management. This recognition highlights the company's innovative approaches and significant environmental impact.

The award ceremony celebrated SafeMediDisposal's waste bank initiative, which has successfully processed over 10,000 tons of medical waste while maintaining the highest safety and environmental standards. The program has become a model for other regions seeking to implement sustainable waste management solutions.`,
      date: '10 March 2025'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=80&h=80&fit=crop&crop=center',
      title: 'SafeMediDisposal Collabora...',
      description: 'SafeMediDisposal collaborates with a number of NGOs, Small and Medium Enterprises (SMEs) to enhance waste management efficiency and pr...',
      fullTitle: 'Strategic Collaborations: Partnering for Better Waste Management',
      fullContent: `SafeMediDisposal has established strategic partnerships with 50+ NGOs and SMEs to create a comprehensive waste management network. These collaborations focus on improving collection efficiency, expanding recycling capabilities, and promoting community engagement.

Through these partnerships, SafeMediDisposal has increased its waste processing capacity by 40% while providing economic opportunities for local communities. The collaborative approach ensures sustainable growth and innovation in the waste management sector.`,
      date: '8 March 2025'
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=80&h=80&fit=crop&crop=center',
      title: 'SafeMediDisposal Launches...',
      description: 'SafeMediDisposal launched a new campaign titled "Green Future Initiative" to promote responsible medical waste disposal and environ...',
      fullTitle: 'Green Future Initiative: Shaping Tomorrow\'s Environment',
      fullContent: `The Green Future Initiative represents SafeMediDisposal's most ambitious environmental campaign to date. This comprehensive program aims to reduce medical waste generation by 30% while increasing recycling rates across all partner facilities.

The initiative includes technology upgrades, staff training programs, and community outreach activities. Special focus is placed on educating healthcare providers about best practices for waste segregation and disposal, ensuring minimal environmental impact while maintaining safety standards.`,
      date: '6 March 2025'
    },
    {
      id: 7,
      image: 'https://mocha-cdn.com/0198db76-c8ba-7806-a428-601c83071fe5/rural-healthcare-services.jpg',
      title: 'SafeMediDisposal Expands ...',
      description: 'SafeMediDisposal announced the expansion of its services to rural areas, bringing sustainable waste management solutions to remote...',
      fullTitle: 'Rural Expansion: Bringing Services to Remote Communities',
      fullContent: `SafeMediDisposal's rural expansion program brings professional waste management services to previously underserved remote communities. This initiative addresses the critical need for proper medical waste disposal in areas lacking adequate infrastructure.

Mobile collection units and satellite processing facilities have been deployed to serve 150+ rural healthcare centers. The program includes training for local healthcare workers and establishment of community-based waste management systems that ensure long-term sustainability.`,
      date: '4 March 2025'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F9F9]">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center border-b border-gray-100">
        <Link to="/home" className="p-2 -ml-2">
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </Link>
        <h1 className="text-lg font-semibold text-gray-900 ml-4">News</h1>
      </div>

      {/* News Articles */}
      <div className="px-4 py-6">
        <div className="space-y-4">
          {newsArticles.map((article) => (
            <Link 
              key={article.id} 
              to={`/news/${article.id}`}
              state={{ article }}
              className="block"
            >
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                <div className="flex gap-4">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-black mb-2 leading-tight">
                      {article.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {article.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom indicator */}
      <div className="flex justify-center pb-8">
        <div className="w-32 h-1 bg-gray-900 rounded-full"></div>
      </div>
    </div>
  );
}
