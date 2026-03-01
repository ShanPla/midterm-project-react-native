export type Job = {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  salary: string;
  jobType: string;
  workModel: string;
  seniorityLevel: string;
  tags: string[];
  description: string;
  applicationLink: string;
  pubDate: number | null;
  expiryDate: number | null;
};
