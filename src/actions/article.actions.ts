import { Article, ArticlePageData, Keyword } from "@/types/article";
import { faker } from "@faker-js/faker";

const generateKeyword = (): Keyword => ({
  keywordId: faker.number.int({ min: 1, max: 1000 }),
  keywordName: faker.word.noun(),
});

const generateHtmlContent = (): string => {
  const paragraphs = faker.number.int({ min: 1, max: 5 });
  let content = "";
  for (let i = 0; i < paragraphs; i++) {
    content += `<p>${faker.lorem.paragraph()}</p>`;

    if (faker.datatype.boolean()) {
      const imageUrl = faker.image.url();
      content += `<img src="${imageUrl}" alt="Random image" style="max-width: 100%; height: auto;">`;
    }
  }

  if (faker.datatype.boolean()) {
    content += `<h2>${faker.lorem.sentence()}</h2>`;
  }
  if (faker.datatype.boolean()) {
    content += `<ul>${Array.from(
      { length: 3 },
      () => `<li>${faker.lorem.sentence()}</li>`
    ).join("")}</ul>`;
  }
  return content;
};

export const generateArticle = (): Article => ({
  articleId: faker.number.int({ min: 1, max: 10000 }),
  title: faker.lorem.sentence(),
  content: generateHtmlContent(),
  articleType: faker.helpers.arrayElement(["SHARE", "QUESTION"]),
  upvoteCount: faker.number.int({ min: 0, max: 1000 }),
  commentCount: faker.number.int({ min: 0, max: 500 }),
  keywordList: Array.from(
    { length: faker.number.int({ min: 1, max: 5 }) },
    generateKeyword
  ),
  authorInfo: {},
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
});

export const generateArticlePageData = (): ArticlePageData => {
  const content = Array.from({ length: 20 }, generateArticle);
  return {
    tatalElements: faker.number.int({ min: 100, max: 1000 }),
    isLast: faker.datatype.boolean(),
    nextCursor: faker.number.int({ min: 1, max: 50 }),
    content,
  };
};
