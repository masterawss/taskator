import { Box, Button, Center, Fab, HStack, Image, Input, Modal, Text, useToast } from "native-base"
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import { RootState } from "../../store";
import { addTaskToCategory, CategoryState, destroyCategory, toogleTaskToCategory } from "../../store/category/categorySlice";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState,useMemo } from "react";
import { Controller } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import uuid from "react-uuid";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Item from "../../components/Category/Item";
import img from '../../assets/img/files.png'

interface FormProps {
  title: string|null
}

const Show = ({navigation, route}) => {
  const { id } = route.params;
  const dispatch = useDispatch()
  const toast = useToast()
  const { control, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      title: '',
    }
  });
  const category = useSelector((state: RootState) => state.category.list.find((item: any) => item.id === id)) as CategoryState
  const [showModal, setShowModal] = useState(false);


  const tasks = useMemo(() => {
    return category.tasks
  }, [category.tasks])

  const createTask = (data: FormProps) => {
    dispatch(addTaskToCategory({
      task: {
        ...data,
        id: uuid(),
      },
      categoryId: category.id
    }))
    setShowModal(false)
    setValue('title', '')
  }

  const toogleTask = (isChecked: boolean, id: string) => {
    console.log(isChecked, id);
    
    dispatch(toogleTaskToCategory({
      taskId: id,
      completed: isChecked,
      categoryId: category.id
    }))
  }

  const destroy = () => {
    dispatch(destroyCategory({id: category.id}))
    toast.show({
      description: "Category deleted",
    })
    navigation.navigate('home')
  }

  return <>
    <Box safeArea>
      <Header
        mainActionPress={() => navigation.goBack()}
        title={category.title}
        actions={<Button variant="ghost" onPress={destroy}>
          <Ionicons name="trash" size={20} />
        </Button>}
      />

      <Item navigation={navigation} category={category} />

      <Box bg="white" p={4} mx={4} borderRadius={10} mt={6}>
        {
          tasks.length > 0 
          ? tasks.map((task) => (<>
              <Box key={task.id} mb={3}>
                <BouncyCheckbox
                  size={25}
                  isChecked={task.completed}
                  fillColor={category.color}
                  unfillColor="#FFFFFF"
                  text={task.title}
                  iconStyle={{ borderColor: "red" }}
                  innerIconStyle={{ borderWidth: 2 }}
                  onPress={(isChecked: boolean) => {toogleTask(isChecked, task.id)}}
                />
              </Box>
            </>))
          : <>
            <Center>
              <Image
                alt="It looks empty"
                width={130}
                height={130}
                source={img}
              />
              <Text bold>It looks empty</Text>
              <Text color="gray.500">Add some task</Text>
            </Center>
          </>
        }
      </Box>
        
    </Box>
    <Fab renderInPortal={false} shadow={2} placement="bottom-right" size="sm" bgColor={category.color}
      icon={
        <Ionicons name="add" size={32} color="white" />}
      onPress={() => setShowModal(true)}
    />

    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <Modal.Content maxWidth="400px">
        <Modal.Body>
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
              setShowModal(false);
            }}>
              Cancel
            </Button>
            <Button onPress={handleSubmit(createTask)}>
              Save
            </Button>
          </HStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  </>
}

export default Show