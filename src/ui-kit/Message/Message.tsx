import React from "react";
import { MessageProps } from "./Message.props";

export const Message: React.FC<MessageProps> = ({ message, type }) => {
  const textColor = type === 'error' ? 'red' : 'green';

  return (
    <p className={`text-center text-${textColor}-900 my-5 text-2xl`}>
      { message }
    </p>
  );
};

