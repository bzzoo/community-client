"use client";

import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

const ChatForm = ({ chatId }: { chatId: string }) => {
  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={() => {}}
        className="flex w-full items-center border p-4 m-4 rounded-xl"
      >
        <TextareaAutosize
          className="w-full font-[15px] max-h-60 outline-none flex-1 resize-none leading-4"
          placeholder="새 메시지 보내기"
          value={"안녕하세요"}
          onChange={() => {}}
        />
        <button
          type="submit"
          className="flex items-center w-8 h-8 justify-start"
        >
          <span>등록</span>
        </button>
      </form>
    </div>
  );
};

export default ChatForm;
