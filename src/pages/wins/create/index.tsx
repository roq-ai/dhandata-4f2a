import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createWin } from 'apiSdk/wins';
import { Error } from 'components/error';
import { winValidationSchema } from 'validationSchema/wins';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { PlayerInterface } from 'interfaces/player';
import { GameInterface } from 'interfaces/game';
import { getPlayers } from 'apiSdk/players';
import { getGames } from 'apiSdk/games';
import { WinInterface } from 'interfaces/win';

function WinCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: WinInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createWin(values);
      resetForm();
      router.push('/wins');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<WinInterface>({
    initialValues: {
      player_id: (router.query.player_id as string) ?? null,
      game_id: (router.query.game_id as string) ?? null,
    },
    validationSchema: winValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Win
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <AsyncSelect<PlayerInterface>
            formik={formik}
            name={'player_id'}
            label={'Select Player'}
            placeholder={'Select Player'}
            fetcher={getPlayers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <AsyncSelect<GameInterface>
            formik={formik}
            name={'game_id'}
            label={'Select Game'}
            placeholder={'Select Game'}
            fetcher={getGames}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.status}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'win',
    operation: AccessOperationEnum.CREATE,
  }),
)(WinCreatePage);
