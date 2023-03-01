import imgHappy from "../../assets/img/happy.png"
import { Box, Button, Center, HStack, Image, Pressable, Text } from "native-base"
import { getTodayTasksByCategories } from "../../utils/tasks"
import { useSelector } from "react-redux"
import { RootState } from "../../store"
import {useMemo} from "react"
import Ionicons from '@expo/vector-icons/Ionicons';

const TasksSection = ({navigation}) => {
  const categories = useSelector((state: RootState) => state.category.list)

  const todayTasks = useMemo(() => {
    return getTodayTasksByCategories(categories)
  }, [categories])

  const hasTasks = useMemo(() => {
    return todayTasks.filter(cat => cat.tasks.length > 0).length > 0
  }, [todayTasks])

  return <>
    <Box  p={4} borderBottomRadius={12} mb={2}>
      <HStack justifyContent="space-between" 
        alignContent="center"
      >
        <Text bold fontSize="2xl" mb={6}>Daily task</Text>
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
              You have no tasks for today
            </Text>
            <Text bold color="gray.500" mb={10}>
              Enjoy your day !
            </Text>
          </Center>
          : <>
            {todayTasks.map((cat, index) => {
              return <Box key={cat.id}>
                {
                  cat.tasks.length && cat.tasks.map((task, index) => <>
                    <Pressable key={cat.id+"a"+task.id} onPress={() => navigation.navigate('category.show', {id: cat.id})}>
                      <HStack alignItems="center" mb={5}>
                        <Ionicons name="ellipse" size={24} color={cat.color} />
                        <Box ml={3}>
                          <Text strikeThrough={task.completed} bold>{task.title}</Text>
                          <Text color="gray.500">{cat.title}</Text>
                        </Box>
                      </HStack>
                    </Pressable>
                  </>)
                }
              </Box>
            })}
          </>
        }
      </Box>
    </Box>
  </>
}

export default TasksSection