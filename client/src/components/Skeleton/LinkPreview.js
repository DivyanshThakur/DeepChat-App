import Skeleton from "@material-ui/lab/Skeleton";
import "./LinkPreview.css";

const LinkPreviewSkeleton = () => {
  return (
    <div className="link-list-item">
      <Skeleton animation="wave" variant="square" width={78} height={78} />
      <div className="link-info">
        <Skeleton
          className="link-title"
          animation="wave"
          height={20}
          width="40%"
        />
        <Skeleton
          className="link-snippet"
          animation="wave"
          height={16}
          width="100%"
        />
        <Skeleton
          className="link-snippet"
          animation="wave"
          height={12}
          width="20%"
        />
      </div>
    </div>
  );
};

export default LinkPreviewSkeleton;
