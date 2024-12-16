import KudosCard from '../../../Components/Cards/KudosCard';
import { fullMonthNameConvert } from '../../../Utiles/Helper';

const KudosReceived = ({ data }) => {
  return (
    <>
      {data?.length == 0 && <p className="text-center mt-10 font-semibold text-base text-text_black">No Kudos Received</p>}
      <div className="w-full gap-6 grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {data.map((item) => (
          <div key={item.id} className="w-full">
            <KudosCard card={item?.KudosTemplate?.image} message={item?.message} color={item?.KudosTemplate?.text_color} userName={item?.awardedBy?.full_name} date={fullMonthNameConvert(item?.createdAt)} profilePic={item?.awardedBy?.profile_pic} badge={item?.awardedBy?.Badge?.image_url} />
          </div>
        ))}
      </div>
    </>
  );
};

export default KudosReceived;
