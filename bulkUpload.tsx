import { addDoc, collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from './firebase';
let json = require('/Users/Nick/Developer/church-management/members.json');

const setData = async () => {
	const churchRef = doc(db, 'churches', 'v7e7DRo9JTtUUqPp3ODW');

	const callFb = async (
		memberInfoStuff: Object,
		memberAddress: Object,
		memberEmail: Object,
		memberPhone: Object
	) => {
		const memberInfo = await addDoc(
			collection(churchRef, 'members'),
			memberInfoStuff
		);

		const memberRef = doc(churchRef, 'members', memberInfo.id);

		await addDoc(collection(memberRef, 'addresses'), memberAddress);

		await addDoc(collection(memberRef, 'emails'), memberEmail);

		await addDoc(collection(memberRef, 'numbers'), memberPhone);
	};

	json.forEach((item, index) => {
		setTimeout(() => {
			console.log(item);
			const memberInfoStuff = {
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
			};

			const memberAddress = {
				city: '',
				primary: true,
				state: '',
				street: '',
				type: '',
				zip: 76123,
			};

			const memberPhone = {
				number: '',
				primary: true,
				type: 'Mobile',
			};

			const memberEmail = {
				address: '',
				primary: true,
				type: 'Home',
			};

			item.addresses.map((address) => {
				memberAddress.city = address.city;
				memberAddress.primary = address.primary;
				memberAddress.state = address.state;
				memberAddress.street = address.street;
				memberAddress.type = address.type;
				memberAddress.zip = address.zip;
			});

			item.numbers.map((number) => {
				memberPhone.number = number.number;
				memberPhone.primary = number.primary;
				memberPhone.type = number.type;
			});

			item.emails.map((email) => {
				memberEmail.address = email.address;
				memberEmail.primary = email.primary;
				memberEmail.type = email.type;
			});

			callFb(memberInfoStuff, memberAddress, memberEmail, memberPhone);
		}, index * 1000);
	});
};
