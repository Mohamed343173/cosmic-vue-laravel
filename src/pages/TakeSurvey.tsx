
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TakeSurvey = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});

  // Mock survey data
  const survey = {
    title: "Customer Satisfaction Survey",
    description: "Help us improve our services by sharing your feedback",
    questions: [
      {
        id: "1",
        type: "multiple-choice",
        title: "How would you rate our overall service?",
        options: ["Excellent", "Good", "Fair", "Poor"],
        required: true
      },
      {
        id: "2",
        type: "rating",
        title: "On a scale of 1-5, how likely are you to recommend us?",
        required: true
      },
      {
        id: "3",
        type: "checkbox",
        title: "Which features do you find most valuable? (Select all that apply)",
        options: ["Customer Support", "Product Quality", "Pricing", "User Interface", "Delivery Speed"],
        required: false
      },
      {
        id: "4",
        type: "textarea",
        title: "What can we do to improve your experience?",
        required: false
      },
      {
        id: "5",
        type: "text",
        title: "What is your email address? (Optional)",
        required: false
      }
    ]
  };

  const totalQuestions = survey.questions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const handleResponse = (questionId: string, value: any) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Survey responses:", responses);
    alert("Thank you for your feedback! Your responses have been submitted.");
  };

  const currentQ = survey.questions[currentQuestion];
  const isLastQuestion = currentQuestion === totalQuestions - 1;
  const canProceed = !currentQ.required || responses[currentQ.id];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <Navigation />
      
      <div className="max-w-2xl mx-auto p-6">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{survey.title}</h1>
          <p className="text-gray-600">{survey.description}</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">
              Question {currentQuestion + 1} of {totalQuestions}
            </span>
            <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">
              {currentQ.title}
              {currentQ.required && <span className="text-red-500 ml-1">*</span>}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Multiple Choice */}
            {currentQ.type === "multiple-choice" && (
              <RadioGroup
                value={responses[currentQ.id] || ""}
                onValueChange={(value) => handleResponse(currentQ.id, value)}
              >
                {currentQ.options?.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={`${currentQ.id}-${index}`} />
                    <Label htmlFor={`${currentQ.id}-${index}`} className="font-normal">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {/* Checkboxes */}
            {currentQ.type === "checkbox" && (
              <div className="space-y-3">
                {currentQ.options?.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${currentQ.id}-${index}`}
                      checked={(responses[currentQ.id] || []).includes(option)}
                      onCheckedChange={(checked) => {
                        const currentResponses = responses[currentQ.id] || [];
                        if (checked) {
                          handleResponse(currentQ.id, [...currentResponses, option]);
                        } else {
                          handleResponse(currentQ.id, currentResponses.filter((r: string) => r !== option));
                        }
                      }}
                    />
                    <Label htmlFor={`${currentQ.id}-${index}`} className="font-normal">
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            )}

            {/* Rating */}
            {currentQ.type === "rating" && (
              <div className="flex gap-4">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => handleResponse(currentQ.id, rating)}
                    className={`w-12 h-12 rounded-full border-2 transition-all ${
                      responses[currentQ.id] === rating
                        ? "bg-purple-600 border-purple-600 text-white"
                        : "border-gray-300 hover:border-purple-400"
                    }`}
                  >
                    {rating}
                  </button>
                ))}
              </div>
            )}

            {/* Text Input */}
            {currentQ.type === "text" && (
              <Input
                value={responses[currentQ.id] || ""}
                onChange={(e) => handleResponse(currentQ.id, e.target.value)}
                placeholder="Enter your answer..."
                className="w-full"
              />
            )}

            {/* Textarea */}
            {currentQ.type === "textarea" && (
              <Textarea
                value={responses[currentQ.id] || ""}
                onChange={(e) => handleResponse(currentQ.id, e.target.value)}
                placeholder="Enter your detailed response..."
                rows={4}
                className="w-full"
              />
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft size={16} />
            Previous
          </Button>

          {isLastQuestion ? (
            <Button
              onClick={handleSubmit}
              disabled={!canProceed}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 flex items-center gap-2"
            >
              Submit Survey
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={!canProceed}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 flex items-center gap-2"
            >
              Next
              <ChevronRight size={16} />
            </Button>
          )}
        </div>

        {/* Required field notice */}
        {currentQ.required && !responses[currentQ.id] && (
          <p className="text-sm text-red-500 mt-4 text-center">
            This question is required to continue
          </p>
        )}
      </div>
    </div>
  );
};

export default TakeSurvey;
