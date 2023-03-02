import { Box, Button, HStack, Input, Pressable, ScrollView, Text } from "native-base"
import Header from "../../components/Header"
import Ionicons from '@expo/vector-icons/Ionicons';
import {useEffect, useMemo, useState} from 'react'
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { getCompletedTasksByCategories, getOngoingTasksByCategories } from "../../utils/tasks";
import { CategoryState } from "../../store/category/categorySlice";

const Index = ({navigation}) => {
  const [tab, setTab] = useState('all')
  const categories = useSelector((state: RootState) => state.category.list)

  const [search, setSearch] = useState('')
  const [tasksFiltered, setTasksFiltered] = useState<CategoryState[]>([])

  const tasks_grouped = useMemo(() => {
    switch (tab) {
      case 'ongoing':
        return getOngoingTasksByCategories(categories)
      case 'completed':
        return getCompletedTasksByCategories(categories)
      default:
        return categories
    }
  }, [categories, tab])

  useEffect(() => {
    if(search.length > 0) {
      let tasks_to_filter = [...tasks_grouped]
      const tasks = tasks_to_filter.map(cat => {
        let tasks = [...cat.tasks]
        tasks = tasks.filter(task => task.title.toLowerCase().includes(search.toLowerCase()))
        return {...cat, tasks}
      })
      setTasksFiltered(tasks)
    } else {
      setTasksFiltered(tasks_grouped)
    }
  }, [search, tasks_grouped])

  return (
    <Box safeArea>
      <Header
        color="#a6a6a6"
        mainActionPress={() => navigation.goBack()}
        title="Tasks"
      />
      
      <Input mx={4} mb={4} mt={2}
        shadow={2}
        placeholder="Search"
        variant="filled"
        value={search}
        onChangeText={setSearch}
        rightElement={ <>
          { search.length > 0 &&
            <Button variant="ghost" onPress={() => setSearch('')}>
              <Ionicons name="close" size={24} color="black" />
            </Button>
          }
        </>
        }
      />

      <HStack px={4} >
        <Button borderRightRadius={0} borderLeftRadius={10} onPress={() => setTab('all')} width="33%" 
          variant={tab === 'all' ? 'solid' : 'outline'}
        >
          All
        </Button>
        <Button borderRadius={0} onPress={() => setTab('ongoing')} width="33%" 
          variant={tab === 'ongoing' ? 'solid' : 'outline'}
        >
          Ongoing
        </Button>
        <Button borderLeftRadius={0} borderRightRadius={10} onPress={() => setTab('completed')} width="33%" 
          variant={tab === 'completed' ? 'solid' : 'outline'}
        >
          Completed
        </Button>
      </HStack>
      <ScrollView mx={4}>
        <Box mt={4}>
          { tasksFiltered.map((cat, index) => 
              cat.tasks.length > 0 && cat.tasks.map((task, index) => <>
              <Pressable onPress={() => navigation.navigate('category.show', {id: cat.id})}>
                <Box bg="white" borderRadius={10} mb={3} p={3}>
                  <HStack  justifyContent="space-between">
                    <HStack alignItems="center">
                      <Ionicons name={task.completed ? 'ellipse' : 'ellipse-outline'} size={24} color={cat.color} />
                      <Box ml={3}>
                        <Text strikeThrough={task.completed} bold>{task.title}</Text>
                        <Text color="gray.500">{cat.title}</Text>
                      </Box>
                    </HStack>
                  </HStack>
                </Box>
              </Pressable>
            </>)
          )}
        </Box>
      </ScrollView>
    </Box>
  )
}

export default Index