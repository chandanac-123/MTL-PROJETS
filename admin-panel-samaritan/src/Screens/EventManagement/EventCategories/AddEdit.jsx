import ModalLayout from '../../../Common/ModalLayout';
import SubmitButton from '../../../Components/Buttons/SubmitButton';
import CancelButton from '../../../Components/Buttons/CancelButton';
import Input from '../../../Components/Inputs/Input';
import available from '../../../assets/available.svg';
import unavailable from '../../../assets/unavailable.svg';
import { useState } from 'react';
import { useCreateCategoryQuery, useUpdateCategoryQuery, useEventCategoryCheckQuery, useCategoryGetByIdQuery } from '../../../ApiQueries/EventCategory/EventCategoryQueries';
import { useFormik } from 'formik';
import { debounce } from '../../../Utiles/Helper';
import { categorySchema } from '../../../Common/Validations';

const AddEdit = ({ open, setOpen, id }) => {
  const [state, setState] = useState('');
  const [enabled, setEnabled] = useState(false);
  const { mutateAsync: create, isPending } = useCreateCategoryQuery();
  const { mutateAsync: update, isPending: isUpdating } = useUpdateCategoryQuery();
  const { data, isFetching } = useEventCategoryCheckQuery({ state, enabled });

  const initialValues = {
    category: id.display_name || ''
  };

  const formik = useFormik({
    initialValues,
    validationSchema: categorySchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const details = { name: values.category, categoryId: id?.id };
      try {
        if (id && !data?.data) {
          await update(details);
          setOpen(false);
          setEnabled(false);
        } else {
          if (data?.data == false) {
            await create(details);
            formik.resetForm();
            setOpen(false);
            setEnabled(false);
          }
        }
      } catch (error) {
        console.log('error: ', error);
      }
    }
  });

  const handleCheck = debounce((e) => {
    const value = e.target.value;
    if (value) {
      setState(value);
      setEnabled(true);
    } else setEnabled(false);
  });

  return (
    <ModalLayout isOpen={open} setIsOpen={setOpen} title={id ? 'Edit Category' : 'Add Category'}>
      <form onSubmit={formik.handleSubmit} noValidate>
        <div className="outline-dotted outline-border_grey rounded-lg outline-1  p-4 mt-4">
          <Input
            handleChange={(event) => {
              handleCheck(event);
              formik.handleChange(event);
            }}
            value={formik.values.category}
            errors={formik?.errors.category}
            touched={formik?.touched.category}
            label="Category Name"
            name="category"
            className="rounded-lg p-2 w-full bg-btn_grey border border-color-gray focus:outline-none mt-4"
          />

          {enabled && (
            <div className="flex gap-1 justify-end" style={{ color: !data?.data ? '#00C47D' : '#EC305E' }}>
              <img loading="lazy" src={!data?.data ? available : unavailable} alt="" />
              {!data?.data ? 'Available' : 'Unavailable'}
            </div>
          )}
        </div>
        <div className="flex w-full gap-3 mt-4 justify-end items-end">
          <div className="flex w-40">
            <CancelButton type="button" onClick={() => setOpen(false)} />
          </div>
          <div className="flex w-40">
            <SubmitButton type="submit" loading={isPending || isUpdating} label={id ? 'Save Changes' : 'Add Category'} />
          </div>
        </div>
      </form>
    </ModalLayout>
  );
};

export default AddEdit;
