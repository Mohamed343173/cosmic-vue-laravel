
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CheckCircle, Users, BarChart3, Clock, Shield, Zap } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: "Easy Survey Creation",
      description: "Create professional surveys in minutes with our intuitive drag-and-drop interface."
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-purple-600" />,
      title: "Real-time Analytics",
      description: "Get instant insights with beautiful charts and comprehensive reporting tools."
    },
    {
      icon: <Clock className="h-8 w-8 text-purple-600" />,
      title: "Quick Responses",
      description: "Collect responses faster with mobile-optimized surveys and smart question logic."
    },
    {
      icon: <Shield className="h-8 w-8 text-purple-600" />,
      title: "Secure & Private",
      description: "Your data is protected with enterprise-grade security and privacy controls."
    },
    {
      icon: <Zap className="h-8 w-8 text-purple-600" />,
      title: "Smart Automation",
      description: "Automate survey distribution and follow-ups to maximize response rates."
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-purple-600" />,
      title: "Easy Integration",
      description: "Connect with your favorite tools and export data in multiple formats."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Create{" "}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Powerful Surveys
              </span>
              <br />
              Get Actionable Insights
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Build engaging surveys, collect valuable feedback, and analyze results with our 
              comprehensive survey platform. Trusted by thousands of organizations worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/create">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-3">
                  Create Your First Survey
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-purple-200 hover:border-purple-300">
                View Demo
              </Button>
            </div>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-20 left-10 w-20 h-20 bg-purple-200 rounded-full opacity-50 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-blue-200 rounded-full opacity-50 animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-purple-300 rounded-full opacity-50 animate-pulse delay-2000"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform provides all the tools you need to create, distribute, and analyze surveys effectively.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of organizations already using SurveyHub to make data-driven decisions.
          </p>
          <Link to="/create">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-3">
              Start Creating Surveys Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-xl font-bold">SurveyHub</span>
            </div>
            <p className="text-gray-400">
              © 2024 SurveyHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
