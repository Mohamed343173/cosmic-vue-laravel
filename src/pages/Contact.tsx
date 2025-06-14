
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock, HelpCircle, MessageCircle } from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-purple-600" />,
      title: "Email Us",
      content: "support@surveyhub.com",
      description: "Send us an email anytime"
    },
    {
      icon: <Phone className="h-6 w-6 text-purple-600" />,
      title: "Call Us",
      content: "+1 (555) 123-4567",
      description: "Mon-Fri from 8am to 6pm"
    },
    {
      icon: <MapPin className="h-6 w-6 text-purple-600" />,
      title: "Visit Us",
      content: "123 Survey Street, Data City, DC 12345",
      description: "Come say hello at our office"
    },
    {
      icon: <Clock className="h-6 w-6 text-purple-600" />,
      title: "Business Hours",
      content: "Monday - Friday: 8:00 AM - 6:00 PM",
      description: "Weekend support available online"
    }
  ];

  const faqs = [
    {
      question: "How do I create my first survey?",
      answer: "Simply click on 'Create Survey' in the navigation menu and follow our intuitive step-by-step process. You can add various question types, customize the design, and set up distribution options."
    },
    {
      question: "Can I customize the appearance of my surveys?",
      answer: "Yes! SurveyHub offers extensive customization options including themes, colors, fonts, and logos to match your brand identity."
    },
    {
      question: "How many responses can I collect?",
      answer: "Our plans offer different response limits. The basic plan includes up to 1,000 responses per month, while premium plans offer unlimited responses."
    },
    {
      question: "Is my data secure and private?",
      answer: "Absolutely. We use enterprise-grade security measures including SSL encryption, secure data centers, and strict privacy controls to protect your data."
    },
    {
      question: "Can I export my survey data?",
      answer: "Yes, you can export your survey results in multiple formats including CSV, Excel, PDF, and connect with popular analytics tools."
    },
    {
      question: "Do you offer customer support?",
      answer: "We provide comprehensive support through email, live chat, and our knowledge base. Premium customers also get priority phone support."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions or need help? We're here to assist you with everything related to SurveyHub.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Send us a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                    rows={4}
                    className="mt-1"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="bg-purple-50 p-3 rounded-lg">
                        {info.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{info.title}</h3>
                        <p className="text-gray-800">{info.content}</p>
                        <p className="text-sm text-gray-600">{info.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqs.map((faq, index) => (
                <div key={index} className="space-y-2">
                  <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center mt-16 py-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Creating Surveys?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of organizations using SurveyHub to gather valuable insights.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-3"
          >
            Get Started Today
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
