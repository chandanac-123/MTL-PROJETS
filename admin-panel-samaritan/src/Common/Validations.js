import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .matches(/^(?!.*@[^,]*,)/)
    .required('Email is required'),
  password: Yup.string()
    // .min(8, 'Password must be at least 8 characters long')
    // .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    // .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    // .matches(/\d/, 'Password must contain at least one digit')
    // .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character (!@#$%^&*(),.?":{}|<>)')
    .required('Password is required')
});

export const forgetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .matches(/^(?!.*@[^,]*,)/)
    .required('Email is required')
});

export const resetPasswordSchema = Yup.object().shape({
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required')
});


export const changePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string().required('Password is required'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required')
});

export const categorySchema = Yup.object().shape({
  category: Yup.string()
    .matches(/^[^\s].*$/, 'Field should not start with a blank space')
    .required('This field is required')
});

export const basicDetailSchema = Yup.object().shape({
  category: Yup.object().required('This field is required'),
  eventName: Yup.string()
    .required('This field is required')
    .max(100, 'Event name cannot be longer than 100 characters'),
  organizerName: Yup.object().required('This field is required')
});

const checkImageDimensions = (file) => {
  return new Promise((resolve) => {
    if (!(file instanceof Blob)) {
      resolve(true); // If it's not a valid file, consider it as valid since there's no new file to check
      return;
    }

    const image = new Image();
    const objectUrl = window.URL.createObjectURL(file);

    image.onload = () => {
      window.URL.revokeObjectURL(objectUrl); // Clean up the URL
      if (image.width <= 636 && image.height <= 368) {
        resolve(true);
      } else {
        resolve(false);
      }
    };

    image.onerror = () => {
      window.URL.revokeObjectURL(objectUrl); // Clean up the URL
      resolve(false); // In case of an error, we resolve with false
    };

    image.src = objectUrl;
  });
};

export const coverImageSchema = Yup.object().shape({
  coverImage: Yup.mixed()
    .required('This field is required')
    .test('fileSize', 'Image size must be 636 x 368 pixels or smaller', async function (value) {
      // `this.options.context` can be used to check the current form context
      const { initialCoverImage } = this.options.context || {};

      // If there's no new file or the file hasn't changed, skip validation
      if (initialCoverImage && value === initialCoverImage) {
        return true;
      }

      // If no file is uploaded, skip validation
      if (!value) return true;

      return await checkImageDimensions(value);
    })
});


export const otherDetailSchema = Yup.object().shape({
  venue: Yup.string().required('This field is required'),
  locationName: Yup.object().required('This field is required'),
  eventDate: Yup.date().required('This field is required'),
  startTime: Yup.string().required('This field is required'),
  endTime: Yup.string().required('This field is required')
});

export const profileUpdateSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').matches(/^(?!.*@[^,]*,)/).required('Email is required'),
  fullName: Yup.string().required('This field is required'),
  phone: Yup.string().matches(/^[6-9]\d{9}$/, 'Phone number must be exactly 10 digits').required('Phone number is required'),
});
