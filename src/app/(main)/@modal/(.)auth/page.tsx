"use client";

import GoogleButton from "@/components/GoogleButton";
import KakaoButtton from "@/components/KakaoButton";
import { useRouter } from "next/navigation";
import { FaXmark } from "react-icons/fa6";

export default function LoginPage() {
  const router = useRouter();
  const onClickClose = () => {
    router.back();
  };
  return (
    <div className="absolute flex justify-center w-full h-full top-0 left-0 right-0 bottom-0 z-50 bg-[rgba(0,0,0,0.4)]">
      <div className="flex flex-col gap-4 absolute top-[40%] bg-white p-8 rounded-xl">
        <button onClick={onClickClose} className="absolute left-2 top-2">
          <FaXmark size={24} />
        </button>
        <div className="text-center text-2xl mt-4">
          MULBA에 오신 것을 환영합니다
        </div>
        <div className="flex flex-col gap-4">
          <KakaoButtton />
          <GoogleButton />
        </div>
      </div>
    </div>
  );
}
