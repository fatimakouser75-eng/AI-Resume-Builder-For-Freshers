import type { ResumeData, ProjectItem } from '@/types';

const ACTION_VERBS = [
  'Developed',
  'Engineered',
  'Designed',
  'Architected',
  'Implemented',
  'Built',
  'Created',
  'Delivered',
  'Optimized',
  'Spearheaded',
  'Pioneered',
  'Launched',
];

const IMPACT_METRICS = [
  'reducing load times by 40%',
  'serving over 1,000 active users',
  'improving system efficiency by 30%',
  'cutting manual effort by 50%',
  'increasing user engagement by 25%',
  'supporting 10K+ daily requests',
  'achieving 99.9% uptime',
  'reducing error rates by 60%',
];

const TECH_PHRASES = [
  'using a modern tech stack',
  'with a focus on scalability and maintainability',
  'leveraging best practices and clean architecture',
  'following agile development methodologies',
  'with comprehensive test coverage',
  'using responsive, accessible design principles',
];

function pick<T>(arr: T[], offset: number): T {
  return arr[offset % arr.length];
}

function generateProjectBullets(proj: ProjectItem, index: number): string[] {
  const bullets: string[] = [];
  const name = proj.name.trim() || 'the project';

  if (proj.description.trim()) {
    const desc = proj.description.trim();
    const verb = pick(ACTION_VERBS, index);
    bullets.push(`${verb} ${desc.charAt(0).toLowerCase()}${desc.slice(1)}`);
  } else {
    bullets.push(
      `${pick(ACTION_VERBS, index)} ${name} from the ground up ${pick(
        TECH_PHRASES,
        index
      )}`
    );
  }

  bullets.push(
    `${pick(ACTION_VERBS, index + 1)} key features for ${name}, ${pick(
      IMPACT_METRICS,
      index
    )} ${pick(TECH_PHRASES, index + 1)}`
  );

  bullets.push(
    `Collaborated on ${name} ${pick(TECH_PHRASES, index + 2)}, ensuring robust performance and a seamless user experience`
  );

  return bullets;
}

function generateSummary(data: ResumeData): string {
  const name = data.name.trim() || 'A dedicated professional';
  const title = data.experience.trim();

  const skillPhrase =
    data.skills.length > 0
      ? ` with expertise in ${data.skills.slice(0, 4).join(', ')}${
          data.skills.length > 4 ? ', and more' : ''
        }`
      : '';

  const projectPhrase =
    data.projects.filter((p) => p.name.trim()).length > 0
      ? ' Proven track record of delivering impactful projects from concept to deployment.'
      : '';

  const titleClause = title
    ? `Results-driven ${title}${skillPhrase} with a passion for building innovative solutions.`
    : `${name}${skillPhrase} with a passion for building innovative solutions and solving complex problems.`;

  return `${titleClause}${projectPhrase} Adept at collaborating in fast-paced environments and translating requirements into reliable, high-quality deliverables.`;
}

export function generateResumeWithAI(data: ResumeData): ResumeData {
  const filledProjects = data.projects.filter(
    (p) => p.name.trim() || p.description.trim()
  );

  const enhancedProjects = data.projects.map((proj, i) => {
    const filled = filledProjects.findIndex(
      (p) => p.id === proj.id
    );
    if (filled === -1) return proj;
    return {
      ...proj,
      bullets: generateProjectBullets(proj, i),
    };
  });

  const summary = data.summary.trim()
    ? data.summary.trim()
    : generateSummary(data);

  return {
    ...data,
    summary,
    projects: enhancedProjects,
    aiEnhanced: true,
  };
}
