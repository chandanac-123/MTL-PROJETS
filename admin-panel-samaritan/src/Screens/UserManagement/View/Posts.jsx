import PostCards from '../../../Components/Cards/PostCards';
import { formatDate } from '../../../Utiles/Helper';

const Posts = ({ data }) => {
  return (
    <>
      {data?.totalCount == 0 && <p className="text-center mt-10 font-semibold text-base text-text_black">No Posts Available</p>}
      <div className="w-full gap-4 grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {data?.posts.map((item) => (
          <div key={item.id} className="w-full">
            <PostCards post={item?.PostImages} category={item?.PostCategory?.display_name} description={item?.description} time={formatDate(item?.createdAt)} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Posts;
