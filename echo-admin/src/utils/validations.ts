import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .matches(/^(?!.*@[^,]*,)/)
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one digit")
    .matches(
      /[!@#$%^&*+]/,
      "Password must contain at least one special character (!@#$%^&*+)"
    )
    .required("Password is required"),
});

export const forgetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .matches(/^(?!.*@[^,]*,)/)
    .required("Email is required"),
});

export const resetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one digit")
    .matches(
      /[!@#$%^&*+]/,
      "Password must contain at least one special character (!@#$%^&*+)"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .required("Confirm Password is required"),
});

export const categorySchema = Yup.object().shape({
  category: Yup.string()
    .required("This field is required")
    .matches(/^\S.*$/, "Whitespace is not allowed")
    .max(50, "Should not exceed 50 characters"),
});

export const menuSchema = Yup.object().shape({
  menu: Yup.string()
    .required("This field is required")
    .matches(/^\S.*$/, "Whitespace is not allowed")
    .max(50, "Should not exceed 50 characters"),
  imageFile: Yup.string().required("This field is required"),
});

export const productGeneralSchema = Yup.object().shape({
  productName: Yup.string()
    .required("This field is required")
    .matches(/^\S.*$/, "Whitespace is not allowed")
    .max(100, "Cannot exceed 100 characters"),
  brandName: Yup.string().required("This field is required"),
  categoryName: Yup.string().required("This field is required"),
  menu: Yup.array()
    .of(Yup.string().required("This field is required")) // Assuming each menu item is a string
    .min(1, "Select at least 1 item")
    .max(2, "Select up to 2 items")
    .required("This field is required"),
  maxOrderLimit: Yup.number()
    .typeError("Must be a number")
    .required("This field is required"),
  productPrice: Yup.number()
    .typeError("Must be a number")
    .required("This field is required")
    .test(
      "is-decimal",
      "The price must have at most 2 decimal places",
      (value: any) => /^\d+(\.\d{1,2})?$/.test(value)
    ),
  description: Yup.string()
    .required("This field is required")
    .test(
      "no-whitespace-or-empty-tags",
      "Whitespace or empty tags are not allowed",
      (value) => {
        // Remove HTML tags and check if there is any meaningful content
        const strippedContent = value?.replace(/<[^>]*>/g, "").trim();
        return !!strippedContent; // returns true if there's non-whitespace content
      }
    ),
  primaryImg: Yup.string().required("This field is required"),
});

export const productMedicinalSchema = Yup.object().shape({
  productName: Yup.string()
    .required("This field is required")
    .matches(/^\S.*$/, "Whitespace is not allowed")
    .max(100, "Cannot exceed 100 characters"),
  brandName: Yup.string().required("This field is required"),
  categoryName: Yup.string().required("This field is required"),
  menu: Yup.array()
    .of(Yup.string().required("This field is required"))
    .min(1, "Select at least 1 item")
    .max(2, "Select up to 2 items")
    .required("This field is required"),
  maxOrderLimit: Yup.number()
    .typeError("Must be a number")
    .required("This field is required"),
  productPrice: Yup.number()
    .typeError("Must be a number")
    .required("This field is required")
    .test(
      "is-decimal",
      "The price must have at most 2 decimal places",
      (value: any) => /^\d+(\.\d{1,2})?$/.test(value)
    ),
  description: Yup.string()
    .required("This field is required")
    .test(
      "no-whitespace-or-empty-tags",
      "Whitespace or empty tags are not allowed",
      (value) => {
        // Remove HTML tags and check if there is any meaningful content
        const strippedContent = value?.replace(/<[^>]*>/g, "").trim();
        return !!strippedContent; // returns true if there's non-whitespace content
      }
    ),
  primaryImg: Yup.string().required("This field is required"),
  dosage: Yup.string()
    .required("This field is required")
    .max(75, "Cannot exceed 75 characters"),
  usage: Yup.string()
    .required("This field is required")
    .max(200, "Cannot exceed 200 characters"),
});

export const brandSchema = Yup.object().shape({
  brandName: Yup.string()
    .required("This field is required")
    .matches(/^\S.*$/, "Whitespace is not allowed")
    .max(30, "Cannot exceed 30 characters"),
});

export const stockUpdateSchema = Yup.object().shape({
  quantity: Yup.number()
    .required("This field is required")
    .integer("Quantity must be a whole number")
    .min(1, "Quantity must be greater than zero"),
});

export const bannerUpdateSchema = Yup.object().shape({
  primaryImg: Yup.string().required("This field is required"),
  bannerProducts: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.string().required("Product ID is required"),
        name: Yup.string().required("Product name is required"),
      })
    )
    .min(1, "Please select at least one product")
    .required("Product selection is required"),
  content1_title: Yup.string()
    .required("This field is required")
    .max(14, "Cannot exceed 14 characters"),
  content2_title: Yup.string()
    .required("This field is required")
    .max(10, "Cannot exceed 10 characters"),
  content3_title: Yup.string()
    .required("This field is required")
    .max(14, "Cannot exceed 14 characters"),
  content4_title: Yup.string()
    .required("This field is required")
    .max(14, "Cannot exceed 14 characters"),
});

export const basicprofileUpdateSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("This field is required")
    .matches(/^[A-Za-z\s]+$/, "Only letters and spaces are allowed")
    .max(50, "Cannot exceed 50 characters")
    .strict(),
  surname: Yup.string()
    .required("This field is required")
    .matches(/^[A-Za-z\s]+$/, "Only letters and spaces are allowed")
    .max(50, "Cannot exceed 50 characters")
    .strict(),
  mobile: Yup.string()
    .length(11, "Phone number is not valid")
    .matches(/^[0-9]+$/, "Mobile number must contain digits only")
    .required("This field is required"),
});

export const passwordUpdateSchema = Yup.object().shape({
  currentPassword: Yup.string().required("This field is required"),
  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one digit")
    .matches(
      /[!@#$%^&*+]/,
      "Password must contain at least one special character (!@#$%^&*+)"
    )
    .required("Password is required"),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), ""], "Passwords do not match")
    .required("This field is required"),
});

export const couponSchema = Yup.object().shape({
  couponCode: Yup.string()
    .required("This field is required")
    .matches(/^\S.*$/, "Whitespace is not allowed")
    .max(20, "Cannot exceed 20 characters"),
  couponName: Yup.string()
    .required("This field is required")
    .matches(/^\S.*$/, "Whitespace is not allowed")
    .max(50, "Cannot exceed 50 characters"),
  discountType: Yup.string().required("This field is required"),
  discountValue: Yup.number()
    .typeError("Only numbers are allowed")
    .required("This field is required")
    .positive("Value must be positive")
    .when("discountType", (discountType, schema) => {
      const type = Array.isArray(discountType) ? discountType[0] : discountType; // In case it's an array, take the first element
      return type === "percentage"
        ? schema.max(100, "Discount value cannot exceed 100%")
        : schema;
    }),
  minCartValue: Yup.number()
    .typeError("Only numbers are allowed")
    .required("This field is required")
    .positive("Value must be positive"),
  validFrom: Yup.string()
    .required("This field is required")
    .test("valid-date-format", function (value) {
      return Yup.date().isValid(value); // checks if the date is valid
    }),
  validTo: Yup.string()
    .required("This field is required")
    .test("valid-date-format", function (value) {
      return Yup.date().isValid(value); // checks if the date is valid
    })
    .test(
      "is-after-validFrom",
      "Valid To must be after Valid From",
      function (value) {
        const { validFrom } = this.parent;
        return new Date(value) >= new Date(validFrom); // check if validTo is after validFrom
      }
    ),
  totalCoupon: Yup.number()
    .typeError("Only numbers are allowed")
    .required("This field is required")
    .positive("Value must be positive"),
  couponLimit: Yup.number()
    .typeError("Only numbers are allowed")
    .required("This field is required")
    .positive("Value must be positive")
    .test(
      "is-less-than-totalCoupon",
      "Coupon limit must be less than or equal to the total number of coupons",
      function (value) {
        const { totalCoupon } = this.parent;
        return value <= totalCoupon; // Ensure couponLimit is <= totalCoupon
      }
    ),
  discription: Yup.string()
    .required("This field is required")
    .max(200, "Cannot exceed 200 characters"),
});

export const addcreditSchema = Yup.object().shape({
  amount: Yup.number()
    .required("This field is required")
    .min(0, "Credit cannot be negative")
    .positive("Value must be positive"),
  type: Yup.string().required("This field is required"),
});

export const userCreateSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("This field is required")
    .matches(/^\S.*$/, "Whitespace is not allowed")
    .max(50, "Cannot exceed 50 characters"),
  surname: Yup.string()
    .required("This field is required")
    .matches(/^\S.*$/, "Whitespace is not allowed")
    .max(50, "Cannot exceed 50 characters"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .matches(/^(?!.*@[^,]*,)/)
    .max(100, "Cannot exceed 100 characters")
    .required("Email is required"),
});
