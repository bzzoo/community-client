"use client";

export default function GoogleButton() {
  const onClick = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };
  return (
    <>
      <>
        <button
          className="w-full rounded py-3 flex items-center justify-center bg-slate-200"
          onClick={onClick}
        >
          구글로 계속하기
        </button>
      </>
    </>
  );
}
