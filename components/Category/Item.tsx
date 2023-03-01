import { Box, HStack, Image, Pressable, Text } from "native-base"
import { CategoryState } from "../../store/category/categorySlice"
import {useMemo} from 'react'
import { getImagesByColor } from "../../utils/images"
import { getCompletedTasks, getProgressPercentage, getProgresssText } from "../../utils/tasks"

interface ItemProps {
  category: CategoryState,
  navigation: any
}

const Item = ({category, navigation}: ItemProps) => {

  // const completed_tasks = useMemo(() => {
  //   return getCompletedTasks(category.tasks)
  // }, [category.tasks])

  const percentage = useMemo(() => {
    return getProgressPercentage(category.tasks)
  }, [category.tasks])

  const progress_text = useMemo(() => {
    return getProgresssText(category.tasks)
  }, [category.tasks])

  const img = getImagesByColor(category.color)
  
  return <>
    <Pressable onPress={() => navigation.navigate('category.show',{id: category.id})}>
      <Box bg={category.color} borderRadius={10} p={4} pt="40px">
        <HStack justifyContent="space-between">
          <Box>
            <Text color="white" >{progress_text} tasks • {percentage} %</Text>
            <Text color="white" mt={3} bold fontSize="lg">{category.title}</Text>
            <Text color="white" bold fontSize="sm">{category.description}</Text>
          </Box>
          <Image
            source={img}
            width={100}
            height={100}
            alt="Category image"
          />
        </HStack>
      </Box>
    </Pressable>
  </>
}

export default Item