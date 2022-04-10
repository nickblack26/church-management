import { ObjectId } from 'mongodb';

export interface Email {
	address: string;
	type: 'Home' | 'Work' | 'Other';
	primary: any;
}

export interface Emails {
	emails: [Email];
}

export interface Address {
	street: string;
	city: string;
	state: string;
	zip: number;
	type: 'Home' | 'Work' | 'Other';
	primary: true | false;
}

export interface Addresses {
	addresses: [Address];
}

export interface Number {
	number: string;
	type: 'Mobile' | 'Home' | 'Work' | 'Other';
	primary: true | false;
}

export interface Numbers {
	numbers: [Number];
}

export interface Campus {
	_id: string;
	name: string;
	street: string;
	city: string;
	state: string;
	zip: number;
	members: Array<ObjectId>;
}

export interface Campuses {
	campuses: [Campus];
}

interface Church {
	_id: string;
	name: string;
	email: string;
	number: number;
	website: string;
	campuses: Array<Campus>;
	events: Array<Event>;
}

export interface Churches {
	churches: [Church];
}

interface Event {
	_id: string;
	name: string;
	description: string;
	archiveDate: Date | null;
	maxCapacity: number | null;
	closeAt: Date;
	showDate: Date;
	directLink: true | false;
	hideDate: Date;
	open: true | false;
	attendees: Array<ObjectId>;
	ministries: Array<ObjectId>;
}

export interface Events {
	events: [Event];
}

interface Member {
	_id: string;
	prefix: 'Mr.' | 'Ms.' | 'Mrs.' | 'Dr.';
	first_name: string;
	last_name: string;
	full_name: string;
	birthdate: Date;
	gender: 'M' | 'F';
	marrital_status: 'Single' | 'Married' | 'Widowed';
	active_user: true | false;
	membership_status: 'Attendee' | 'Member';
	medicalNotes: string | null;
	primary_campus: ObjectId;
	addresses: [Address];
	emails: [Email];
	image: string;
	numbers: [Number];
	background_check_clear: true | false;
}

export interface Members {
	members: [Member];
}
