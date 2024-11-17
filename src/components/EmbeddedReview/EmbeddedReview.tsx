import { Button, Rating, Title } from '@mantine/core';
// import LoremIpsum from 'react-lorem-ipsum';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import { ReviewTypePreview } from '../../types';
import LikeButton from '../LikeButton';
import UserBadge from '../UserBadge';

const EmbeddedReview = ({ data, big }: {
  data: ReviewTypePreview;
  big?: boolean;
}) => {
  const descRef = useRef<HTMLParagraphElement>(null);
  const [isDescOverflowing, setIsDescOverflowing] = useState(false);

  useEffect(() => {
    if (!descRef.current) {
      return;
    }
    const descScrollHeight = descRef.current?.clientHeight;
    const descClientHeight = descRef.current?.scrollHeight;
    setIsDescOverflowing(descScrollHeight < descClientHeight);
  }, [descRef.current]);

  return (
    <article className="stack gap-md jc-space-between" style={{ flex: 1 }}>
      <section className="stack gap-md">
        <Rating
          value={data.rating}
          readOnly
        />
        <Title order={4}>
          <a href={`/review/${data.id}`} className="no-underline">
            {data.title}
          </a>
        </Title>
        <section className="stack gap-md">
          <p
            className="vertical-scroll"
            style={{ maxHeight: big ? 350 : 150, overflow: 'hidden' }}
            ref={descRef}
          >
            {/* <LoremIpsum p={3} /> */}
            {data.content}
          </p>
          {
            isDescOverflowing && (
              <Button
                component={Link}
                href={`/review/${data.id}`}
                style={{ alignSelf: 'center' }}
              >
                Leer reseña completa
              </Button>
            )
          }
        </section>
      </section>
      <footer className="group jc-space-between ai-center">
        <UserBadge name={data.user.username} id={data.user.id} />
        <LikeButton
          totalLikes={data.total_likes}
          liked={data.liked}
          addLike={() => {}}
          removeLike={() => {}}
        />
      </footer>
    </article>
  );
};

export default EmbeddedReview;
