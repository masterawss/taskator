import { Box, Button, Center, HStack, Image, Text } from "native-base"
import BouncyCheckbox from "react-native-bouncy-checkbox"
import { useDispatch } from "react-redux";
import { CategoryState, destroyTaskToCategory, TaskState, toogleTaskToCategory } from "../../store/category/categorySlice";
import img from '../../assets/img/files.png'
import {useMemo} from 'react'
import { fomartForHumans } from "../../utils/dateFormat";
import { getProgressPercentage, getProgresssText, getTaskOrderedByDate } from "../../utils/tasks";
import Ionicons from '@expo/vector-icons/Ionicons';

interface TasksSectionProps {
  category: CategoryState
}

const TasksSection = ({
  category
}: TasksSectionProps) => {

  const dispatch = useDispatch()

  const tasks_ordered = useMemo(() => {
    // Order by task.date
    return getTaskOrderedByDate(category.tasks)
  }, [category.tasks])

  const toogleTask = (isChecked: boolean, id: string) => {
    console.log(isChecked, id);

    dispatch(toogleTaskToCategory({
      taskId: id,
      completed: isChecked,
      categoryId: category.id
    }))
  }

  const percentage = useMemo(() => {
    return getProgressPercentage(category.tasks)
  }, [category.tasks])

  const progress_text = useMemo(() => {
    return getProgresssText(category.tasks)
  }, [category.tasks])

  const deleteTask = (taskId: string) => {
    dispatch(destroyTaskToCategory({
      categoryId: category.id,
      taskId
    }))
  }

  return <>
    <Box bg="white" p={4} mx={4} borderRadius={10} mt={6}>
      <HStack justifyContent="space-between" alignItems="center" mb={3} >
        <Text bold fontSize="xl" mb={5}>Tasks</Text>
        <Box>
          <Text fontSize="md">{progress_text} Completed</Text>
          <Text fontSize="lg" color="gray.500" bold textAlign="right">
            {percentage} %
          </Text>
        </Box>
      </HStack>
      {
        tasks_ordered.length > 0 
        ? tasks_ordered.map((task) => (<>
            <HStack justifyContent="space-between" key={task.id} mb={5}>
              <BouncyCheckbox
                size={25}
                isChecked={task.completed}
                fillColor={category.color}
                unfillColor="#FFFFFF"
                text={task.title+"\n"+fomartForHumans(task.date)}
                iconStyle={{ borderColor: "red" }}
                innerIconStyle={{ borderWidth: 2 }}
                onPress={(isChecked: boolean) => {toogleTask(isChecked, task.id)}}
              />
              <Button variant="ghost" onPress={() => deleteTask(task.id)}>
                <Ionicons name="trash" size={19} color="#7d7d7d" />
              </Button>
            </HStack>
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
  </>
}

export default TasksSection