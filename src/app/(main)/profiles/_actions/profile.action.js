"use server";

import axios from "axios";
import { cookies } from "next/headers";

export const getUserProfileInfo = async (userId) => {
  const token = cookies().get("mb_token")?.value;
  const res = await axios.get(`http://localhost:8080/api/members/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

export const getUserShareArticles = () => {};
