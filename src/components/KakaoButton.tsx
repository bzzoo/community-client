"use client";

export default function KakaoButtton() {
  const onClick = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/kakao";
  };
  return (
    <>
      <button
        className="w-full rounded py-3 flex items-center justify-center bg-yellow-300"
        onClick={onClick}
      >
        카카오로 계속하기
      </button>
    </>
  );
}
