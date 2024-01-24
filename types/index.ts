import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import React, { Dispatch, SetStateAction } from "react";
import { Server as SocketIOServer } from "socket.io";

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
    loginUser: ContactListUser | null;
    onlineUsers: {
        userId: string;
        socketId: string;
    }[] | null
};

export type ChatListItemProps = {
    data: ContactListUser;
};
export type MessageStatus = "SENT" | "DELIVERED" | "SEEN"

export type MessageType = {
    _id?: string;
    receiverId: string;
    senderId: string;
    messageStatus: MessageStatus;
    message: string;
    messageType: string;
    createdAt: Date;
    updatedAt: Date;
}

export type MessageState = {
    messages: MessageType[],
    isGettingMsg: boolean,
}

export type NextApiResponseServerIo = NextApiResponse & {
    socket: Socket & {
        server: NetServer & {
            io: SocketIOServer;
        };
    };
};

export type SocketContextType = {
    socket: any | null;
    isConnected: boolean;
};

export type OnlineUsers = {
    userId: string;
    socketId: string;
}

export type GenderProps = {
    selectedGender: string;
    setGender: () => React.Dispatch<SetStateAction<string>>;
};

export type OnboardingAvatarProps = {
    type: "sm" | "lg" | "xl";
    image: string;
    setImage: Dispatch<SetStateAction<string>>;
};

export type InputProps = {
    name: string;
    state: string;
    setState: () => React.Dispatch<SetStateAction<string>>;
    label: boolean;
}
