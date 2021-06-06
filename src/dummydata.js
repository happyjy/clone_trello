const getReplyDummyData = (page) => {
  const replyDummyData = []
  const date = new Date();
  let [start, end] = [0, 0];
  const numOfPageList = 5;

  if (typeof page === "number") {
    start = page * 5;
    end = (page * 5) + numOfPageList;
  } else {
    start = 0;
    end = 50;
  }

  // Array.from({ length: ITEMS_PER_PAGE }).map()
  for (var i = start; i < end; i++) {
    replyDummyData.push({
      index: i,
      profile: "JY" + i,
      writer: "JaeYoon Yoon",
      reply: "댓글이에요 !" + i,
      date: date.addDays(i)
    })
  }
  return replyDummyData;
}