import React, { useEffect } from "react";
import ScrollableFeed from "react-scrollable-feed";
import { format, startOfDay, startOfToday } from "date-fns";
import { useGetMessagesQuery } from "../../redux/api/message";
import useStyles from "./style";
import MessageList from "../MessageList";
import { getUserAuth } from "../../utils/userAuth";
import socket from "../../utils/socket";

const ScrollableChat = ({ chatId, scrollableRef,setShowGoDownArrow }) => {
  const classes = useStyles();

  const {
    data = {
      user: null,
      list: [],
    },
    refetch,
  } = useGetMessagesQuery(chatId);

  const list = data.list;

  useEffect(() => {
    if (!socket) return;

    const { userId } = getUserAuth();

    socket.emit("setup", userId);

    socket.on("connected", () => {});
  }, []);

  useEffect(() => {
    if (chatId) {
      socket.emit("join-chat", chatId);
    }
  }, [chatId]);

  useEffect(() => {
    socket.on("message-received", (message) => {
      if (!chatId || chatId !== message.chat._id) {
        // send notification
      } else {
        refetch();
      }
    });
  });

  const scrollToBottom = () => {
    scrollableRef.current?.scrollToBottom();
  };

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
        return format(compDate, "d MMMM yyyy");
      }
    };

    return <div className={classes.dateMessage}>{getDate()}</div>;
  };

  return (
    <ScrollableFeed
      ref={scrollableRef}
      className={classes.root}
      onScroll={(isDown) => setShowGoDownArrow(!isDown)}
    >
      {list.map((messageDayList, index) => {
        return (
          <div key={index} className={classes.container}>
            <DateMessage date={messageDayList.date} />
            <MessageList scroll={scrollToBottom} data={messageDayList.messages} user={data.user} />
          </div>
        );
      })}
     
    </ScrollableFeed>
  );
};

export default ScrollableChat;
