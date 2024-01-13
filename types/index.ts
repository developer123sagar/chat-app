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

export type ContactListState = {
    loading: boolean;
    contactList: ContactList | null;
    userInfo: any | null;
    isNewUser: boolean;
    isContactsPage: boolean;
    currentChatUser: ContactListUser | null;
    skipUserInfo: boolean;
    MainPageSkipMsg: boolean;
};

export type ChatListItemProps = {
    data: ContactListUser;
};
export type MessageStatus = "SENT" | "DELIVERED" | "SEEN"

export type MessageType = {
    _id: string;
    receiverId: string;
    senderId: string;
    messageStatus: MessageStatus;
    message: string;
    messageType: string;
    createdAt: Date;
    updatedAt: Date;
}

export type MessageState = {
    messages: MessageType[]
}
