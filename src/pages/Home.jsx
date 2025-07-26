import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  GlobeAltIcon,
  BoltIcon,
  ChartBarIcon,
  ClockIcon,
  CheckCircleIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

const Home = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: BoltIcon,
      title: "Fast Indexing",
      description:
        "Get your links indexed by Google and other search engines within 24 hours.",
    },
    {
      icon: ChartBarIcon,
      title: "High Success Rate",
      description:
        "Our optimized algorithms ensure the best indexing success rates for your links.",
    },
    {
      icon: ClockIcon,
      title: "Automatic Monitoring",
      description:
        "We automatically check and track the indexing status of your submitted links.",
    },
    {
      icon: ArrowPathIcon,
      title: "Re-indexing Support",
      description:
        "Automatically retry failed links to improve your overall success rate.",
    },
    {
      icon: CheckCircleIcon,
      title: "Real-time Updates",
      description:
        "Get instant notifications when your links are successfully indexed.",
    },
    {
      icon: GlobeAltIcon,
      title: "Multiple Search Engines",
      description:
        "Submit to Google, Bing, Yahoo, and other major search engines simultaneously.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Index Your Links
              <span className="block text-primary-200">Faster Than Ever</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto">
              Submit your URLs and get them indexed by Google, Bing, and other
              search engines in record time. No more waiting weeks for search
              engines to discover your content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Link
                  to="/links"
                  className="btn-primary bg-white text-primary-600 hover:bg-gray-100"
                >
                  Submit Links Now
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="btn-primary bg-white text-primary-600 hover:bg-gray-100"
                  >
                    Get Started Free
                  </Link>
                  <Link
                    to="/login"
                    className="btn-secondary bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>
            <div className="mt-8 text-primary-200">
              <p className="text-lg">
                🎉 Get 100 free credits when you sign up!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose LinkIndexer?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our advanced indexing service helps you get your content
              discovered faster by search engines, improving your SEO and
              driving more organic traffic.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  <feature.icon className="h-8 w-8 text-primary-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple, fast, and effective link indexing in just 3 steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Submit Your URLs
              </h3>
              <p className="text-gray-600">
                Enter your website URLs and we'll validate them before
                processing.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Automatic Processing
              </h3>
              <p className="text-gray-600">
                Our system submits your links to multiple search engines
                simultaneously.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Track Results
              </h3>
              <p className="text-gray-600">
                Monitor your indexing progress and get notified when links are
                indexed.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Join thousands of users who are already getting their links indexed
            faster.
          </p>
          {user ? (
            <Link
              to="/links"
              className="btn-primary bg-white text-primary-600 hover:bg-gray-100"
            >
              Submit Your First Links
            </Link>
          ) : (
            <Link
              to="/register"
              className="btn-primary bg-white text-primary-600 hover:bg-gray-100"
            >
              Start Free Trial
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
