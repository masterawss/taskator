import { Box, Button, HStack, Pressable, ScrollView, Text } from "native-base"
import Header from "../../components/Header"
import Ionicons from '@expo/vector-icons/Ionicons';
import {useMemo, useState} from 'react'
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { getCompletedTasksByCategories, getOngoingTasksByCategories } from "../../utils/tasks";

const Index = ({navigation}) => {
  const [tab, setTab] = useState('all')
  const categories = useSelector((state: RootState) => state.category.list)

  const tasks_grouped = useMemo(() => {
    console.log('CATEGORIES', categories[1].tasks);
    
    switch (tab) {
      case 'ongoing':
        return getOngoingTasksByCategories(categories)
      case 'completed':
        return getCompletedTasksByCategories(categories)
      default:
        return categories
    }
  }, [categories, tab])

  return (
    <Box safeArea>
      <Header
        color="#a6a6a6"
        mainActionPress={() => navigation.goBack()}
        title="Tasks"
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
          {
          tasks_grouped.map((cat, index) => {
            return <>
              {
                cat.tasks.map((task, index) => <>
                  <Pressable onPress={() => navigation.navigate('category.show', {id: cat.id})}>
                    <Box bg="white" borderRadius={10} mb={3} p={3}>
                      <HStack  justifyContent="space-between">
                        <HStack alignItems="center">
                          <Ionicons name="ellipse" size={24} color={cat.color} />
                          <Box ml={3}>
                            <Text strikeThrough={task.completed} bold>{task.title}</Text>
                            <Text color="gray.500">{cat.title}</Text>
                          </Box>
                        </HStack>
                        <Text>
                          {JSON.stringify(task.date)}
                        </Text>
                      </HStack>
                    </Box>
                  </Pressable>
                </>)
              }
            </>
          })
          }
        </Box>
      </ScrollView>
    </Box>
  )
}

export default Index