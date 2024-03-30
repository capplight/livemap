export interface ChatDetailsRequestParams {
  token: any;
  receiver_id: string;
  page: number;
  limit: number;
}

export interface ChatDetailsSuccessParams {
  data: ChatHistory[];
}

export interface ChatHistory {
  _id: string;
  type: string;
  message: string;
  sender_id: string;
  receiver_id: string;
  createdAt: string;
}

export interface ChatDetailsFailureParams {
  message?: string;
  data?: any;
}
