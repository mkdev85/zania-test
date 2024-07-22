export enum MessageType {
  SUCCESS="success",
  ERROR="error"
}

type message = MessageType.SUCCESS | MessageType.ERROR

export interface MessageProps {
  type: message;
  message: string;
}
