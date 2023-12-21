import { useGroupServiceApi } from '@/tools/api/server/hook/groupserviceapihook'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  ButtonGroup,
  Input,
  FormControl
} from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'

interface ICreationGroupDialogProps {
  open: boolean
  handleCancel: () => void
  handleCreate: () => void
}

interface IFormGroupCreation {
  groupName: string
}

export const CreationGroupDialog = (props: ICreationGroupDialogProps) => {
  const { createGroup } = useGroupServiceApi()

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      groupName: ''
    }
  })

  const onSubmit: SubmitHandler<IFormGroupCreation> = async data => {
    await createGroup({ groupName: data.groupName })
    props.handleCreate()
    reset()
  }

  return (
    <Modal isOpen={props.open} onClose={props.handleCancel}>
      <ModalOverlay />
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalContent>
          <ModalHeader>Create group</ModalHeader>
          <FormControl>
            <Input
              id="groupName"
              placeholder="groupName"
              {...register('groupName', {
                required: 'This is required',
                minLength: { value: 4, message: 'Minimum length should be 4' }
              })}
              pl={"16px"}
              ml={"24px"}
              width={"100%"}
            />
          </FormControl>

          <ModalBody>Enter a groupe name to create a group</ModalBody>
          <ModalFooter>
            <ButtonGroup variant="outline" spacing="2">
              <Button colorScheme="blue" onClick={props.handleCancel}>
                Cancel
              </Button>
              <Button colorScheme="green" type="submit">
                Validate
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  )
}
