import { Box, Center, HStack, Image, ScrollView, Text } from "native-base"
import { useSelector } from "react-redux"
import { CategoryState } from "../../store/category/categorySlice"
import Item from "../Category/Item"

interface CategoriesSectionProps {
  navigation: any
  categories: CategoryState[]
}

const CategoriesSection = ({navigation, categories}: CategoriesSectionProps) => {
  return <>
    <Box  p={4} borderBottomRadius={12} mb={2}>
      <Text bold fontSize="2xl">Your projects</Text>
    </Box>
    <ScrollView horizontal={true} pb={2}>
      <HStack pl={4}>
        {categories.map((category, i) => (
          <Box key={category.id} mr={2} width="250px">
            <Item navigation={navigation} category={category} />
          </Box>
        ))}
      </HStack>
    </ScrollView>
  </>
}

export default CategoriesSection