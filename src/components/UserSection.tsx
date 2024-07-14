import { AfterAuthSection } from "./AfterAuthSection";
import { BeforeAuthSection } from "./BeforeAuthSection";

export const UserSection = () => {
  return (
    <>
      <div className="hidden items-center gap-4 md:flex">
        {/* <BeforeAuthSection /> */}
        <AfterAuthSection />
      </div>
    </>
  );
};
