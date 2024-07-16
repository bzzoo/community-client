const SideContainer = () => {
  return (
    <div className="hidden gap-8 w-[320px] shrink-0 lg:block p-4">
      <div className="flex flex-col justify-center items-center">
        <div className="h-[200px] w-full rounded-2xl bg-white"></div>
      </div>
      <div className="flex flex-col justify-center items-center sticky top-20">
        <div className="h-[520px] w-full rounded-2xl bg-white"></div>
      </div>
    </div>
  );
};

export default SideContainer;
