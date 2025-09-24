import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Bell, Gift, History, Trash2, ArrowRight, Shield, LogOut } from 'lucide-react';
import BottomNavigation from '../../react-app/components/BottomNavigation'; // adjust if needed
import { auth, db, appId } from '../../firebase-config'; // corrected import
import { onAuthStateChanged, signOut, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

interface UserData {
    name: string;
    email: string;
    mobile: string;
}

interface NewsArticle {
    id: number;
    image: string;
    title: string;
    description: string;
    fullTitle: string;
    fullContent: string;
    date: string;
}


export default function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState<FirebaseUser | null>(auth.currentUser);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [points] = useState(75000); // removed unused setPoints

    const newsArticles: NewsArticle[] = [
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=80&h=80&fit=crop&crop=center',
            title: 'SafeMediDisposal Green Ca...',
            description: 'SafeMediDisposal launched a green campaign by planting trees to promote environmental sus...',
            fullTitle: 'SafeMediDisposal Green Campaign: Planting a Thousand Trees',
            fullContent: '...', date: '16 March 2025'
        },
        {
            id: 2,
            image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=80&h=80&fit=crop&crop=center',
            title: 'Plastic Recycling Innovation...',
            description: 'SafeMediDisposal introduced a new technology to recycle the waste into building materials...',
            fullTitle: 'Plastic Recycling Innovation: Building Materials from Waste',
            fullContent: '...', date: '14 March 2025'
        }
    ];

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (!currentUser) {
                navigate('/auth-selection');
            } else {
                setUser(currentUser);
                try {
                    const userDocRef = doc(db, 'artifacts', appId, 'users', currentUser.uid, 'profile', 'info');
                    const docSnap = await getDoc(userDocRef);
                    if (docSnap.exists()) {
                        setUserData(docSnap.data() as UserData);
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/auth-selection');
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <div className="min-h-screen bg-[#F5F9F9] pb-20">
            {/* Header */}
            <div className="bg-[#50c2c9] px-6 pt-12 pb-8">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-white text-lg font-medium">
                        Hello 👋 {userData?.name || 'Guest'}
                    </h1>
                    <div className="flex items-center space-x-4">
                        <Link to="/notifications"><Bell className="w-6 h-6 text-white" /></Link>
                        <button onClick={handleLogout} className="text-white"><LogOut className="w-6 h-6" /></button>
                    </div>
                </div>

                {/* Points Card */}
                <div className="bg-[#111111] rounded-2xl p-6 relative">
                    <div className="mb-4 flex justify-between items-start">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                                    <div className="w-4 h-4 bg-[#50c2c9] rounded-full"></div>
                                </div>
                                <p className="text-gray-400 text-sm">Your Points</p>
                            </div>
                            <p className="text-white text-3xl font-bold">{points}</p>
                            <p className="text-gray-400 text-sm">{userData?.name || 'User'}*</p>
                        </div>
                        <div className="w-12 h-12 bg-[#50c2c9] rounded-xl flex items-center justify-center">
                            <Shield className="w-6 h-6 text-white" />
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Link to="/points-redemption" className="flex items-center gap-2 bg-[#50c2c9] px-4 py-2 rounded-full">
                            <Gift className="w-4 h-4 text-white" />
                            <span className="text-white text-sm font-medium">Redeem Point</span>
                        </Link>
                        <Link to="/history" className="flex items-center gap-2 bg-transparent border border-white px-4 py-2 rounded-full">
                            <History className="w-4 h-4 text-white" />
                            <span className="text-white text-sm font-medium">History</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Service Menu */}
            <div className="px-6 py-6">
                <h2 className="text-xl font-bold text-black mb-4">Service Menu</h2>
                <Link to="/garbage-welcome" className="block">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#50c2c9] bg-opacity-10 rounded-xl flex items-center justify-center">
                                <Trash2 className="w-6 h-6 text-[#50c2c9]" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-black">Waste Deposit</h3>
                                <p className="text-gray-500 text-sm">Earn Your Points</p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-400" />
                        </div>
                    </div>
                </Link>
            </div>

            {/* News Section */}
            <div className="px-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-black">News</h2>
                    <Link to="/news" className="text-black text-sm font-medium hover:text-[#50c2c9] transition-colors">See All</Link>
                </div>

                <div className="space-y-4">
                    {newsArticles.map(article => (
                        <Link
                            key={article.id}
                            to={`/news/${article.id}`} // fixed template literal
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
                                        <h3 className="font-semibold text-black mb-1 leading-tight">{article.title}</h3>
                                        <p className="text-gray-500 text-sm leading-relaxed">{article.description}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <BottomNavigation />
        </div>
    );
}
