import { Box, Button, HStack, Input, Modal, Text } from "native-base";
import { Controller, useForm } from "react-hook-form";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useDispatch } from "react-redux";
import { addTaskToCategory, CategoryState } from "../../store/category/categorySlice";
import {useState} from 'react'
import uuid from "react-uuid";

interface FormProps {
  title: string|null
}

interface ModalCreateProps {
  category: CategoryState
  toogleModal: (val:boolean) => void,
  dispatch: any
}

const ModalCreate = ({
  category,
  toogleModal,
  dispatch
}: ModalCreateProps) => {

  // const dispatch = useDispatch()
  const { control, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      title: '',
    }
  });

  const [id] = useState(uuid())

  const createTask = (data: FormProps) => {
    dispatch(addTaskToCategory({
      task: {
        ...data,
        id
      },
      categoryId: category.id
    }))
    toogleModal(false)
    setValue('title', '')
  }

  return <>
    <HStack mb={4} justifyContent="space-between">
      <Text bold>Create task</Text>
    </HStack>
    <Controller
      name="title"
      control={control}
      rules={{
      required: {
        value: true,
        message: 'This is required.'
      }
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <Box>
          <Text mb={1} mt={2}>Task description</Text>
          <Input mb={3} variant="filled" placeholder="Description ..."
            value={String(value)} onBlur={onBlur} onChangeText={onChange}
          />
          {
            !!errors.title && (
              <Box>
                <Ionicons color="red" name="information-circle" size={18} /> <Text color="red">{errors.title?.message}</Text>
              </Box>
            )
          }
        </Box>
      )}
    />
    <HStack justifyContent="space-between" mt={4}>
      <Button variant="ghost" colorScheme="blueGray" onPress={() => {
        toogleModal(false);
      }}>
        Cancel
      </Button>
      <Button onPress={handleSubmit(createTask)}>
        Save
      </Button>
    </HStack>
  </>
}

export default ModalCreate