type MockData = {
	uuid: string;
	[key: string]: any;
};

export const FAKE_DATA: Array<MockData> = [
	{
		uuid: '11a4f321-7b3a-4d52-94b9-8f8c509108ad',
		name: 'Linkin Park',
	},
	{
		uuid: '56447df1-adaf-4694-a378-c10757ffac9e',
		name: 'Dredg',
	},
	{
		uuid: 'ff521a08-c7a1-4c98-9ddf-b3215f98b3dc',
		name: 'Any Shoegaze Group',
	},
];

const MOCK_KEY = 'MOCK_KEY_OF';

const getRandomWithin = (max: number, min: number) =>
	Math.floor(Math.random() * (max - min + 1)) + min;

const promiseMock = (data: MockData) =>
	new Promise((r) => setTimeout(() => r(data), getRandomWithin(1000, 2000)));

// @ts-ignore
const getAllMockData = () => JSON.parse(localStorage.getItem(MOCK_KEY));

const updateAllElementsWith = (newData: MockData) => {
	localStorage.setItem(MOCK_KEY, JSON.stringify(newData));

	return getAllMockData();
};

updateAllElementsWith(FAKE_DATA);

const getElement = (uuid: string) => {
	const all = getAllMockData();
	const index = all.findIndex((data: MockData) => data.uuid === uuid);

	return all[index];
};

const updateSingleElement = (payload: MockData) => {
	const all = getAllMockData();
	const index = all.findIndex((data: MockData) => data.uuid === payload.uuid);
	const element = getElement(payload.uuid);

	all[index] = {
		// payload may not having all data
		...element,
		...payload,
	};

	updateAllMockData(all);

	return getElement(payload.uuid);
};

const updateElement = (newData: MockData) => {
	const newMockData = getAllMockData();
	const index = newMockData.findIndex(
		(data: MockData) => data.uuid === newData.uuid
	);

	newMockData[index] = {
		...newMockData[index],
		...newData,
	};

	return updateAllElementsWith(newMockData);
};

const updateAllMockData = (newData: MockData) => {
	updateElement(newData);

	return getAllMockData();
};

// Use outside
export const listAllDataMockFn = async () => {
	const data = await promiseMock(getAllMockData());

	return data;
};

// Use outside
export const getSingleElementFn = async (uuid: string) => {
	const element = getElement(uuid);
	const data = await promiseMock(element);

	return data;
};

// Use outside
export const updateSingleElementFn = async (payload: MockData) => {
	const element = updateSingleElement(payload);
	const data = await promiseMock(element);

	return data;
};
