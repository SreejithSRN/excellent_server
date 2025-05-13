import { Types } from "mongoose";

export enum Role {
  student = "student",
  instructor = "instructor",
  admin = "admin",
}

enum Gender {
  male = "male",
  female = "female",
  other = "other",
}

export enum Profession {
  Student = "student",
  Working = "working",
  NotWorking = "not working",
}


interface Contact {
  phone?: string;
  social: {
    linkedin: String,
    github: String,
    instagram: String,
  },
  address?: string;
}

interface Profile {
  avatar?: string;
  dateOfBirth?: string;
  gender?: Gender;
}

export interface UserEntity {
  _id?: Types.ObjectId;
  firstName?: string;
  lastName?: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  contact?: Contact;
  profile?: Profile;
  cv?: string;
  profession?: Profession;
  qualification?: string;
  isBlocked?: boolean;
  isVerified?: boolean;
  isOtpVerified?: boolean;
  isRequested?: boolean;
  isGAuth?: boolean;
  isRejected?: boolean;
  lastLoginDate?: Date;
  loginStreak?: number;
  weeklyLogins?: boolean[];
  createdAt?: Date;
  updatedAt?: Date;
  messages?:{
    rejection:string
  }
}


export interface PasswordChangeEntity {
  newPassword: string;
  currentPassword: string;
  confirmPassword: string;
  email: string;
}
