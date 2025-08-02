//get daily breakdown
interface dailyBreakForGapOne {
  day: string;
  description:string[]
  whyToLearn:string[]
  revision: string
}

interface weeklyBrdeakdownGapOne {
  week: string;
  topic: string[];
  resources:string[];
  activities:string[];
  dailyBreakdown: dailyBreakForGapOne[]

}
 export interface GoStudyPlanWeekGapOne {
  title: string;
  introduction: string;
  overallStrategy: string;
  weeklyBreakdown: weeklyBrdeakdownGapOne[];  
  forNextTopic: string;
  finalReview: string;
  further: string;
  motivationMessage: string;
}

//for gap of week 
//get  plan with gap of 4 days 
export interface weeklyBreakdownGapWeek {
    weekRange: string;
    topic: string ;
    description: string[];
    whyToLearn: string[];
    resources: string[];
    activities: string[];
} 

export interface GoStudyPlanGapFourDays {
    title : string;
    introduction: string;
    overallStrategy: string;
    weeklyBreakdown2: weeklyBreakdownGapWeek[];
    forNextTopic: string;
    finalReview: string;
    further: string;
    motivationMessage:string;
}

//get plan for a week 1- week2

export interface weeklyBreakdownForMoreWeek {
     weekRange: string;
    topic: string ;
    description: string[];
    whyToLearn: string[];
    resources: string[];
    activities: string[];
}

export interface GoStudyPlanGapWeek {
    title : string;
    introduction: string;
    overallStrategy: string;
    weeklyBreakdown3: weeklyBreakdownForMoreWeek[];
    forNextTopic: string;
    finalReview: string;
    further: string;
    motivationMessage: string;
}

//to get weekCount to show at descpription page 
export interface TotalWeekCount {
  count : number;
  title: string;
}

//to make week1, week2...... green color as it is compelted
export interface CompletedWeekPlan {
  time: number;
  complete: number;
}


//to get mcq
export interface MCQ {
  mcq: string;
  // options: JSON,
  options: { [key: string]: string };

  isAttempted: boolean;
}