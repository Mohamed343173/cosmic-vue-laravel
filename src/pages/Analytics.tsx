
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Users, TrendingUp, Clock, Star } from "lucide-react";

const Analytics = () => {
  // Mock data for charts
  const responseData = [
    { name: 'Excellent', responses: 45, percentage: 45 },
    { name: 'Good', responses: 30, percentage: 30 },
    { name: 'Fair', responses: 15, percentage: 15 },
    { name: 'Poor', responses: 10, percentage: 10 },
  ];

  const ratingData = [
    { rating: '1 Star', count: 5 },
    { rating: '2 Stars', count: 8 },
    { rating: '3 Stars', count: 20 },
    { rating: '4 Stars', count: 35 },
    { rating: '5 Stars', count: 32 },
  ];

  const timelineData = [
    { date: 'Mon', responses: 12 },
    { date: 'Tue', responses: 19 },
    { date: 'Wed', responses: 15 },
    { date: 'Thu', responses: 25 },
    { date: 'Fri', responses: 22 },
    { date: 'Sat', responses: 18 },
    { date: 'Sun', responses: 14 },
  ];

  const featureData = [
    { name: 'Customer Support', value: 35 },
    { name: 'Product Quality', value: 28 },
    { name: 'Pricing', value: 20 },
    { name: 'User Interface', value: 12 },
    { name: 'Delivery Speed', value: 5 },
  ];

  const COLORS = ['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

  const stats = [
    {
      title: "Total Responses",
      value: "1,234",
      change: "+12.5%",
      icon: <Users className="h-6 w-6 text-purple-600" />
    },
    {
      title: "Completion Rate",
      value: "87.3%",
      change: "+3.2%",
      icon: <TrendingUp className="h-6 w-6 text-green-600" />
    },
    {
      title: "Avg. Response Time",
      value: "2.4 min",
      change: "-15.8%",
      icon: <Clock className="h-6 w-6 text-blue-600" />
    },
    {
      title: "Satisfaction Score",
      value: "4.2/5",
      change: "+0.3",
      icon: <Star className="h-6 w-6 text-yellow-600" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Survey Analytics</h1>
          <p className="text-gray-600">Customer Satisfaction Survey - December 2024</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-green-600">{stat.change} from last month</p>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Service Rating Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Service Rating Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={responseData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="responses" fill="#8B5CF6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Rating Scale Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Recommendation Rating (1-5)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={ratingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="rating" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Response Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Responses This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="responses" stroke="#8B5CF6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Feature Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Most Valuable Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={featureData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {featureData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Text Responses */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Text Responses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-800 mb-2">
                  "The customer support team was incredibly helpful and resolved my issue quickly. 
                  Great experience overall!"
                </p>
                <p className="text-sm text-gray-500">Submitted 2 hours ago</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-800 mb-2">
                  "I love the new user interface design. It's much more intuitive and easier to navigate."
                </p>
                <p className="text-sm text-gray-500">Submitted 5 hours ago</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-800 mb-2">
                  "Pricing could be more competitive. Consider offering more flexible plans."
                </p>
                <p className="text-sm text-gray-500">Submitted 1 day ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
