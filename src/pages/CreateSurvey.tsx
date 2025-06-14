
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Plus, X, Settings, Eye } from "lucide-react";

interface Question {
  id: string;
  type: 'text' | 'multiple-choice' | 'checkbox' | 'rating' | 'textarea';
  title: string;
  options?: string[];
  required: boolean;
}

const CreateSurvey = () => {
  const [surveyTitle, setSurveyTitle] = useState("Untitled Survey");
  const [surveyDescription, setSurveyDescription] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);

  const addQuestion = (type: Question['type']) => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      type,
      title: "New Question",
      options: type === 'multiple-choice' || type === 'checkbox' ? ['Option 1', 'Option 2'] : undefined,
      required: false
    };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (id: string, updates: Partial<Question>) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, ...updates } : q));
  };

  const deleteQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const addOption = (questionId: string) => {
    setQuestions(questions.map(q => 
      q.id === questionId && q.options 
        ? { ...q, options: [...q.options, `Option ${q.options.length + 1}`] }
        : q
    ));
  };

  const updateOption = (questionId: string, optionIndex: number, value: string) => {
    setQuestions(questions.map(q => 
      q.id === questionId && q.options
        ? { ...q, options: q.options.map((opt, idx) => idx === optionIndex ? value : opt) }
        : q
    ));
  };

  const removeOption = (questionId: string, optionIndex: number) => {
    setQuestions(questions.map(q => 
      q.id === questionId && q.options && q.options.length > 1
        ? { ...q, options: q.options.filter((_, idx) => idx !== optionIndex) }
        : q
    ));
  };

  const questionTypes = [
    { type: 'text' as const, label: 'Text Input', icon: '📝' },
    { type: 'textarea' as const, label: 'Long Text', icon: '📄' },
    { type: 'multiple-choice' as const, label: 'Multiple Choice', icon: '🔘' },
    { type: 'checkbox' as const, label: 'Checkboxes', icon: '☑️' },
    { type: 'rating' as const, label: 'Rating Scale', icon: '⭐' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Create Survey</h1>
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Eye size={16} />
                Preview
              </Button>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                Publish Survey
              </Button>
            </div>
          </div>
        </div>

        {/* Survey Details */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Survey Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Survey Title</Label>
              <Input
                id="title"
                value={surveyTitle}
                onChange={(e) => setSurveyTitle(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                value={surveyDescription}
                onChange={(e) => setSurveyDescription(e.target.value)}
                className="mt-1"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Questions */}
        <div className="space-y-4 mb-6">
          {questions.map((question, index) => (
            <Card key={question.id} className="relative">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">Question {index + 1}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteQuestion(question.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <X size={16} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Question Title</Label>
                  <Input
                    value={question.title}
                    onChange={(e) => updateQuestion(question.id, { title: e.target.value })}
                    className="mt-1"
                  />
                </div>

                {/* Question Type Specific Content */}
                {question.type === 'multiple-choice' && (
                  <div>
                    <Label>Options</Label>
                    <div className="space-y-2 mt-2">
                      {question.options?.map((option, optIndex) => (
                        <div key={optIndex} className="flex items-center gap-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value={option} id={`${question.id}-${optIndex}`} disabled />
                            <Input
                              value={option}
                              onChange={(e) => updateOption(question.id, optIndex, e.target.value)}
                              className="flex-1"
                            />
                            {question.options && question.options.length > 1 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeOption(question.id, optIndex)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <X size={14} />
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addOption(question.id)}
                        className="mt-2"
                      >
                        <Plus size={14} className="mr-1" />
                        Add Option
                      </Button>
                    </div>
                  </div>
                )}

                {question.type === 'checkbox' && (
                  <div>
                    <Label>Options</Label>
                    <div className="space-y-2 mt-2">
                      {question.options?.map((option, optIndex) => (
                        <div key={optIndex} className="flex items-center gap-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox disabled />
                            <Input
                              value={option}
                              onChange={(e) => updateOption(question.id, optIndex, e.target.value)}
                              className="flex-1"
                            />
                            {question.options && question.options.length > 1 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeOption(question.id, optIndex)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <X size={14} />
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addOption(question.id)}
                        className="mt-2"
                      >
                        <Plus size={14} className="mr-1" />
                        Add Option
                      </Button>
                    </div>
                  </div>
                )}

                {question.type === 'rating' && (
                  <div>
                    <Label>Rating Scale (1-5)</Label>
                    <div className="flex gap-2 mt-2">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <div key={num} className="flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-sm">
                            {num}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`required-${question.id}`}
                    checked={question.required}
                    onCheckedChange={(checked) => updateQuestion(question.id, { required: !!checked })}
                  />
                  <Label htmlFor={`required-${question.id}`} className="text-sm">
                    Required question
                  </Label>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add Question Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus size={20} />
              Add Question
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {questionTypes.map((type) => (
                <Button
                  key={type.type}
                  variant="outline"
                  onClick={() => addQuestion(type.type)}
                  className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-purple-50 hover:border-purple-200"
                >
                  <span className="text-2xl">{type.icon}</span>
                  <span className="text-sm font-medium">{type.label}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateSurvey;
