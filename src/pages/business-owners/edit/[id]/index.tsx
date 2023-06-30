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
import { getBusinessOwnerById, updateBusinessOwnerById } from 'apiSdk/business-owners';
import { Error } from 'components/error';
import { businessOwnerValidationSchema } from 'validationSchema/business-owners';
import { BusinessOwnerInterface } from 'interfaces/business-owner';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';

function BusinessOwnerEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<BusinessOwnerInterface>(
    () => (id ? `/business-owners/${id}` : null),
    () => getBusinessOwnerById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: BusinessOwnerInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateBusinessOwnerById(id, values);
      mutate(updated);
      resetForm();
      router.push('/business-owners');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<BusinessOwnerInterface>({
    initialValues: data,
    validationSchema: businessOwnerValidationSchema,
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
            Edit Business Owner
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
            <FormControl id="business_name" mb="4" isInvalid={!!formik.errors?.business_name}>
              <FormLabel>Business Name</FormLabel>
              <Input
                type="text"
                name="business_name"
                value={formik.values?.business_name}
                onChange={formik.handleChange}
              />
              {formik.errors.business_name && <FormErrorMessage>{formik.errors?.business_name}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<UserInterface>
              formik={formik}
              name={'user_id'}
              label={'Select User'}
              placeholder={'Select User'}
              fetcher={getUsers}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.email}
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
    entity: 'business_owner',
    operation: AccessOperationEnum.UPDATE,
  }),
)(BusinessOwnerEditPage);
