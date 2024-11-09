import { toast } from "@/components/ui/use-toast";
import { getRecentEnrollments, getPopularPrograms } from "./mockDatabase";

export const showRandomJoinNotification = () => {
  const recentEnrollments = getRecentEnrollments();
  if (recentEnrollments.length === 0) return;

  const randomEnrollment = recentEnrollments[Math.floor(Math.random() * recentEnrollments.length)];
  
  toast({
    title: "New Enrollment!",
    description: `${randomEnrollment.userName} just joined ${randomEnrollment.programName}!`,
    duration: 3000,
  });
};

export const showProgramPopularityNotification = (programTitle: string) => {
  const popularPrograms = getPopularPrograms();
  const position = popularPrograms.indexOf(programTitle);
  
  if (position === -1) return;
  
  const enrollmentCount = Math.floor(Math.random() * 50) + 50;
  
  toast({
    title: "Program Popularity Update",
    description: `${programTitle} is one of our most popular programs with ${enrollmentCount}+ enrollments!`,
    duration: 3000,
  });
};

export const showImmediateJoinNotification = (programTitle: string) => {
  const recentUsers = getRecentEnrollments()
    .filter(e => e.programName === programTitle)
    .map(e => e.userName);
    
  const count = recentUsers.length;
  
  toast({
    title: "Join the Community!",
    description: `${count} people enrolled in ${programTitle} recently. Don't miss out!`,
    duration: 4000,
  });
};