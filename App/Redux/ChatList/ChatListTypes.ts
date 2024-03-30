export interface ChatListRequestParams {
  token: any;
  page: number;
  limit: number;
}

export interface ChatListSuccessParams {
  data: Users[];
}

export interface Users {
  _id: Ids;
  lastMessage: LastMessage;
  sender: Sender;
  receiver: Receiver;
  oppositeUser: OppositeUser;
}

export interface Ids {
  sender_id: string;
  receiver_id: string;
}

export interface LastMessage {
  message: string;
  createdAt: string;
}

export interface Sender {
  _id: string;
  email: string;
  first_name: string;
  last_name: string;
  user_name: string;
}

export interface Receiver {
  _id: string;
  email: string;
  first_name: string;
  last_name: string;
  user_name: string;
}

export interface OppositeUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  user_name: string;
}

export interface ChatListFailureParams {
  message?: string;
  data?: any;
}
