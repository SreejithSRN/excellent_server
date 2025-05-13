
import mongoose, { Schema, model } from "mongoose";
import { UserEntity } from "../../../domain/entities/UserEntity";

const userSchema = new Schema(
	{
		firstName: {
			type: String,
			default:""
		},
		lastName: {
			type: String,
			default:""
		},
		name: {
			type: String,
			required: true,
			unique: true,
			
		},
		email: {
			type: String,
			required: true,
			unique: true,
			
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			enum: ["student", "instructor", "admin"],
			default: "student",
		},
		profile: {
			avatar: {
				type: String,
				default: "https://www.pngkey.com/png/detail/72-729716_user-avatar-png-graphic-free-download-icon.png",
			},
			dateOfBirth: {
				type: String,
				default:""
			},
			gender: {
				type: String,
				enum: ["male", "female", "other",""],
				default:""
			},
		},
		contact: {
			address: {
				type: String,
				default:""
			},
			phone: {
				type: String,
				default:""
			},
			social: {
				linkedin: {
					type: String,
					default: "",
				},
				github: {
					type: String,
					default: "",
				},
				instagram: {
					type: String,
					default: "",
				},
			},
		},
		profession: {
			enum: ["student", "working", "not working"],
			type: String,			
		},
		qualification: {
			enum: ["sslc", "pre_degree","bachelor_degree","post_graduate","mca","bca","other"],
			type: String,
		},
		cv: {
			type: String,
			
		},
		profit: {
			type: Number,
			default: 0,
		},
		isBlocked: {
			type: Boolean,
			default: false,
		},
		isOtpVerified:{
			type:Boolean,
			default:false,
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
		isRequested: {
			type: Boolean,
			default: false,
		},
		messages: {
			rejection:{
				type: String,
				default: "",
			}
		},

		isGAuth: {
			type: Boolean,
			default: false,
		},
		isRejected: {
			type: Boolean,
			default: false,
		},
		lastLoginDate: {
			type: Date,
		},
		loginStreak: {
			type: Number,
			default: 0,
		},
		weeklyLogins: {
			type: [Boolean],
			default: [false, false, false, false, false, false, false],
		},
	},
	{
		timestamps: true,
	}
);

export const User = mongoose.model<UserEntity>("User", userSchema);
