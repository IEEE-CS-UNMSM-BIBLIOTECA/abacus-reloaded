import { IconHeart, IconHeartFilled } from '@tabler/icons-react';

const LikeIcon = ({ liked, addLike, removeLike }: {
  liked: boolean;
  addLike: () => void;
  removeLike: () => void;
}) => {
  if (liked) {
    return (
      <IconHeartFilled
        className="icon-button"
        size={20}
        onClick={removeLike}
      />
    );
  }

  return (
    <IconHeart
      className="icon-button"
      size={20}
      onClick={addLike}
    />
  );
};

const LikeButton = ({ totalLikes, liked, addLike, removeLike }: {
  totalLikes: number;
  liked: boolean;
  addLike: () => void;
  removeLike: () => void;
}) => {
  return (
    <div className="group gap-xxs ai-center">
      <LikeIcon liked={liked} addLike={addLike} removeLike={removeLike} />
      <span className="fz-sm">
        {totalLikes}
      </span>
    </div>
  );
};

export default LikeButton;
