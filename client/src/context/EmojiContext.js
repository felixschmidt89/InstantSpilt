import React, { createContext, useContext } from "react";

const EmojiContext = createContext();

const emojis = {
  expense: "🛒",
  payment: "💸",
  paidFor: "💳",
  benefittedFrom: "😄",
};

const EmojiProvider = ({ children }) => {
  return (
    <EmojiContext.Provider value={emojis}>{children}</EmojiContext.Provider>
  );
};

const useEmoji = () => {
  const context = useContext(EmojiContext);
  if (!context) {
    throw new Error("useEmoji must be used within an EmojiProvider");
  }
  return context;
};

export { EmojiProvider, useEmoji };
