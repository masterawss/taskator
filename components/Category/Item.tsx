import { Box, HStack, Image, Pressable, Text } from "native-base"
import { CategoryState } from "../../store/category/categorySlice"
import {useMemo} from 'react'
import { getImagesByColor } from "../../utils/images"

interface ItemProps {
  category: CategoryState,
  navigation: any
}

const Item = ({category, navigation}: ItemProps) => {

  const completed_tasks = useMemo(() => {
    return category.tasks.filter((task) => task.completed).length
  }, [category.tasks])

  const percentage = useMemo(() => {
    if(category.tasks.length === 0) return 0
    return Number((completed_tasks / category.tasks.length) * 100).toFixed(0)
  }, [completed_tasks, category.tasks.length])

  const img = getImagesByColor(category.color)
  
  return <>
    <Pressable onPress={() => navigation.navigate('category.show',{id: category.id})}>
      <Box bg={category.color} borderRadius={10} p={4} pt="40px">
        <HStack justifyContent="space-between">
          <Box>
            <Text color="white" >{completed_tasks}/{category.tasks.length} tasks • {percentage} %</Text>
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