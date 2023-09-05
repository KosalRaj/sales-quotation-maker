import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  VStack,
  Flex,
  Checkbox
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { FiPlusSquare } from 'react-icons/fi'
import { ICustomer } from '../../models/customer'
import { ICustomerInput } from '../../network/customerApi'
import * as CustomersApi from '../../network/customerApi'

interface AddCustomerDialogue {
  onCustomerSaved: (customer: ICustomer) => void
  buttonType: string
}

const AddCustomerDiaogue = ({
  onCustomerSaved,
  buttonType
}: AddCustomerDialogue) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  async function onSubmit(input: ICustomerInput) {
    console.log(input)
    try {
      const customerResponse = await CustomersApi.addCustomer(input)
      onCustomerSaved(customerResponse)
      reset()
    } catch (error) {
      console.error(error)
      alert(error)
    }
  }

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ICustomerInput>()

  return (
    <>
      <Button
        className={buttonType}
        variant="outline"
        size="lg"
        leftIcon={<FiPlusSquare />}
        onClick={onOpen}
      >
        Add Customer
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Customer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form id="addCustomerForm" onSubmit={handleSubmit(onSubmit)}>
              <VStack spacing={4}>
                <FormControl isInvalid={!!errors.name}>
                  <FormLabel htmlFor="name">Customer name</FormLabel>
                  <Input
                    type="text"
                    id="name"
                    placeholder="Enter Customer Name"
                    {...register('name', {
                      required: 'Customer name is required'
                    })}
                  />
                  <FormErrorMessage>
                    {errors.name && errors.name?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl>
                  <FormLabel>Address</FormLabel>
                  <Input
                    type="text"
                    id="address"
                    placeholder="Enter Customer Address"
                    {...register('address', {
                      required: 'Customer physical address is required'
                    })}
                  />
                  <FormErrorMessage>
                    {errors.address && errors.address?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    id="email"
                    placeholder="Enter customer email"
                    {...register('email', {
                      required: 'Customer email is required'
                    })}
                  />
                  <FormErrorMessage>
                    {errors.email && errors.email?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl>
                  <FormLabel>Contact</FormLabel>
                  <Input
                    type="number"
                    id="contact"
                    placeholder="Enter customer contact number"
                    {...register('contact', {
                      required: 'Contact number is required'
                    })}
                  />
                  <FormErrorMessage>
                    {errors.contact && errors.contact?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl>
                  <FormLabel>Contact Person</FormLabel>
                  <Input
                    type="text"
                    id="contactPerson"
                    placeholder="Enter contact person name"
                    {...register('contactPerson', {
                      required: 'Contact person is required'
                    })}
                  />
                  <FormErrorMessage>
                    {errors.contactPerson && errors.contactPerson?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl>
                  <Checkbox id="sameBilling" {...register('sameBilling')}>
                    Same as physical address address?
                  </Checkbox>
                </FormControl>

                <FormControl>
                  <FormLabel>Billing Address</FormLabel>
                  <Input
                    type="text"
                    id="billingAddress"
                    placeholder="Enter Billing Address"
                    {...register('billingAddress')}
                  />
                  <FormErrorMessage>
                    {errors.billingAddress && errors.billingAddress?.message}
                  </FormErrorMessage>
                </FormControl>
              </VStack>
            </form>
          </ModalBody>
          <ModalFooter>
            <Flex my={2} justifyContent="space-between" w="full">
              <Button variant="outline" colorScheme="blue" onClick={onClose}>
                Close
              </Button>
              <Button
                form="addCustomerForm"
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
              >
                Submit
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddCustomerDiaogue
