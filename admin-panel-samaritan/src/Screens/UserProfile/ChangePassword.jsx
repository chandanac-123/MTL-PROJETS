import { Divider } from 'antd';
import Input from '../../Components/Inputs/Input';
import right_arrow from '../../assets/arrow-right.svg';
import SubmitButton from '../../Components/Buttons/SubmitButton';
import { useChangePasswordQuery } from '../../ApiQueries/Authentication/AuthQuerys';
import { useFormik } from 'formik';
import { changePasswordSchema } from '../../Common/Validations';

const ChangePassword = () => {
  const { mutateAsync: update, isPending } = useChangePasswordQuery()

  const initialValues = {
    currentPassword: '',
    password: '',
    confirmPassword: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: changePasswordSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const details = {
        currentPassword: values.currentPassword,
        newPassword: values.confirmPassword
      };
      try {
        await update(details);
        formik.resetForm()
      }
      catch (error) {
        console.log('error: ', error);
      }
    }
  });

  return (
    <div className=" outline outline-1 rounded-lg w-full outline-outline_grey">
      <h3 className="text-head_grey font-semibold text-base pl-8 pt-8">Change Password</h3>
      <Divider />
      <form className="p-8" onSubmit={formik.handleSubmit} noValidate>
        <div className="flex gap-6 flex-col sm:flex-row w-full">
          <label className="w-60 text-table_text font-semibold font-inter text-sm">Current Password</label>
          <Input className="bg-btn_grey" name="currentPassword" value={formik.values.currentPassword} errors={formik.errors.currentPassword} touched={formik.touched.currentPassword} handleChange={formik.handleChange} />
        </div>
        <div className="flex gap-6 flex-col sm:flex-row w-full">
          <label className="w-60 text-table_text font-semibold font-inter text-sm"> New Password </label>
          <Input className="bg-btn_grey" name="password" value={formik.values.password} errors={formik.errors.password} touched={formik.touched.password} handleChange={formik.handleChange} />
        </div>
        <div className="flex gap-6 flex-col sm:flex-row w-full">
          <label className="w-60 text-table_text font-semibold font-inter text-sm"> Confirm Password</label>
          <Input className="bg-btn_grey" name="confirmPassword" value={formik.values.confirmPassword} errors={formik.errors.confirmPassword} touched={formik.touched.confirmPassword} handleChange={formik.handleChange} />
        </div>
        <div className="flex justify-end w-full">
          <div>
            <SubmitButton icon={right_arrow} label="Save Changes" type="submit" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
