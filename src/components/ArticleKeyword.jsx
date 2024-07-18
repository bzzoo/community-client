const ArticleKeyword = ({ keyword }) => {
  return (
    <li
      key={keyword.keywordId}
      onClick={() => {}}
      className="h-[24px] min-w-fit p-3 flex justify-center items-center border  rounded-full hover:bg-[rgba(144,144,144,0.2)] cursor-pointer"
    >
      <span className="text-[12px] font-bold">{keyword.keywordName}</span>
    </li>
  );
};

export default ArticleKeyword;
