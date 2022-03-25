import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import { format, startOfDay, startOfToday } from "date-fns";
import { useGetMessagesQuery } from "../../redux/api/message";
import useStyles from "./style";
import MessageList from "../MessageList";

const ScrollableChat = ({ chatId }) => {
  const classes = useStyles();

  const {
    data = {
      user: null,
      list: [],
    },
  } = useGetMessagesQuery(chatId);

  const list = data.list;

  const today = startOfToday();

  const DateMessage = ({ date }) => {
    const compDate = startOfDay(new Date(date));
    const diff = today.getTime() - compDate.getTime(); // get the difference between today(at 00:00:00) and the date

    const getDate = () => {
      if (compDate.getTime() === today.getTime()) {
        return "Today";
      } else if (diff <= 24 * 60 * 60 * 1000) {
        return "Yesterday";
      } else {
        return format(compDate, "PPp");
      }
    };

    return <div className={classes.dateMessage}>{getDate()}</div>;
  };

  return (
    <ScrollableFeed className={classes.root}>
      {list.map((messageDayList, index) => {
        return (
          <div key={index} className={classes.container}>
            <DateMessage date={messageDayList.date} />
            <MessageList data={messageDayList.messages} user={data.user} />
          </div>
        );
      })}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
