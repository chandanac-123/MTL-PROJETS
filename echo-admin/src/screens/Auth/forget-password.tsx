"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import { forgetPasswordSchema } from "@/utils/validations";
import { useForgotPasswordQuery } from "@/api-queries/auth/auth-queries";

interface FormValues {
  email: string;
}

export default function ForgetPasswordForm() {
  const { mutateAsync: forget_password, isPending } = useForgotPasswordQuery()

  const initialValues: FormValues = {
    email: "",
  };

  const formik = useFormik<FormValues>({
    initialValues,
    validationSchema: forgetPasswordSchema,
    onSubmit: async (values: any) => {
      try {
        await forget_password(values)
      } catch (error) { }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} noValidate className='flex flex-col w-full px-20 items-center'>
      <div className='bg-bg_secondary min-w-[520px] gap-8 rounded-xl p-8 flex flex-col'>
        <div className='flex flex-col gap-4'>
          <Input
            label='Email Address'
            placeholder='Enter email address'
            type='email'
            name="email"
            handleChange={formik.handleChange}
            value={formik.values.email}
            errors={formik?.errors?.email}
            touched={formik.touched.email} />
        </div>
        <div className='flex justify-center mt-auto'>
          <Button variant="default" label='Send Link' type="submit" disabled={isPending} loader={true}/>
        </div>
      </div>
    </form>
  )
}
