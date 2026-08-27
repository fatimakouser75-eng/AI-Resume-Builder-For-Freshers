import { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Code2,
  FolderGit2,
  Plus,
  Trash2,
  Sparkles,
  FileText,
  Briefcase,
  ChevronDown,
} from 'lucide-react';
import type { ResumeData, EducationItem, ProjectItem } from '@/types';

interface ResumeFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  onGenerate: () => void;
}

const emptyEducation = (): EducationItem => ({
  id: crypto.randomUUID(),
  institution: '',
  degree: '',
  field: '',
  startDate: '',
  endDate: '',
  description: '',
});

const emptyProject = (): ProjectItem => ({
  id: crypto.randomUUID(),
  name: '',
  link: '',
  description: '',
  bullets: [],
});

function SectionCard({
  icon: Icon,
  title,
  subtitle,
  children,
  delay,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  delay: string;
}) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-8 ${delay}`}
    >
      <div className="flex items-start gap-4 mb-6">
        <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center ring-1 ring-blue-100">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
          <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  'w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 focus:bg-white';

export default function ResumeForm({ data, onChange, onGenerate }: ResumeFormProps) {
  const [skillInput, setSkillInput] = useState('');

  const update = (patch: Partial<ResumeData>) => onChange({ ...data, ...patch });

  const addEducation = () =>
    update({ education: [...data.education, emptyEducation()] });

  const removeEducation = (id: string) =>
    update({ education: data.education.filter((e) => e.id !== id) });

  const updateEducation = (id: string, patch: Partial<EducationItem>) =>
    update({
      education: data.education.map((e) =>
        e.id === id ? { ...e, ...patch } : e
      ),
    });

  const addProject = () =>
    update({ projects: [...data.projects, emptyProject()] });

  const removeProject = (id: string) =>
    update({ projects: data.projects.filter((p) => p.id !== id) });

  const updateProject = (id: string, patch: Partial<ProjectItem>) =>
    update({
      projects: data.projects.map((p) =>
        p.id === id ? { ...p, ...patch } : p
      ),
    });

  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !data.skills.includes(trimmed)) {
      update({ skills: [...data.skills, trimmed] });
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) =>
    update({ skills: data.skills.filter((s) => s !== skill) });

  const canGenerate = data.name.trim().length > 0;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Header */}
      <div className="text-center mb-10 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-5">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span className="text-xs font-semibold text-blue-700 tracking-wide uppercase">
            AI Resume Builder
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
          Build your professional resume
        </h1>
        <p className="mt-3 text-slate-500 max-w-lg mx-auto">
          Fill in your details below and our AI will generate professional bullet
          points and a polished, recruiter-ready resume you can download as PDF.
        </p>
      </div>

      <div className="space-y-6">
        {/* Personal Info */}
        <SectionCard
          icon={User}
          title="Personal Information"
          subtitle="The basics that appear at the top of your resume"
          delay="animate-fade-in-delay-1"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <Field label="Full Name">
                <input
                  type="text"
                  className={inputClass}
                  placeholder="Jane Doe"
                  value={data.name}
                  onChange={(e) => update({ name: e.target.value })}
                />
              </Field>
            </div>
            <Field label="Email">
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  className={`${inputClass} pl-11`}
                  placeholder="jane@email.com"
                  value={data.email}
                  onChange={(e) => update({ email: e.target.value })}
                />
              </div>
            </Field>
            <Field label="Phone">
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="tel"
                  className={`${inputClass} pl-11`}
                  placeholder="+1 (555) 000-0000"
                  value={data.phone}
                  onChange={(e) => update({ phone: e.target.value })}
                />
              </div>
            </Field>
            <Field label="Location">
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  className={`${inputClass} pl-11`}
                  placeholder="San Francisco, CA"
                  value={data.location}
                  onChange={(e) => update({ location: e.target.value })}
                />
              </div>
            </Field>
            <Field label="Professional Title">
              <div className="relative">
                <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  className={`${inputClass} pl-11`}
                  placeholder="Senior Software Engineer"
                  value={data.experience}
                  onChange={(e) => update({ experience: e.target.value })}
                />
              </div>
            </Field>
            <div className="sm:col-span-2">
              <Field label="Professional Summary">
                <textarea
                  className={`${inputClass} resize-none`}
                  rows={3}
                  placeholder="A short paragraph summarizing your experience, strengths, and career goals."
                  value={data.summary}
                  onChange={(e) => update({ summary: e.target.value })}
                />
              </Field>
            </div>
          </div>
        </SectionCard>

        {/* Education */}
        <SectionCard
          icon={GraduationCap}
          title="Education"
          subtitle="Your academic background"
          delay="animate-fade-in-delay-2"
        >
          <div className="space-y-4">
            {data.education.map((edu, i) => (
              <div
                key={edu.id}
                className="relative rounded-xl border border-slate-200 bg-slate-50/40 p-5"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                    Education {i + 1}
                  </span>
                  {data.education.length > 1 && (
                    <button
                      onClick={() => removeEducation(edu.id)}
                      className="text-slate-400 hover:text-red-500 transition-colors p-1 -m-1"
                      aria-label="Remove education"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Institution">
                    <input
                      type="text"
                      className={inputClass}
                      placeholder="Stanford University"
                      value={edu.institution}
                      onChange={(e) =>
                        updateEducation(edu.id, { institution: e.target.value })
                      }
                    />
                  </Field>
                  <Field label="Degree">
                    <input
                      type="text"
                      className={inputClass}
                      placeholder="B.S."
                      value={edu.degree}
                      onChange={(e) =>
                        updateEducation(edu.id, { degree: e.target.value })
                      }
                    />
                  </Field>
                  <Field label="Field of Study">
                    <input
                      type="text"
                      className={inputClass}
                      placeholder="Computer Science"
                      value={edu.field}
                      onChange={(e) =>
                        updateEducation(edu.id, { field: e.target.value })
                      }
                    />
                  </Field>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Start">
                      <input
                        type="text"
                        className={inputClass}
                        placeholder="2018"
                        value={edu.startDate}
                        onChange={(e) =>
                          updateEducation(edu.id, { startDate: e.target.value })
                        }
                      />
                    </Field>
                    <Field label="End">
                      <input
                        type="text"
                        className={inputClass}
                        placeholder="2022"
                        value={edu.endDate}
                        onChange={(e) =>
                          updateEducation(edu.id, { endDate: e.target.value })
                        }
                      />
                    </Field>
                  </div>
                  <div className="sm:col-span-2">
                    <Field label="Description (optional)">
                      <textarea
                        className={`${inputClass} resize-none`}
                        rows={2}
                        placeholder="Relevant coursework, honors, GPA..."
                        value={edu.description}
                        onChange={(e) =>
                          updateEducation(edu.id, { description: e.target.value })
                        }
                      />
                    </Field>
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={addEducation}
              className="w-full py-3 rounded-xl border-2 border-dashed border-slate-200 text-slate-500 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/50 transition-all flex items-center justify-center gap-2 text-sm font-medium"
            >
              <Plus className="w-4 h-4" /> Add Education
            </button>
          </div>
        </SectionCard>

        {/* Skills */}
        <SectionCard
          icon={Code2}
          title="Skills"
          subtitle="Add the technologies and abilities you know"
          delay="animate-fade-in-delay-2"
        >
          <div className="flex gap-2">
            <input
              type="text"
              className={inputClass}
              placeholder="e.g. React, Python, Figma"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addSkill();
                }
              }}
            />
            <button
              onClick={addSkill}
              className="flex-shrink-0 px-5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>
          {data.skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {data.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-sm font-medium border border-blue-100 animate-scale-in"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
                    className="text-blue-400 hover:text-blue-700 transition-colors"
                    aria-label={`Remove ${skill}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </SectionCard>

        {/* Projects */}
        <SectionCard
          icon={FolderGit2}
          title="Projects"
          subtitle="Showcase what you've built"
          delay="animate-fade-in-delay-3"
        >
          <div className="space-y-4">
            {data.projects.map((proj, i) => (
              <div
                key={proj.id}
                className="relative rounded-xl border border-slate-200 bg-slate-50/40 p-5"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                    Project {i + 1}
                  </span>
                  {data.projects.length > 1 && (
                    <button
                      onClick={() => removeProject(proj.id)}
                      className="text-slate-400 hover:text-red-500 transition-colors p-1 -m-1"
                      aria-label="Remove project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Project Name">
                    <input
                      type="text"
                      className={inputClass}
                      placeholder="Personal Portfolio"
                      value={proj.name}
                      onChange={(e) =>
                        updateProject(proj.id, { name: e.target.value })
                      }
                    />
                  </Field>
                  <Field label="Link (optional)">
                    <input
                      type="text"
                      className={inputClass}
                      placeholder="github.com/jane/project"
                      value={proj.link}
                      onChange={(e) =>
                        updateProject(proj.id, { link: e.target.value })
                      }
                    />
                  </Field>
                  <div className="sm:col-span-2">
                    <Field label="Description">
                      <textarea
                        className={`${inputClass} resize-none`}
                        rows={2}
                        placeholder="What it does, the tech used, your role..."
                        value={proj.description}
                        onChange={(e) =>
                          updateProject(proj.id, { description: e.target.value })
                        }
                      />
                    </Field>
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={addProject}
              className="w-full py-3 rounded-xl border-2 border-dashed border-slate-200 text-slate-500 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/50 transition-all flex items-center justify-center gap-2 text-sm font-medium"
            >
              <Plus className="w-4 h-4" /> Add Project
            </button>
          </div>
        </SectionCard>
      </div>

      {/* Generate button */}
      <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 animate-fade-in-delay-4">
        <button
          onClick={onGenerate}
          disabled={!canGenerate}
          className="w-full sm:w-auto group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          <Sparkles className="w-5 h-5 group-hover:scale-110 transition-transform" />
          Generate Resume
          <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
        </button>
        {!canGenerate && (
          <p className="text-sm text-slate-400">
            Enter your name to continue
          </p>
        )}
      </div>

      <div className="mt-10 flex items-center justify-center gap-2 text-xs text-slate-400">
        <FileText className="w-3.5 h-3.5" />
        Your data stays in your browser — nothing is uploaded.
      </div>
    </div>
  );
}
