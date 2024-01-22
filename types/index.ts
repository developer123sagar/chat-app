export type PageType = "DEFAULT" | "ALL_CONTACTS"

export type ContactListUser = {
    _id: string;
    username: string;
    email: string;
    isVerified: boolean;
    role: "USER" | "ADMIN";
    token: string;
    avatar: string;
    about: string;
}

export interface IAuthState {
    loading: boolean;
    user: ContactListUser | null;
}

export type ContactList = {
    [key: string]: ContactListUser[]
};

export type ContactListStateProps = {
    loading: boolean;
    contactList: ContactList | null;
    userInfo: any | null;
    isNewUser: boolean;
    isContactsPage: boolean;
    currentChatUser: ContactListUser | null;
    skipUserInfo:boolean;
};

export type ChatListItemProps = {
    data: ContactListUser;
    isContactPage: boolean;
};

export type GenderProps = {
    selectedGender: string;
    setGender: (value: string) => void;
};

export type OnboardingAvatarProps = {
    type: "sm" | "lg" | "xl";
    image: string;
    setImage: (image: string) => void;
};

export type InputProps = {
    name: string;
    state: string; 
    setState: (state: string) => void;
    label: boolean;
}
