export type PageType = "DEFAULT" | "ALL_CONTACTS"

export type ContactListUser = {
    _id: string;
    email: string;
    username: string;
    avatar: string;
    about: string;
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
};

export type ChatListItemProps = {
    data: ContactListUser;
    isContactPage: boolean;
};
