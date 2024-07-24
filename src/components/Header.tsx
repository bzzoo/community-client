import { Logo } from "./Logo";
import { UserSection } from "./UserSection";

const Header = () => (
  <header className="flex sticky top-0 z-20 h-16 items-center bg-white bg-opacity-75 py-5 text-sm font-medium leading-6">
    <nav className="flex w-full max-w-6xl mx-auto px-4">
      <Logo />
      <div className="hidden items-center gap-4 md:flex">
        <UserSection />
      </div>
    </nav>
  </header>
);

export default Header;
