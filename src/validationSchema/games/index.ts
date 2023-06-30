import * as yup from 'yup';

export const gameValidationSchema = yup.object().shape({
  fee: yup.number().integer().required(),
  status: yup.string().required(),
  business_owner_id: yup.string().nullable().required(),
});
