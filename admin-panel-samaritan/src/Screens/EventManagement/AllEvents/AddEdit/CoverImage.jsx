import CancelButton from '../../../../Components/Buttons/CancelButton';
import SubmitButton from '../../../../Components/Buttons/SubmitButton';
import CoverImageUpload from '../../../../Components/Upload/CoverImageUpload';
import arrow from '../../../../assets/arrow-right.svg';

const CoverImage = ({ setActive, formik }) => {
  return (
    <form>
      <div className=" max-w-full mobile:max-w-[840px] mx-auto rounded-lg mt-11">
        <div className="flex gap-4 flex-col sm:flex-row mobile:w-full mb-8">
          <label className="w-48 text-text_black font-semibold">Upload Image</label>
          <CoverImageUpload formik={formik} fileChange={(e) => formik?.setFieldValue('coverImage', e)} errors={formik?.errors?.coverImage} image={formik?.values?.coverImage} touched={formik?.touched?.coverImage} />
        </div>
        <div className="flex w-full gap-3 mt-4 justify-between">
          <div className="mobile:w-1/4 w-2/4">
            <CancelButton label="Back" onClick={() => setActive('1')} type="button" />
          </div>
          <div className="mobile:w-1/4 w-2/4">
            <SubmitButton
              label="Continue"
              icon={arrow}
              type="button"
              onClick={() => {
                formik?.validateForm().then((res) => {
                  formik.setTouched(res);
                  if (Object.keys(res).length === 0 && formik.isValid) {
                    setActive('3');
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

export default CoverImage;
