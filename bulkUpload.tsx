import { addDoc, collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { Member } from './typings';
let json = require('/Users/Nick/Developer/church-management/members.json');

const setData = async () => {
	const churchRef = doc(db, 'churches', 'v7e7DRo9JTtUUqPp3ODW');

	const callFb = async (memberInfoStuff: Object) => {
		await addDoc(collection(churchRef, 'members'), memberInfoStuff);
	};

	json.forEach((item, index: number) => {
		setTimeout(() => {
			const memberInfoStuff: Member = {
				active_user: true,
				background_check_clear: item.background_check_clear,
				birthdate: new Date(item.birthdate),
				first_name: item.first_name,
				full_name: item.first_name + ' ' + item.last_name,
				gender: item.gender,
				image: '',
				last_name: item.last_name,
				marital_status: item.marital_status,
				medical_notes: null,
				membership_status: item.membership_status,
				prefix: item.prefix,
				primary_campus: item.primary_campus,
				addresses: [
					{
						city: item.addresses[0].city,
						primary: item.addresses[0].primary,
						state: item.addresses[0].state,
						street: item.addresses[0].street,
						type: item.addresses[0].type,
						zip: item.addresses[0].zip,
					},
				],
				numbers: [
					{
						number: item.numbers[0].number,
						primary: item.numbers[0].primary,
						type: item.numbers[0].type,
					},
				],
				emails: [
					{
						address: item.emails[0].address,
						primary: item.emails[0].primary,
						type: item.emails[0].type,
					},
				],
			};

			callFb(memberInfoStuff);
		}, index * 1000);
	});
};
