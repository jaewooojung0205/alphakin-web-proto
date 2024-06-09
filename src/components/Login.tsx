/**
 * 페이지마다 user체크하지말고 루트에서 한번에 감싸기
 */

"use client";

import { auth } from "@/lib/firebase";
import { signInAnonymously } from "firebase/auth";

export default function Login() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <button onClick={() => signInAnonymously(auth)}>로그인</button>
    </div>
  );
}
