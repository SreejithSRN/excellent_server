import {  Types } from "mongoose";

export interface CourseEntity{
    id?:string
    _id?:string | Types.ObjectId;
    title?: string;
    description?: string;
    categoryRef?: string | Types.ObjectId;
    instructorRef?: string | Types.ObjectId;
    language?: Language;
    thumbnail?: string;
    level?: Level;
    pricing?: Pricing;
    lessons?:Lesson[];
    isBlocked?:boolean;
}

export enum Language{
    English="english",
    Hindi="hindi",
    Malayalam="malayalam"
}
export enum Level {
    Beginner = 'beginner',
    Intermediate = 'intermediate',
    Advanced = 'expert'
}
interface Pricing {
    amount?: number;
    type?: PricingType;
}
export enum PricingType {
    Free = 'free',
    Paid = 'paid'
}

export interface Lesson {  
    lessonNumber:number; 
    title?: string;
    description?: string; 
    video?: File|string;
    duration?: string;    
}