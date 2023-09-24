import { Location } from 'vue-router';
import { CreateExerciseDTO } from './dtos';

export interface IUser {
  readonly _id: string;
  readonly thirdPartyId: string;
  readonly provider: 'google' | 'github' | 'adobe' | 'amazon';
  readonly givenName: string;
  readonly familyName: string;
  readonly avatar: string;
  readonly date: number;
  readonly group: string;
  readonly suspended?: number;
  readonly telegramChat?: number;
}
export interface IUserInfo {
  readonly _id: string;
  readonly username: string;
  readonly avatar: string;
}
export interface IRecipeIngredient {
  readonly name: string;
  readonly amount: string;
  readonly unit: string;
}
export interface IRecipe {
  readonly _id: string;
  readonly author: string;
  readonly created: number;
  readonly updated: number;

  readonly title: string;
  readonly category: string[];
  readonly time: number;
  readonly difficulty: number;
  readonly ingredients: IRecipeIngredient[];
  readonly nutrition: INutrition[];
  readonly thumbnail: string;
  readonly steps: string[];

  readonly video?: string;
  readonly description?: string;
  readonly source?: string;
}
export interface INutritionplanDay {
  breakfast: IRecipe | null;
  lunch: IRecipe | null;
  dinner: IRecipe | null;
  snacks: IRecipe[];
}
export interface INutritionplan {
  readonly _id?: string;
  author?: string;
  created?: number;
  updated?: number;

  title: string;
  description: string;
  categories: string[];

  monday: INutritionplanDay;
  tuesday: INutritionplanDay;
  wednesday: INutritionplanDay;
  thursday: INutritionplanDay;
  friday: INutritionplanDay;
  saturday: INutritionplanDay;
  sunday: INutritionplanDay;
}
export interface INutrition {
  readonly title: string;
  readonly amount: number;
  readonly unit: string;
}

export interface IPendingFriendship {
  _id: string;
  invitee: IUserInfo;
  target: IUserInfo;
}
export interface IGeneralStatistics {
  readonly title: number;
  readonly amount: number;
}
export interface ILoginProviderStatistic {
  readonly provider: string;
  readonly amount: number;
}
export interface ITotalMessages {
  readonly friends: number;
  readonly inbox: number;
}

export interface IInbox {
  readonly _id: string;
  readonly date: number;
  readonly from: IUserInfo;
  readonly message: string;
}

export enum HealthType {
  WEIGHT = 'weight',
  WATER = 'water',
  HEIGHT = 'height'
}

export interface IHealth {
  readonly _id?: string;
  readonly type: HealthType;
  readonly date: number;
  readonly value: number;
  readonly user: string;
}
export interface IMessage {
  readonly _id: string;
  readonly type: string;
  readonly date: number;
  readonly from: string;
  readonly to: string;
  read: boolean;
  readonly content: string;
}

export interface IFHNotification {
  readonly title: string;
  readonly text: string;
  readonly img?: string;
  readonly route?: Location;
}

export interface IExercise {
  readonly _id: string;
  readonly author: string;
  readonly reviewed: boolean;
  readonly reviewedBy: string;
  readonly created: number;
  readonly updated: number;
  readonly title: string;
  readonly thumbnail: string;
  readonly difficulty: number;
  readonly affectedMuscles: string[];

  readonly explanatoryVideo?: string;
  readonly warnings?: string[];
  readonly steps?: string[];
  readonly possibleAtHome?: boolean;
  readonly kneeFriendly?: boolean;
  readonly editedData?: CreateExerciseDTO;
  readonly time?: number;
  readonly distance?: string;
  readonly sets?: string;
  readonly reps?: string;
}

export interface IWorkout {
  readonly _id: string;
  readonly author: string;
  title: string;
  readonly updated: number;
  readonly exercises: IExerciseInfo[];
}
export interface IExerciseInfo {
  readonly _id: string;
  readonly title: string;
  readonly thumbnail: string;
  readonly type: 'gym' | 'time' | 'distance';
  readonly difficulty: number;
  readonly affectedMuscles: string[];
}
export interface IExerciseShowcase {
  readonly _id: string;
  readonly title: string;
  readonly thumbnail: string;
  readonly type: 'gym' | 'time' | 'distance';
}
export interface ISet {
  readonly reps: number;
  readonly weight: number;
}

export interface ICompletedExercise {
  readonly _id?: string;
  readonly exercise: string;
  readonly author: string;
  readonly start: number;
  readonly end: number;

  readonly sets?: ISet[];
  readonly distance?: string;
}
export interface ITrainingplan {
  readonly _id: string;
  readonly author: string;
  readonly 0?: string;
  readonly 1?: string;
  readonly 2?: string;
  readonly 3?: string;
  readonly 4?: string;
  readonly 5?: string;
  readonly 6?: string;
}

export interface ITrainingplanFull {
  readonly _id: string;
  readonly author: string;
  readonly 0?: { id: string; exercises: IExercise[] };
  readonly 1?: { id: string; exercises: IExercise[] };
  readonly 2?: { id: string; exercises: IExercise[] };
  readonly 3?: { id: string; exercises: IExercise[] };
  readonly 4?: { id: string; exercises: IExercise[] };
  readonly 5?: { id: string; exercises: IExercise[] };
  readonly 6?: { id: string; exercises: IExercise[] };
}

export interface IModalReturn {
  event: string;
  data: any;
}

export interface IVariable {
  _id: string;
  type: 'muscle' | 'category' | 'custom';
  title: string;
  thumbnail: string;
}

export interface IAchievment {
  exerciseId: string;
  exerciseTitle: string;
  achievedAt: number[];
}

export interface IFeed {
  _id: string;
  user?: IUserInfo;
  timestamp: number;
  thumbnail?: string;
  title?: string;
  text: string;
  recipeId?: string;
  exerciseId?: string;
  achievementTitle?: string;

  hot: number;
  like: number;
  strong: number;
  thumbsup: number;
  monkey: number;
  reactions: string[];
}

export interface INutritionWikiItem {
  title: string;
  category: string;
  thumbnail: string;
  general?: string[];
  goodFor?: string[];
  containedIn?: string[];
}
