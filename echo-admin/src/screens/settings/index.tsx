'use client'

import React from 'react'
import AddEditHeader from '@/common/add-edit-header'
import Image from 'next/image'
import profile from "@public/icons/profile_default.svg"
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useGetProfiledetailsQuery, usePasswordupdateQuery, useProfileDetailsQuery } from '@/api-queries/settings/queries'
import { useFormik } from 'formik'
import { basicprofileUpdateSchema, passwordUpdateSchema } from '@/utils/validations'
import { useRouter } from 'next/navigation'
import { capitalizeWords } from '@/utils/helper'

export interface Updateprofiletype {
  firstName: string,
  surname: string,
  mobile: string
}

export interface Updatepasswordtype {
  currentPassword: string,
  newPassword: string
  confirmpassword?: string
}

export default function Settings() {
  const router = useRouter()
  const { data: Profiledetails } = useGetProfiledetailsQuery()
  const { mutateAsync: updatebasicProfile } = useProfileDetailsQuery()
  const { mutateAsync: updatepassword } = usePasswordupdateQuery()

  const initialValues: Updateprofiletype = {
    firstName: Profiledetails?.data?.firstName || "",
    surname: Profiledetails?.data?.surname || "",
    mobile: Profiledetails?.data?.mobile || ""
  };

  const formik = useFormik<Updateprofiletype>({
    initialValues,
    enableReinitialize: true,
    validationSchema: basicprofileUpdateSchema,
    onSubmit: async (values: any) => {
      const details = {
        firstName: values?.firstName.trim(),
        surname: values?.surname.trim(),
        mobile: values?.mobile?.toString()
      }
      try {
        await updatebasicProfile(details);

      } catch (error: any) {
      }
    }
  });

  const password_initialValues: Updatepasswordtype = {
    currentPassword: "",
    newPassword: "",
    confirmpassword: ""
  };

  const passwordformik = useFormik<Updatepasswordtype>({
    initialValues: password_initialValues,
    enableReinitialize: false,
    validationSchema: passwordUpdateSchema,
    onSubmit: async (values: any) => {
      const details = {
        currentPassword: values?.currentPassword,
        newPassword: values?.newPassword?.length == values?.confirmpassword?.length ? values?.newPassword : "",
      }
      try {
        await updatepassword(details);
        router.push('/');
        localStorage.clear();
        document.cookie = 'access_token=; Max-Age=0; path=/;';
        window.location.reload()
      } catch (error: any) {
      }
    }
  });

  return (
    <div>
      <div className="flex flex-col gap-6 h-full w-full">
        <AddEditHeader
          head="Profile Settings"
          backwardIcon={false}
        />
      </div>
      <div className="flex flex-col lg:flex-row gap-4 mt-3">
        <div className="flex flex-col flex-1 lg:basis-1/4 gap-3 h-auto">
          <div className="w-full p-6 bg-bg_secondary rounded-lg h-full">
            <div className="flex items-center flex-col w-full">
              <Image src={profile} alt="" width={125} height={125} className="rounded-xxxl" />
              <label className="text-md font-medium mt-4 text-center whitespace-wrap">
                {capitalizeWords(`${Profiledetails?.data?.firstName ? Profiledetails?.data?.firstName : ""}${' '}${Profiledetails?.data?.surname ? Profiledetails?.data?.surname : ""}`)}
              </label>

              <label className="text-sm text-primary font-normal mb-5">
                {Profiledetails?.data?.email ? Profiledetails?.data?.email : ""}
              </label>
              {Profiledetails?.data?.roles?.[0]?.name && (
                <Badge variant="order_packing" className="px-4 py-1">
                  {Profiledetails?.data?.roles?.[0]?.name?.charAt(0)?.toUpperCase() + Profiledetails?.data?.roles?.[0]?.name?.slice(1)}
                </Badge>
              )}
            </div>

          </div>
        </div>

        <div className="flex flex-col flex-1 lg:basis-3/4 gap-3 h-auto">
          <div className="w-full p-6 bg-bg_secondary rounded-lg h-full">
            <div className="flex flex-col w-full gap-4 p-2 bg-bg_secondary rounded-md h-full">
              <label className="text-sm text-primary font-semibold">Basic Information</label>
              <label className="text-xs text-grey font-normal mb-2">Update your basic details</label>
              <form onSubmit={formik.handleSubmit} noValidate>
                <div className="flex w-full gap-4 md:flex-wrap lg:flex-nowrap">
                  <div className="w-full md:w-full lg:w-4/12">
                    <Input
                      placeholder="Enter first name"
                      label="First Name"
                      name="firstName"
                      handleChange={formik.handleChange}
                      value={formik?.values?.firstName}
                      errors={formik?.errors?.firstName}
                      touched={formik?.touched?.firstName}
                    />
                  </div>
                  <div className="w-full md:w-full lg:w-4/12">
                    <Input
                      placeholder="Enter surname"
                      label="Surname"
                      name="surname"
                      handleChange={formik.handleChange}
                      value={formik?.values?.surname}
                      errors={formik?.errors?.surname}
                      touched={formik?.touched?.surname}
                    />
                  </div>
                  <div className="w-full md:w-full lg:w-4/12">
                    <Input
                      type='number'
                      placeholder="Enter mobile number"
                      label="Mobile Number"
                      name="mobile"
                      handleChange={formik.handleChange}
                      value={formik?.values?.mobile}
                      errors={formik?.errors?.mobile}
                      touched={formik?.touched?.mobile}
                    />
                  </div>
                </div>
                <div className="flex justify-end md:justify-center lg:justify-end mt-8">
                  <Button key="add_button_1"
                    variant="add_button"
                    size="settings_save"
                    label="Save Changes"
                    disabled={!formik.isValid || !formik.dirty} />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full p-6 mt-3 bg-bg_secondary rounded-lg">
        <div className="flex flex-col w-full gap-4 p-2 bg-bg_secondary rounded-md h-full">
          <label className="text-sm text-primary font-semibold">Change Password</label>
          <label className="text-xs text-grey font-normal mb-2">Update your password</label>
          <form onSubmit={passwordformik.handleSubmit} noValidate>
            <div className="flex w-full gap-4 md:flex-wrap lg:flex-nowrap">
              <div className="w-full md:w-full lg:w-4/12">
                <Input
                  placeholder="Enter current password"
                  label="Current Password"
                  name="currentPassword"
                  handleChange={passwordformik.handleChange}
                  value={passwordformik?.values?.currentPassword}
                  errors={passwordformik?.errors?.currentPassword}
                  touched={passwordformik?.touched?.currentPassword}
                />
              </div>
              <div className="w-full md:w-full lg:w-4/12">
                <Input
                  placeholder="Enter new password"
                  label="New Password"
                  name="newPassword"
                  handleChange={passwordformik.handleChange}
                  value={passwordformik?.values?.newPassword}
                  errors={passwordformik?.errors?.newPassword}
                  touched={passwordformik?.touched?.newPassword}
                />
              </div>
              <div className="w-full md:w-full lg:w-4/12">
                <Input
                  placeholder="Re-enter new password"
                  label="Confirm Password"
                  name="confirmpassword"
                  handleChange={passwordformik.handleChange}
                  value={passwordformik?.values?.confirmpassword}
                  errors={passwordformik?.errors?.confirmpassword}
                  touched={passwordformik?.touched?.confirmpassword}
                />
              </div>
            </div>
            <div className="flex justify-end md:justify-center lg:justify-end mt-5">
              <Button
                key="add_button_1"
                variant="add_button"
                size="settings_save"
                label="Save Changes" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
