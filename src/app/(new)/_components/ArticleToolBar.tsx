"use client";
import React from "react";

const ArticleToolBar = () => (
  <div id="toolbar" className="flex justify-center gap-8 p-2 h-[56px] w-full">
    <button className="ql-bold hover:bg-blue-500 " />
    <button className="ql-underline hover:bg-blue-500" />
    <button className="ql-blockquote hover:bg-blue-500" />
    <button className="ql-code-block hover:bg-blue-500" />
    <button className="ql-list  hover:bg-blue-500" value="ordered" />
    <button className="ql-list hover:bg-blue-500" value="bullet" />
    <button className="ql-image hover:bg-blue-500 hover:text-white" />
  </div>
);

export default ArticleToolBar;
