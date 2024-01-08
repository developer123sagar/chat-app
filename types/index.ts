export type PageType = "DEFAULT" | "ALL_CONTACTS"

export type ContactList = {
    [key: string]: Array<{
        _id: string;
        email: string;
        username: string;
    }>;
};

export type ContactListStateProps = {
    loading: boolean;
    contactList: ContactList | null;
    userInfo: any | null;
    isNewUser: boolean;
    isContactsPage: boolean;
  };