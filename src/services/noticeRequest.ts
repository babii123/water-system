import request from '.'

const basic_path = '/notice'
export interface SendEmailModal {
  info: string;
  sendId: string;
  receiveId: string;
  title: string;
}

interface NoticeModel {
  id: number;
  type: string;
  info: string;
  sendId: string;
  receiveId: string;
  time: Date;
  isRead: boolean;
}

export const getAllNotice_API = (receiveId: string) => request.get<NoticeModel[]>(`${basic_path}/${receiveId}`);
export const sendEmail_API = (data: SendEmailModal) => request.post(`${basic_path}/send`, data);
export const readNotice_API = (id: number) => request.patch(`${basic_path}/${id}`);