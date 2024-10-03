import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
dayjs.locale("ko");

export const formattedDate = (date: Date): string => {
  const now = dayjs();
  const chatDate = dayjs(date);
  const differenceInHours = now.diff(chatDate, "hour");

  if (differenceInHours < 24) {
    return chatDate.fromNow();
  } else {
    return chatDate.format("M월 D일");
  }
};