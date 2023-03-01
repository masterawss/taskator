import { Box, Center, Fab, HStack, Image, ScrollView, Text } from "native-base"
import Ionicons from '@expo/vector-icons/Ionicons';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import Item from "../components/Category/Item";
import { useEffect } from "react";
import { destroyCategory, refreshCategories } from "../store/category/categorySlice";
import imgEmpty from '../assets/img/empty.png'
import imgUser from '../assets/img/user.png'
import Header from "../components/Header";

const Home = ({navigation}) => {
  const categories = useSelector((state: RootState) => state.category.list)

  return <>
    <Box safeArea bg="red">

      <Header
        mainActionPress={() => {}}
        mainIcon={<Image borderRadius={100} source={imgUser} alt="User" width={30} height={30} />}
        title="Hi, random user !"
      />
      <Box  p={4} borderBottomRadius={12} mb={2}>
        <Text bold fontSize="2xl">Your projects</Text>
      </Box>
      <ScrollView>
        {
          categories.length > 0 
          ? <ScrollView horizontal={true} pb={2}>
            <HStack pl={4}>
              {categories.map((category) => (
                <Box key={category.id} mr={2} width="250px">
                  <Item navigation={navigation} category={category} />
                </Box>
              ))}
            </HStack>
          </ScrollView>
          : <>
          <Center mt={20}>
            <Image
              alt="It looks empty"
              width={230}
              height={230}
              source={imgEmpty}
            />
            <Text bold>It looks empty</Text>
            <Text color="gray.500">Add a project</Text>
          </Center>
        </>
        }
        <Box  p={4} borderBottomRadius={12} mb={2}>
          <Text bold fontSize="2xl">Daily task</Text>
        </Box>
      </ScrollView>
    </Box>
    <Fab renderInPortal={false} shadow={2} placement="bottom-right" size="sm" bgColor="amber.500"
      icon={
        <Ionicons name="add" size={32} color="white" />}
      onPress={() => navigation.navigate('category.create')}
    />
  </>
}

export default Home