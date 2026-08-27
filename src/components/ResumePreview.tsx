import { useRef, useState } from 'react';
import {
  Download,
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Code2,
  FolderGit2,
  User,
  Loader2,
  Check,
  Sparkles,
} from 'lucide-react';
import type { ResumeData } from '@/types';

interface ResumePreviewProps {
  data: ResumeData;
  onBack: () => void;
}

function formatDateRange(start: string, end: string): string {
  const s = start.trim();
  const e = end.trim();
  if (s && e) return `${s} — ${e}`;
  if (s) return s;
  if (e) return e;
  return '';
}

export default function ResumePreview({ data, onBack }: ResumePreviewProps) {
  const resumeRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [done, setDone] = useState(false);

  const handleDownload = async () => {
    if (!resumeRef.current) return;
    setDownloading(true);
    setDone(false);
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      const fileName = `${data.name.replace(/\s+/g, '_')}_Resume.pdf`;
      const opt = {
        margin: 0,
        filename: fileName,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, backgroundColor: '#ffffff' },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      };
      await html2pdf().set(opt).from(resumeRef.current).save();
      setDone(true);
      setTimeout(() => setDone(false), 2500);
    } catch (err) {
      console.error('PDF generation failed', err);
    } finally {
      setDownloading(false);
    }
  };

  const hasContact = data.email || data.phone || data.location;
  const filledEducation = data.education.filter(
    (e) => e.institution || e.degree || e.field
  );
  const filledProjects = data.projects.filter(
    (p) => p.name || p.description
  );

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Top bar */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Edit
          </button>
          <div className="hidden sm:flex items-center gap-2">
            {data.aiEnhanced && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100">
                <Sparkles className="w-3.5 h-3.5" /> AI Enhanced
              </span>
            )}
            <span className="inline-flex items-center gap-2 text-sm text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Resume ready
            </span>
          </div>
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 text-white font-semibold text-sm shadow-sm hover:bg-blue-700 transition-colors disabled:opacity-60"
          >
            {downloading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Generating...
              </>
            ) : done ? (
              <>
                <Check className="w-4 h-4" /> Downloaded
              </>
            ) : (
              <>
                <Download className="w-4 h-4" /> Download PDF
              </>
            )}
          </button>
        </div>
      </div>

      {/* Resume */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div
          ref={resumeRef}
          className="resume-page mx-auto bg-white shadow-2xl shadow-slate-300/50 animate-slide-up"
          style={{ width: '8.5in', maxWidth: '100%' }}
        >
          <div className="p-10 sm:p-14">
            {/* Header */}
            <header className="border-b-2 border-blue-600 pb-6 mb-8">
              <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
                {data.name || 'Your Name'}
              </h1>
              {data.experience && (
                <p className="text-lg text-blue-600 font-medium mt-1">
                  {data.experience}
                </p>
              )}
              {hasContact && (
                <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-4 text-sm text-slate-600">
                  {data.email && (
                    <span className="inline-flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-blue-500" />
                      {data.email}
                    </span>
                  )}
                  {data.phone && (
                    <span className="inline-flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-blue-500" />
                      {data.phone}
                    </span>
                  )}
                  {data.location && (
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-blue-500" />
                      {data.location}
                    </span>
                  )}
                </div>
              )}
            </header>

            {/* Summary */}
            {data.summary && (
              <section className="mb-8">
                <h2 className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">
                  <User className="w-3.5 h-3.5" /> Summary
                </h2>
                <p className="text-slate-700 leading-relaxed text-[15px]">
                  {data.summary}
                </p>
              </section>
            )}

            {/* Education */}
            {filledEducation.length > 0 && (
              <section className="mb-8">
                <h2 className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">
                  <GraduationCap className="w-3.5 h-3.5" /> Education
                </h2>
                <div className="space-y-4">
                  {filledEducation.map((edu) => (
                    <div key={edu.id} className="grid grid-cols-3 gap-4">
                      <div className="text-sm text-slate-500 font-medium pt-0.5">
                        {formatDateRange(edu.startDate, edu.endDate)}
                      </div>
                      <div className="col-span-2">
                        <p className="font-semibold text-slate-900 text-[15px]">
                          {edu.degree} {edu.field && `in ${edu.field}`}
                        </p>
                        <p className="text-slate-600 text-sm">
                          {edu.institution}
                        </p>
                        {edu.description && (
                          <p className="text-slate-500 text-sm mt-1 leading-relaxed">
                            {edu.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Skills */}
            {data.skills.length > 0 && (
              <section className="mb-8">
                <h2 className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">
                  <Code2 className="w-3.5 h-3.5" /> Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-md bg-blue-50 text-blue-700 text-sm font-medium border border-blue-100"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {filledProjects.length > 0 && (
              <section className="mb-8">
                <h2 className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">
                  <FolderGit2 className="w-3.5 h-3.5" /> Projects
                </h2>
                <div className="space-y-5">
                  {filledProjects.map((proj) => (
                    <div key={proj.id}>
                      <div className="flex items-baseline justify-between gap-4 flex-wrap">
                        <h3 className="font-semibold text-slate-900 text-[15px]">
                          {proj.name}
                        </h3>
                        {proj.link && (
                          <span className="text-sm text-blue-600 font-medium">
                            {proj.link}
                          </span>
                        )}
                      </div>
                      {proj.bullets && proj.bullets.length > 0 ? (
                        <ul className="mt-2 space-y-1.5">
                          {proj.bullets.map((bullet, bi) => (
                            <li
                              key={bi}
                              className="flex items-start gap-2.5 text-sm text-slate-600 leading-relaxed"
                            >
                              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        proj.description && (
                          <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                            {proj.description}
                          </p>
                        )
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Footer accent */}
            <div className="mt-10 pt-4 border-t border-slate-100 flex items-center justify-center">
              <span className="text-xs text-slate-400 font-medium tracking-wide">
                {data.name} · Resume
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
