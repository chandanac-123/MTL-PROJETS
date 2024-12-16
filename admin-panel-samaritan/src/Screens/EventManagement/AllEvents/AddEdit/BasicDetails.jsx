import { useCategoryQuery, useUsersQuery } from '../../../../ApiQueries/Dropdown/DropdownQueries';
import SubmitButton from '../../../../Components/Buttons/SubmitButton';
import Input from '../../../../Components/Inputs/Input';
import SelectComponent from '../../../../Components/Inputs/Select';
import arrow from '../../../../assets/arrow-right.svg';

const BasicDetails = ({ setActive, formik }) => {
  const { data: categoryList, isFetching } = useCategoryQuery();
  const { data: userlist, isFetching: userFetch } = useUsersQuery({
    filterVal: 'active'
  });

  return (
    <form>
      <div className=" max-w-full mobile:max-w-[840px] mx-auto rounded-lg mt-11">
        <div className="flex gap-4 flex-col sm:flex-row mobile:w-full mb-4">
          <label className="w-48 text-text_black font-semibold">Select Category</label>
          <SelectComponent
            placeholder="Category"
            className="font-thin"
            options={categoryList?.data}
            constant={false}
            value={formik.values.category}
            errors={formik.errors.category}
            touched={formik.touched.category}
            onChange={(selectedOptions) => {
              formik.setFieldValue('category', selectedOptions);
            }}
          />
        </div>

        <div className="flex gap-4 flex-col sm:flex-row mobile:w-full">
          <label className="w-48 text-text_black font-semibold">Event Name</label>
          <Input placeholder="Type here " className="bg-btn_grey" name="eventName" value={formik.values.eventName} errors={formik.errors.eventName} touched={formik.touched.eventName} handleChange={formik.handleChange} />
        </div>

        <div className="flex gap-4 flex-col sm:flex-row mobile:w-full">
          <label className="w-48 text-text_black font-semibold">Select Organizer/User</label>
          <SelectComponent
            placeholder="Search organizer/user"
            className="bg-btn_grey font-thin"
            options={userlist?.data}
            constant={false}
            value={formik.values.organizerName}
            errors={formik.errors.organizerName}
            touched={formik.touched.organizerName}
            onChange={(selectedOptions) => {
              formik.setFieldValue('organizerName', selectedOptions);
            }}
          />
        </div>
        {/* <div className='flex sm:gap-16 gap-4 flex-col sm:flex-row mobile:w-full mt-4'>
          <label className='w-auto text-text_black font-semibold'>Organizer Logo</label>
          <ImageUpload fileChange={(e) => ('propImg', e)}/>
        </div>
        <div className="flex gap-4 mobile:w-full font-normal i text-xs font-inter text-img_text sm:pl-40 pl-0 mt-4">Allowed file types: png, jpg, jpeg.</div> */}
        <div className="flex w-full gap-3 mt-4 justify-end">
          <div className="mobile:w-1/4 w-2/4">
            <SubmitButton
              label="Continue"
              type="button"
              icon={arrow}
              onClick={() => {
                formik?.validateForm().then((res) => {
                  formik.setTouched(res);
                  if (formik.isValid) {
                    setActive('2');
                  }
                });
              }}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default BasicDetails;
