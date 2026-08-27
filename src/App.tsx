import { useState } from 'react';
import ResumeForm from '@/components/ResumeForm';
import ResumePreview from '@/components/ResumePreview';
import { generateResumeWithAI } from '@/utils/aiGenerator';
import type { ResumeData } from '@/types';

const initialData: ResumeData = {
  name: '',
  email: '',
  phone: '',
  location: '',
  summary: '',
  education: [
    {
      id: crypto.randomUUID(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      description: '',
    },
  ],
  skills: [],
  projects: [
    {
      id: crypto.randomUUID(),
      name: '',
      link: '',
      description: '',
      bullets: [],
    },
  ],
  experience: '',
  aiEnhanced: false,
};

function App() {
  const [data, setData] = useState<ResumeData>(initialData);
  const [view, setView] = useState<'form' | 'loading' | 'preview'>('form');

  const handleGenerate = () => {
    setView('loading');
    setTimeout(() => {
      const enhanced = generateResumeWithAI(data);
      setData(enhanced);
      setView('preview');
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {view === 'form' && (
        <ResumeForm
          data={data}
          onChange={setData}
          onGenerate={handleGenerate}
        />
      )}
      {view === 'loading' && <LoadingScreen />}
      {view === 'preview' && (
        <ResumePreview data={data} onBack={() => setView('form')} />
      )}
    </div>
  );
}

function LoadingScreen() {
  const steps = [
    'Analyzing your skills and experience...',
    'Crafting professional bullet points...',
    'Optimizing your summary...',
    'Polishing the final resume...',
  ];
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="relative w-20 h-20 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full border-4 border-blue-100" />
          <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-blue-600 animate-pulse"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg>
          </div>
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">
          AI is enhancing your resume
        </h2>
        <p className="text-slate-500 text-sm mb-8">
          Generating professional bullet points and optimizing your content...
        </p>
        <div className="space-y-2.5">
          {steps.map((step, i) => (
            <div
              key={i}
              className="flex items-center gap-3 text-sm text-slate-600 animate-fade-in"
              style={{ animationDelay: `${i * 0.3}s`, animationFillMode: 'both' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              {step}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
