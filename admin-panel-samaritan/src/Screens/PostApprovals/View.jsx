import { Carousel, Divider, Spin } from 'antd';
import PageLayout from '../../Common/PageLayout';
import tree from '../../assets/tree.png';
import submit_icon from '../../assets/arrow-right.svg';
import SubmitButton from '../../Components/Buttons/SubmitButton';
import { useState } from 'react';
import approve_icon from '../../assets/approve.svg';
import reject_icon from '../../assets/reject.svg';
import ApproveReject from '../../Common/ApproveReject';
import { useParams } from 'react-router-dom';
import { usePostDetailsQuery } from '../../ApiQueries/PostApprovals/PostQueries';
import { descriptiveDateConversion } from '../../Utiles/Helper';

const PostApprovalView = () => {
  const params = useParams();
  const { data, isFetching } = usePostDetailsQuery(params?.id);
  const [approve, setApprove] = useState(false);
  const [reject, setReject] = useState(false);

  const approvalFun = () => {
    setReject(false);
    setApprove(!approve);
  };

  const rejectFun = () => {
    setApprove(false);
    setReject(!reject);
  };

  return (
    <Spin spinning={isFetching}>
      <PageLayout>
        <div className="flex-auto mobile:flex gap-4 w-full p-4">
          <div className="outline outline-1 outline-bg_grey rounded-lg  mobile:w-1/2 w-full p-6">
            <div className="flex gap-2">
              <img loading="lazy" src={data?.postDetails?.User?.profile_pic || tree} alt="" className="w-10 h-10 rounded-3xl" />
              <p className="flex items-center font-semibold text-base font-inter text-head_grey">{data?.postDetails?.User?.postAuthorUsername}</p>
            </div>
            <div className="flex-col">
              <p className="text-text_black font-inter font-semibold text-lg mt-4 break-all flex-wrap">{data?.postDetails?.title}</p>
              {/* <img loading="lazy" src={tree} alt="" className='w-full h-80 rounded-lg mt-2' /> */}
              <Carousel className="w-auto mobile:w-full">
                {data?.postDetails?.PostImages.map((i, index) => (
                  <div className="w-full justify-center flex" key={index}>
                    <img loading="lazy" src={i.image_url} className="h-80 object-contain rounded-lg mt-2 mb-8" alt="" />
                  </div>
                ))}
              </Carousel>

              <p className="text-sm font-normal font-inter text-head_grey mt-4 break-all flex-wrap">{data?.postDetails?.description || ""}</p>
            </div>
          </div>

          <div className="outline outline-1 outline-bg_grey rounded-lg mobile:w-1/2 w-full p-6">
            <p className="flex items-center font-semibold text-base font-inter text-head_grey">Post Details</p>
            <Divider />
            <div className="border-b-2 border-outline_grey border-dotted sm:flex w-full pt-4 pb-4">
              <p className="font-semibold text-base font-inter text-grey sm:w-1/2 w-full">Published Date</p>
              <p className="font-medium text-text_black">{descriptiveDateConversion(data?.postDetails?.postPublishedDate)}</p>
            </div>
            <div className="border-b-2 border-outline_grey border-dotted sm:flex w-full pt-4 pb-4">
              <p className="font-semibold text-base font-inter text-grey sm:w-1/2 w-full">Category</p>
              <p className="font-medium text-text_black">{data?.postCategoryDetails?.display_name}</p>
            </div>
            {data?.postCategoryDetails?.display_name == 'Donation' && (
              <>
                <div className="border-b-2 border-outline_grey border-dotted sm:flex w-full pt-4 pb-4">
                  <p className="font-semibold text-base font-inter text-grey sm:w-1/2 w-full">NGO Name</p>
                  <p className="font-medium text-text_black">{data?.postDetails?.additional_params ? data?.postDetails?.additional_params?.ngo_name : ''}</p>
                </div>
                <div className="border-b-2 border-outline_grey border-dotted sm:flex w-full pt-4 pb-4">
                  <p className="font-semibold text-base font-inter text-grey sm:w-1/2 w-full">Amount</p>
                  <p className="font-medium text-text_black">₹ {data?.postDetails?.additional_params ? data?.postDetails?.additional_params?.amount : '0'}</p>
                </div>
              </>
            )}
            {data?.postCategoryDetails?.display_name == 'Marathon' && (
              <>
                <div className="border-b-2 border-outline_grey border-dotted sm:flex w-full pt-4 pb-4">
                  <p className="font-semibold text-base font-inter text-grey sm:w-1/2 w-full">Event Name</p>
                  <p className="font-medium text-text_black sm:w-1/2 w-full break-all flex-wrap">{data?.postDetails?.additional_params ? data?.postDetails?.additional_params?.event_name : ''}</p>
                </div>
                <div className="border-b-2 border-outline_grey border-dotted sm:flex w-full pt-4 pb-4">
                  <p className="font-semibold text-base font-inter text-grey sm:w-1/2 w-full">Distance in kilometer</p>
                  <p className="font-medium text-text_black">{data?.postDetails?.additional_params ? data?.postDetails?.additional_params?.distance_km : '0'}</p>
                </div>
              </>
            )}
            {data?.postCategoryDetails?.display_name == 'Tree Plantation' && (
              <>
                <div className="border-b-2 border-outline_grey border-dotted sm:flex w-full pt-4 pb-4">
                  <p className="font-semibold text-base font-inter text-grey sm:w-1/2 w-full">Event Name</p>
                  <p className="font-medium text-text_black sm:w-1/2 w-full break-all flex-wrap">{data?.postDetails?.additional_params ? data?.postDetails?.additional_params?.event_name : ''}</p>
                </div>
                <div className="border-b-2 border-outline_grey border-dotted sm:flex w-full pt-4 pb-4">
                  <p className="font-semibold text-base font-inter text-grey sm:w-1/2 w-full">Number of seeds planted</p>
                  <p className="font-medium text-text_black">{data?.postDetails?.additional_params ? data?.postDetails?.additional_params?.no_of_plants : ''}</p>
                </div>
              </>
            )}
            {data?.postCategoryDetails?.display_name == 'teaching Drive' && (
              <div className="border-b-2 border-outline_grey border-dotted sm:flex w-full pt-4 pb-4">
                <p className="font-semibold text-base font-inter text-grey sm:w-1/2 w-full">Location</p>
                <p className="font-medium text-text_black">{data?.postDetails?.additional_params ? data?.postDetails?.additional_params?.location : ''}</p>
              </div>
            )}
            {data?.postCategoryDetails?.display_name == 'Volunteer' || data?.postCategoryDetails?.display_name == 'Cleanup Drive' ? (
              <div className="border-b-2 border-outline_grey border-dotted sm:flex w-full pt-4 pb-4">
                <p className="font-semibold text-base font-inter text-grey sm:w-1/2 w-full">Event Name</p>
                <p className="font-medium text-text_black sm:w-1/2 w-full break-all flex-wrap">{data?.postDetails?.additional_params ? data?.postDetails?.additional_params?.event_name : ''}</p>
              </div>
            ) : (
              ''
            )}
            <div className="flex justify-center mobile:justify-end items-end mt-12 w-full gap-4">
              <div className="w-36">
                <SubmitButton label="Reject" icon={submit_icon} className="bg-red-btn" onClick={rejectFun} />
              </div>
              <div className="w-36">
                <SubmitButton label="Approve" icon={submit_icon} onClick={approvalFun} />
              </div>
            </div>
          </div>
        </div>
        <ApproveReject
          id={params?.id}
          approve={approve}
          reject={reject}
          setApprove={setApprove}
          setReject={setReject}
          label={approve ? 'Approve' : 'Reject'}
          icon={approve ? approve_icon : reject_icon}
          message={approve ? 'Are you sure you want to approve this post?' : 'Are you sure you want to reject this post?'}
        />
      </PageLayout>
    </Spin>
  );
};

export default PostApprovalView;
