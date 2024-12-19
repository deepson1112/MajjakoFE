"use server";
import { UserEntityMe } from "@/types/models";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export async function getIronSessionData() {
  const session = await getIronSession<UserEntityMe>(cookies(), {
    password:
      "jdasinlaiusdfnaifudhfn984hufiwwnfo928fuhwowuh98347uhwiufno478hfw847hf78o57hfn85",
    cookieName: "user",
  });
  return session;
}
