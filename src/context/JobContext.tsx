import React, { createContext, useState, ReactNode } from 'react';
import { Job } from '../types/Job';

type JobContextType = {
  savedJobs: Job[];
  saveJob: (job: Job) => void;
  removeJob: (id: string) => void;
  isSaved: (id: string) => boolean;
  appliedJobIds: string[];
  applyToJob: (id: string) => void;
  isApplied: (id: string) => boolean;
};

export const JobContext = createContext<JobContextType>({
  savedJobs: [],
  saveJob: () => {},
  removeJob: () => {},
  isSaved: () => false,
  appliedJobIds: [],
  applyToJob: () => {},
  isApplied: () => false,
});

export const JobProvider = ({ children }: { children: ReactNode }) => {
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const [appliedJobIds, setAppliedJobIds] = useState<string[]>([]);

  const saveJob = (job: Job) => {
    setSavedJobs(prev => {
      const exists = prev.find(j => j.id === job.id);
      if (exists) return prev;
      return [...prev, job];
    });
  };

  const removeJob = (id: string) => {
    setSavedJobs(prev => prev.filter(job => job.id !== id));
  };

  const isSaved = (id: string) => savedJobs.some(job => job.id === id);

  const applyToJob = (id: string) => {
    // Mark as applied
    setAppliedJobIds(prev => {
      if (prev.includes(id)) return prev;
      return [...prev, id];
    });
    // Auto-remove from saved
    removeJob(id);
  };

  const isApplied = (id: string) => appliedJobIds.includes(id);

  return (
    <JobContext.Provider value={{ savedJobs, saveJob, removeJob, isSaved, appliedJobIds, applyToJob, isApplied }}>
      {children}
    </JobContext.Provider>
  );
};
