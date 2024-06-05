import * as yup from "yup";

export const loginSchema = yup.object({
    email: yup.string().email('please enter a valid email').required('please enter your email'),
    password: yup.string().required("No password provided")
}).required();
export const registerEnseignantSchema = yup.object({
    userName: yup.string().required('a user-name is required'),
    email: yup.string().email('please enter a valid email').required('please enter your email'),
    password: yup.string().required("No password provided").min(8, "Password is too short - should be 8 chars minimus"),
    modules: yup.string().required("this field is required").matches("[a-zA-Z]+(,[a-zA-Z]+)*", "regex error"),
    experience: yup.string().required("please specify number of years"),
    CV: yup.mixed()
        .test("required", "this file is required", (value) => {
            return !!value[0]
        })
        .test('fileSize', 'File size is too large (max 10MB)', (value) => {
            return value && value[0]?.size <= 10485760; // Max file size 10MB
        })
        .test('fileType', 'image or pdf files only', (value) => {
            return value && ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'].includes(value[0]?.type);
        }),
    identite: yup.mixed()
        .test("required", "this file is required", (value) => {
            return !!value[0]
        })
        .test('fileSize', 'File size is too large (max 10MB)', (value) => {
            return value && value[0]?.size <= 10485760; // Max file size 10MB
        })
        .test('fileType', 'image or pdf files only', (value) => {
            return value && ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'].includes(value[0]?.type);
        }),
    days: yup.array().of(
        yup.object({
            dayName: yup.string().required("Day Name is required"),
            startTime: yup.string().required("Start Time is required"),
            endTime: yup.string().required("End Time is required"),
        })
    ),
})

export const registerParentSchema = yup.object({
    userName: yup.string().required('a user-name is required'),
    email: yup.string().email('please enter a valid email').required('please enter your email'),
    password: yup.string().required("No password provided").min(8, "Password is too short - should be 8 chars minimus")
})

export const videoSchema = yup.object({
    title: yup.string().min(3, "title too short").max(60, "title too long").required("video title is required"),
    desc: yup.string().max(1000),
    category: yup.string()
});