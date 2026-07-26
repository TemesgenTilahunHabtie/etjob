import {
  createCandidateProfile,
  updateCandidateProfile,
  addSkillToCandidate,
  removeSkillFromCandidate,
  updateJobPreferences,
  CandidateProfileRow,
  CandidateProfileInsert,
  CandidateProfileUpdate,
  CandidateSkillRow,
  JobPreferenceRow,
  FullCandidateProfile,
  getCandidateProfileByUserId,
} from "./candidates";
import { saveJob, unsaveJob, getSavedJobs, SavedJobWithJob } from "./savedJobs";

export {
  createCandidateProfile,
  updateCandidateProfile,
  addSkillToCandidate as addSkill,
  removeSkillFromCandidate as removeSkill,
  updateJobPreferences as updatePreferences,
  getCandidateProfileByUserId,
  saveJob,
  unsaveJob,
  getSavedJobs,
};

export type {
  CandidateProfileRow,
  CandidateProfileInsert,
  CandidateProfileUpdate,
  CandidateSkillRow,
  JobPreferenceRow,
  FullCandidateProfile,
  SavedJobWithJob,
};
