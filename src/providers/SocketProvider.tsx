"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import SockJS from "sockjs-client";
import { Client, Message } from "@stomp/stompjs";

interface IMessage {
  body: string;
}

interface ISocketContext {
  subscribe: (chatId: string, callback: (message: IMessage) => void) => void;
  sendMessage: (chatId: string, message: any) => void;
  messages: IMessage[];
  connected: boolean;
}

const SocketContext = createContext<ISocketContext | null>(null);

const url = "http://localhost:8080/ws";

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [client, setClient] = useState<Client | null>(null);
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      const socket = new SockJS(url);
      const stompClient = new Client({
        webSocketFactory: () => socket as any,
        onConnect: () => {
          console.log("WebSocket connected");
          setConnected(true);
          setClient(stompClient);
        },
        onDisconnect: () => {
          console.log("WebSocket disconnected");
          setConnected(false);
        },
        onStompError: (frame) => {
          console.error("Broker reported error: " + frame.headers["message"]);
          console.error("Additional details: " + frame.body);
        },
      });

      stompClient.activate();
      initialized.current = true;

      return () => {
        if (stompClient.connected) {
          stompClient.deactivate();
        }
      };
    }
  }, []);

  const subscribe = useCallback(
    (chatId: string, callback: (message: IMessage) => void) => {
      if (client) {
        const subscription = client.subscribe(
          `/topic/chat/${chatId}`,
          (message: Message) => {
            const msgBody = JSON.parse(message.body);
            setMessages((prevMessages) => [...prevMessages, msgBody]);
            callback(msgBody);
          }
        );

        console.log(`Subscribed to room ${chatId}`, subscription);
      } else {
        console.warn(
          `Unable to subscribe to room ${chatId} - client not connected`
        );
      }
    },
    [client, connected]
  );

  const sendPrivateMessage = useCallback(
    (userId: string, message: any) => {
      if (client && connected) {
        client.publish({
          destination: `/user/${userId}/queue/messages`,
          body: JSON.stringify(message),
        });
      }
    },
    [client, connected]
  );

  const sendMessage = useCallback(
    (chatId: string, message: Message) => {
      if (client && connected) {
        client.publish({
          destination: `/app/chat.sendMessage`,
          body: JSON.stringify({ ...message, chatId }),
        });
      }
    },
    [client, connected]
  );

  return (
    <SocketContext.Provider
      value={{ subscribe, sendMessage, messages, connected }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
