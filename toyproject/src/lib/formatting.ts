export function boardIdentifier(category: string) {
  if (category === "announcements") {
    return "공지";
  } else {
    return "Q&A";
  }
}

export function timestampToDateWithDash(timestamp: number, dateOrTime: string) {
  const date = new Date(timestamp);
  if (dateOrTime === "date") {
    return (
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    );
  } else {
    return (
      String(date.getHours()).padStart(2, "0") +
      ":" +
      String(date.getMinutes()).padStart(2, "0")
    );
  }
}

export const timestampToDateWithLetters = (timestamp: string): string => {
  const date = new Date(parseInt(timestamp));
  return (
    "" +
    date.getFullYear() +
    "년 " +
    (date.getMonth() + 1) +
    "월 " +
    date.getDate() +
    "일 " +
    date.getHours() +
    "시 " +
    date.getMinutes() +
    "분"
  );
};
