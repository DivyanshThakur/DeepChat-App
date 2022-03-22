import Skeleton from "@material-ui/lab/Skeleton";
import "./chatList.css";

const chatListSkeleton = () => {
  return (
    <div className="conversation-list-item">
      <Skeleton
        animation="wave"
        variant="circle"
        width={50}
        height={50}
      />
      <div className="conversation-info">
        <Skeleton
          className="conversation-title"
          animation="wave"
          height={15}
          width="40%"
          style={{ marginBottom: 6 }}
        />
        <Skeleton
          className="conversation-snippet"
          animation="wave"
          height={12}
          width="100%"
        />
      </div>
    </div>
  );
};

export default chatListSkeleton;
