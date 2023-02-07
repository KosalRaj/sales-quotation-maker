import {
  useDisclosure,
  Button,
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
  Textarea,
  Select,
  Flex,
  VStack
} from '@chakra-ui/react'
import { IItem } from '../../models/lineItem'
import { useForm } from 'react-hook-form'
import { IItemInput } from '../../network/itemsApi'
import * as ItemsApi from '../../network/itemsApi'

interface AddItemDialogue {
  onItemSaved: (item: IItem) => void,
}

const AddItemDialogue = ({ onItemSaved }: AddItemDialogue) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { register, handleSubmit, reset, formState : {errors, isSubmitting} } = useForm<IItemInput>()

  async function onSubmit(input: IItemInput) {
    console.log(input)
    try {
      const itemResponse = await ItemsApi.createItem(input)
      onItemSaved(itemResponse)
      reset()
    } catch (error) {
      console.error(error)
      alert(error)
    }
  }

  return (
    <>
      <Button onClick={onOpen}>Add New Item</Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Item</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form id="addItemForm" onSubmit={handleSubmit(onSubmit)}>
              <VStack spacing={4}>
                <FormControl isInvalid={!!errors.itemName}>
                  <FormLabel htmlFor="itemName">Item name</FormLabel>
                  <Input
                    type="text"
                    id="itemName"
                    placeholder="Enter Item Name"
                    {...register('itemName', {
                      required: 'Item name is required'
                    })}
                  />
                  <FormErrorMessage>
                    {errors.itemName && errors.itemName?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl>
                  <FormLabel>Item Maker</FormLabel>
                  <Input
                    type="text"
                    id="manufacturer"
                    placeholder="Enter Maker"
                    {...register('manufacturer')}
                  />
                  <FormErrorMessage>
                    {errors.manufacturer && errors.manufacturer?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl>
                  <FormLabel>Model</FormLabel>
                  <Input
                    type="text"
                    id="itemModel"
                    placeholder="Enter Item Model"
                    {...register('itemModel')}
                  />
                  <FormErrorMessage>
                    {errors.itemModel && errors.itemModel?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl>
                  <FormLabel>Item Props</FormLabel>
                  <Textarea
                    id="itemProps"
                    placeholder="List Properties"
                    {...register('itemProps', {
                      setValueAs: (v) => {
                        if (typeof v === 'string' && v.length > 0) {
                          return v.split('\n')
                        }
                        return []
                      }
                    })}
                  />
                </FormControl>
                <FormControl isInvalid={!!errors.itemUom}>
                  <FormLabel>UOM</FormLabel>
                  <Select
                    id="itemUom"
                    placeholder="Select option"
                    {...register('itemUom', {
                      required: 'Please select Unit of measure option'
                    })}
                  >
                    <option value="pcs">pcs</option>
                    <option value="box">box</option>
                    <option value="pkt">pkt</option>
                  </Select>
                  <FormErrorMessage>
                    {errors.itemUom && errors.itemUom?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.unitPrice}>
                  <FormLabel>Unit Price</FormLabel>
                  <Input
                    id="unitPrice"
                    placeholder="Enter Price"
                    type="number"
                    {...register('unitPrice', {
                      required: 'Enter price of item in number'
                    })}
                  />
                  <FormErrorMessage>
                    {errors.unitPrice && errors.unitPrice?.message}
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
                form="addItemForm"
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

export default AddItemDialogue
