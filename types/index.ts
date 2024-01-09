export type PageType = "DEFAULT" | "ALL_CONTACTS"

export type ContactListUser = {
    _id: string;
    email: string;
    username: string;
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
};

export type ChatListItemProps = {
    data: ContactListUser;
    isContactPage: boolean;
};
