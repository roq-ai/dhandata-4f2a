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
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getGameById, updateGameById } from 'apiSdk/games';
import { Error } from 'components/error';
import { gameValidationSchema } from 'validationSchema/games';
import { GameInterface } from 'interfaces/game';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { BusinessOwnerInterface } from 'interfaces/business-owner';
import { getBusinessOwners } from 'apiSdk/business-owners';

function GameEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<GameInterface>(
    () => (id ? `/games/${id}` : null),
    () => getGameById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: GameInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateGameById(id, values);
      mutate(updated);
      resetForm();
      router.push('/games');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<GameInterface>({
    initialValues: data,
    validationSchema: gameValidationSchema,
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
            Edit Game
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="fee" mb="4" isInvalid={!!formik.errors?.fee}>
              <FormLabel>Fee</FormLabel>
              <NumberInput
                name="fee"
                value={formik.values?.fee}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('fee', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.fee && <FormErrorMessage>{formik.errors?.fee}</FormErrorMessage>}
            </FormControl>
            <FormControl id="status" mb="4" isInvalid={!!formik.errors?.status}>
              <FormLabel>Status</FormLabel>
              <Input type="text" name="status" value={formik.values?.status} onChange={formik.handleChange} />
              {formik.errors.status && <FormErrorMessage>{formik.errors?.status}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<BusinessOwnerInterface>
              formik={formik}
              name={'business_owner_id'}
              label={'Select Business Owner'}
              placeholder={'Select Business Owner'}
              fetcher={getBusinessOwners}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.business_name}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
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
    entity: 'game',
    operation: AccessOperationEnum.UPDATE,
  }),
)(GameEditPage);
