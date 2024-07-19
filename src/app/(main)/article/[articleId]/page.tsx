import ArticleDetails from "../_components/ArticleDetails";
import CommentForm from "../_components/CommentForm";

export default function page({ params }: { params: { articleId: string } }) {
  const { articleId } = params;
  return (
    <>
      <ArticleDetails articleId={articleId} />
      <CommentForm articleId={articleId} />
      {/* <CommentList articleId={articleId} /> */}
    </>
  );
}
