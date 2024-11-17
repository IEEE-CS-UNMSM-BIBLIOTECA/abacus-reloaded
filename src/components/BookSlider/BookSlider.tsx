import Masonry from 'react-masonry-css';
import { useQuery } from '@tanstack/react-query';
import BookCard from '@/components/BookCard/BookCard';
import { getDocuments } from '@/services/config';
import Loading from '../Loading';
import Error from '@/components/Error';

const breakpointColumnsObj = {
  default: 5,
  1200: 3,
  900: 2,
  600: 1,
};

const BookSlider = () => {
  const booksQuery = useQuery({
    queryKey: ['books'],
    queryFn: getDocuments,
  });

  if (booksQuery.isLoading) {
    return <Loading />;
  }

  if (booksQuery.isError || !booksQuery.data) {
    return <Error />;
  }

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {booksQuery.data.map((book, index) => (
        <BookCard
          key={index}
          data={book}
        />
      ))}
    </Masonry>
  );
};

export default BookSlider;
