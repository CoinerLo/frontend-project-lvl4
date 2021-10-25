import * as Yup from 'yup';

const validationSchema = (channelsNames) => Yup.object({
  channelName: Yup.string().trim()
    .min(3, 'errors.length')
    .max(20, 'errors.length')
    .notOneOf(channelsNames, 'errors.uniq')
    .required('errors.required'),
});

export default validationSchema;
