import { v5 as uuidv5 } from 'uuid';
import { Job } from '../types/Job';

const API_URL = 'https://empllo.com/api/v1';
const JOB_NAMESPACE = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';

export const fetchJobs = async (): Promise<Job[]> => {
try {
const response = await fetch(API_URL);
const data = await response.json();

const rawJobs = Array.isArray(data?.jobs) ? data.jobs : [];

const jobs: Job[] = rawJobs.map((item: any) => ({
  id: uuidv5(
    item?.applicationLink ?? (item?.title + item?.companyName),
    JOB_NAMESPACE
  ),

  title: item?.title ?? 'No Title',

  company: item?.companyName ?? 'Unknown Company',

  location: Array.isArray(item?.locations)
    ? item.locations.join(', ')
    : item?.locations ?? 'Unknown Location',

  salary:
    item?.minSalary && item?.maxSalary
      ? `${item.minSalary} - ${item.maxSalary} ${item.currency ?? ''}`
      : 'Not specified',

  jobType: item?.jobType ?? 'Not specified',

  workModel: item?.workModel ?? 'Not specified',

  seniorityLevel: item?.seniorityLevel ?? 'Not specified',

  tags: item?.tags ?? [],

  description: item?.description ?? 'No description available',

  companyLogo: item?.companyLogo ?? '',

  applicationLink: item?.applicationLink ?? '#',

  pubDate: item?.pubDate ?? null,
  expiryDate: item?.expiryDate ?? null,
}));

return jobs;

} catch (error) {
console.log('Error fetching jobs:', error);
return [];
}
};