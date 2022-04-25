
import * as yup from "yup";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
export const studentValidationSchema = yup.object({

      name: yup.string().required("Enter the name of the Student"),
      adno:yup.string().required("Admission Number must be filled in"),
      grade: yup.string().required("Grade must be selected in"),
      fname: yup.string().required("Father's Name must be filled in"),
      mname:  yup.string().required("Mother's Name must be filled in"),
      contact: yup.string().min(10).max(10).matches(phoneRegExp, 'Phone number is not valid').required("Contact Number must be in"),
      gender: yup.string().required("Gender must be selected in"),
      address: yup.string().required("Address must be filled in"),
});
export const teacherValidationSchema=yup.object({
    name:yup.string().required('Name must be filled in'),
    doj:yup.date().required('DOJ must be filled in'),
    gender:yup.string().required('Gender must be select in'),
    contact: yup.string().min(10).max(10).matches(phoneRegExp, 'Contact number is not valid').required("Contact Number must be filled in"),
    address:yup.string().required('Address must be filled in')
  
  })