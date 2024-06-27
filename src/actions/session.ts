"use server";

import { cookies } from "next/headers";
import CryptoJS from "crypto-js";
import config from "@/config";
import { SessionData } from "@/types/session";

async function setAuthSession(data: SessionData) {
  // 30 minutes
  // 7 days
  const expiresAt = new Date().getTime() + 1000 * 60 * 60 * 24 * 7;
  data.expiresAt = new Date(expiresAt).toISOString();
  console.log("data", data);
  const encrytedSessionData = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    process.env.ENCRYPT_SECRET!
  );
  console.log("encrytedSessionData", encrytedSessionData.toString());
  cookies().set("cobroke-auth", encrytedSessionData.toString(), {
    httpOnly: true,
    secure: false,
    // secure: process.env.NODE_ENV === "production",
    // 5 seconds
    expires: new Date(expiresAt),
    path: "/",
  });
}

async function getAuthSession() {
  const encryptedSessionData = cookies().get("cobroke-auth");
  if (!encryptedSessionData) {
    return;
  }
  const bytes = CryptoJS.AES.decrypt(
    encryptedSessionData.value,
    process.env.ENCRYPT_SECRET!
  );
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptedData) as SessionData;
}

async function removeAuthSession() {
  cookies().set("cobroke-auth", "", { expires: new Date(0) });
}

export { setAuthSession, getAuthSession, removeAuthSession };
