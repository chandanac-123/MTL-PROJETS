import { Tabs } from 'antd';
import BasicDetails from './BasicDetails';
import CoverImage from './CoverImage';
import OtherDetails from './OtherDetails';
import PageLayout from '../../../../Common/PageLayout';
import './style.css';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useFormik } from 'formik';
import { useCreateEventQuery, useEditEventQuery, useEventGetByIdQuery } from '../../../../ApiQueries/AllEvent/EventQueries';
import { basicDetailSchema, coverImageSchema, otherDetailSchema } from '../../../../Common/Validations';
import { eventEditDate, expiryDate } from '../../../../Utiles/Helper';

const AddEdit = () => {
  const params = useParams();
  const [activeKey, setActive] = useState('1');
  const { mutateAsync: create, isPending } = useCreateEventQuery();
  const { mutateAsync: update, isPending: eventupdatepending } = useEditEventQuery();
  const { data, isFetching } = useEventGetByIdQuery({
    id: params?.id,
    enabled: true
  });

  const initialValues = {
    category: data?.data?.PostCategory
      ? {
        value: data?.data?.PostCategory?.id,
        label: data?.data?.PostCategory?.display_name
      }
      : '' || '',
    eventName: data?.data?.name || '',
    organizerName: data?.data?.User ? { value: data?.data?.User?.id, label: data?.data?.User?.full_name } : '' || '',
    coverImage: data?.data?.cover_image || '',
    venue: data?.data?.venue || '',
    locationName: data?.data?.location ? { value: 1, label: data?.data?.location } : '' || '',
    eventDate: data?.data?.start_date ? eventEditDate(data?.data?.start_date) : "" || '',
    startTime: new Date('2024-01-01T' + data?.data?.start_time + 'Z').getTime() - (5 * 60 + 30) * 60000 || '',
    endTime: new Date('2024-01-01T' + data?.data?.end_time + 'Z').getTime() - (5 * 60 + 30) * 60000 || '',
    eventDetails: data?.data?.description || ''
  };

  const formik = useFormik({
    initialValues,
    validationSchema: () => {
      if (activeKey == 1) return basicDetailSchema;
      else if (activeKey == 2) return coverImageSchema;
      else return otherDetailSchema;
    },
    enableReinitialize: true,
    validateOnMount: true,
    onSubmit: async (values) => {
      const coverImageChanged = values?.coverImage !== initialValues.coverImage;
      const formData = new FormData();
      if (coverImageChanged) {
        formData.append('file', values?.coverImage);
      }
      formData.append('category_id', values?.category?.value);
      formData.append('name', values?.eventName);
      formData.append('organizer', values?.organizerName?.value);
      formData.append('venue', values?.venue);
      formData.append('location', values?.locationName?.label);
      formData.append('start_date', values?.eventDate);
      formData.append('start_time', new Date(values?.startTime).toLocaleTimeString());
      formData.append('end_time', new Date(values?.endTime).toLocaleTimeString());
      formData.append('description', values?.eventDetails);
      formData.append('eventId', params.id || '');
      formData.append('expiry_date', expiryDate(values?.eventDate));
      try {
        if (params?.id) {
          await update(formData);
          formik.resetForm();
        } else {
          await create(formData);
          formik.resetForm();
        }
      } catch (error) {
        console.log('error: ', error);
      }
    }
  });

  const handleDateChange = (date, fieldName) => {
    formik.setFieldValue(fieldName, date);
  };

  const handleTimeChange = (timeString, name) => {
    formik.setFieldValue(name, timeString);
  };

  const Items = [
    <BasicDetails label="BASIC DETAILS" setActive={setActive} formik={formik} />,
    <CoverImage label="COVER IMAGE" setActive={setActive} formik={formik} />,
    <OtherDetails label="OTHER DETAILS" id={params?.id} setActive={setActive} formik={formik} handleTimeChange={handleTimeChange} handleDateChange={handleDateChange} loading={isPending || eventupdatepending} />
  ];

  return (
    <PageLayout>
      <div className="mt-2 max-w-[800px] mx-auto">
        <Tabs
          centered
          className="custom-event-tab-style"
          size="large"
          tabBarGutter={200}
          // onChange={(e) => setActive(e)}
          activeKey={activeKey}
          items={Items.map((_, i) => {
            const id = String(i + 1);
            return {
              disabled: true,
              key: id,
              label: _.props.label,
              children: _
            };
          })}
        />
      </div>
    </PageLayout>
  );
};

export default AddEdit;
