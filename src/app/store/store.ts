export interface IAppState {
    count: number
}

export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    maidenName: string;
    age: number;
    gender: string;
    email: string;
    phone: string;
    address: IAddress;
    university: string;
    company: ICompany;
    role: string;
}

export interface IAddress {
    address: string;
    city: string;
    state: string;
    stateCode: string;
    postalCode: string;
    country: string;
}

export interface ICompany {
    department: string;
    name: string;
    title: string;
    address: IAddress;
}