import { Types } from "mongoose";

enum Status {
	active = "active",
	blocked = "blocked",
}

export interface CategoryEntity {
	_id: Types.ObjectId;
	name: string;
    description:string;
    image:string;
	status: Status;
	isBlocked:boolean	
}

