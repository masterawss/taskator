import imgHappy from "../../assets/img/happy.png"
import { Box, Button, Center, HStack, Image, Pressable, Text } from "native-base"
import { getOngoingTasksByCategories, getTodayTasksByCategories } from "../../utils/tasks"
import { useSelector } from "react-redux"
import { RootState } from "../../store"
import {useMemo} from "react"
import Ionicons from '@expo/vector-icons/Ionicons';

const TasksSection = ({navigation}) => {
  const categories = useSelector((state: RootState) => state.category.list)

  const ongoingTasks = useMemo(() => {
    return getOngoingTasksByCategories(categories)
  }, [categories])

  const hasTasks = useMemo(() => {
    return ongoingTasks.filter(cat => cat.tasks.length > 0).length > 0
  }, [ongoingTasks])

  return <>
    <Box  p={4} borderBottomRadius={12} mb={2}>
      <HStack justifyContent="space-between" 
        alignContent="center"
      >
        <Text bold fontSize="2xl" mb={6}>Ongoing task</Text>
        <Button mb={6} variant="ghost" onPress={() => navigation.navigate('task.index')}>
          View all
        </Button>
      </HStack>
      <Box bg="white" p={4} borderRadius={10}>
        {
          !hasTasks ?
          <Center>
            <Image
              source={imgHappy}
              width={130}
              height={130}
              alt="Happy"
            />
            <Text fontSize="lg" bold my={4}>
              You have no tasks
            </Text>
            <Text bold color="gray.500" mb={10}>
              Enjoy your day !
            </Text>
          </Center>
          : <>
            { 
              ongoingTasks.length > 0 && ongoingTasks.map((cat, index) => 
                cat.tasks.length > 0 && cat.tasks.map((task, i) => 
                  <Pressable key={task.id} onPress={() => navigation.navigate('category.show', {id: cat.id})}>
                    <HStack alignItems="center" mb={5}>
                      <Ionicons name={task.completed ? 'ellipse' : 'ellipse-outline'} size={24} color={cat.color} />
                      <Box ml={3}>
                        <Text strikeThrough={task.completed} bold>{task.title}</Text>
                        <Text color="gray.500">{cat.title}</Text>
                      </Box>
                    </HStack>
                  </Pressable>
                )
              )
            }
          </>
        }
      </Box>
    </Box>
  </>
}

export default TasksSection