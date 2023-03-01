import { Box, Center, Image, Text } from "native-base"
import BouncyCheckbox from "react-native-bouncy-checkbox"
import { useDispatch } from "react-redux";
import { CategoryState, TaskState, toogleTaskToCategory } from "../../store/category/categorySlice";
import img from '../../assets/img/files.png'
import {useMemo} from 'react'

interface TasksSectionProps {
  category: CategoryState
}

const TasksSection = ({
  category
}: TasksSectionProps) => {

  const dispatch = useDispatch()

  const tasks = useMemo(() => {
    // Order by task.date
    return category.tasks
  }, [category.tasks])

  const toogleTask = (isChecked: boolean, id: string) => {
    console.log(isChecked, id);

    dispatch(toogleTaskToCategory({
      taskId: id,
      completed: isChecked,
      categoryId: category.id
    }))
  }

  return <>
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
                text={task.title+"\n"+new Date(task.date).toLocaleDateString()}
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
  </>
}

export default TasksSection