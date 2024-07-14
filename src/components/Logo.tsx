import Link from "next/link";

export const Logo = () => {
  return (
    <div className="flex w-full items-center">
      <div className="hidden md:flex">
        <Link href="/">
          <h1 className="text-3xl font-bold">MULBA</h1>
        </Link>
      </div>
    </div>
  );
};
