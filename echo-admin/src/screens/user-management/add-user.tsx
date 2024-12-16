import { useUserCreateQuery } from "@/api-queries/user-managament/queries";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ModalLayout from "@/components/ui/modal";
import RadioButton from "@/components/ui/radio_button";
import { UserRole } from "@/constants/user-role";
import { userCreateSchema } from "@/utils/validations";
import { useFormik } from "formik";
export interface UserFormType {
    firstName: string,
    surname: string,
    email: string,
}

export default function AddUser({ isModalOpen, handleCloseModal }: any) {
    const { mutateAsync: createUser, isPending } = useUserCreateQuery()

    const initialValues: UserFormType = {
        firstName: '',
        surname: '',
        email: '',
    };

    const formik = useFormik<UserFormType>({
        initialValues,
        validationSchema: userCreateSchema,
        onSubmit: async (values: UserFormType) => {
            try {
                await createUser(values)
                handleCloseModal()
            } catch (error: any) {
            }
        }
    });

    return (
        <ModalLayout isOpen={isModalOpen} onClose={handleCloseModal} title="Add New User">
            <form onSubmit={formik.handleSubmit} noValidate>
                <div className="flex flex-col gap-4">
                    <Input
                        label='First Name'
                        placeholder='Enter first name'
                        name="firstName"
                        handleChange={formik.handleChange}
                        value={formik.values.firstName}
                        errors={formik?.errors?.firstName}
                        touched={formik.touched.firstName} />
                    <Input
                        label='Enter surname'
                        placeholder='Enter surname'
                        name="surname"
                        handleChange={formik.handleChange}
                        value={formik.values.surname}
                        errors={formik?.errors?.surname}
                        touched={formik.touched.surname} />
                    <Input
                        label='Email'
                        placeholder='Enter email address'
                        type='email'
                        name="email"
                        handleChange={formik.handleChange}
                        value={formik.values.email}
                        errors={formik?.errors?.email}
                        touched={formik.touched.email} />
                    <div className="flex flex-col justify-start items-start gap-3">
                        <p>Role</p>
                        <RadioButton
                            options={UserRole}
                            defaultValue='admin'
                        />
                    </div>

                </div>

                <div className="flex gap-4 mt-8">
                    <Button
                        variant="cancel"
                        label="Cancel"
                        size='modal'
                        type='button'
                        onClick={handleCloseModal} />
                    <Button
                        variant="add_button"
                        size='add'
                        type='submit'
                        label="Invite User"
                        disabled={isPending}
                    />
                </div>
            </form>
        </ModalLayout>

    )
}
