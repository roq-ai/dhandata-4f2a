import * as yup from 'yup';

export const participationValidationSchema = yup.object().shape({
  player_id: yup.string().nullable().required(),
  game_id: yup.string().nullable().required(),
});
