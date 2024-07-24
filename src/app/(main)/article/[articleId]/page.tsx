import { getArticle } from "@/actions/article.actions";
import ArticleDetails from "../_components/ArticleDetails";
import CommentForm from "../_components/CommentForm";
import CommentList from "../_components/CommentList";

const page = async ({ params }: { params: { articleId: string } }) => {
  const { articleId } = params;
  const article = await getArticle({ articleId });

  return (
    <>
      <ArticleDetails article={article} />
      <CommentForm articleId={articleId} />
      <CommentList articleId={articleId} />
    </>
  );
};
export default page;
