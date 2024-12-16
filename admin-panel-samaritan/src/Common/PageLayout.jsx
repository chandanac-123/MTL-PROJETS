const PageLayout = ({ children }) => {
  return (
    <div className="flex flex-col bg-white mt-8 rounded-2xl border border-border_grey">
      <div className="p-5 h-full">{children}</div>
    </div>
  );
};

export default PageLayout;
