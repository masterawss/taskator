import { Box, Center, Fab, HStack, Image, ScrollView, Text } from "native-base"
import Ionicons from '@expo/vector-icons/Ionicons';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import Item from "../components/Category/Item";
import { useEffect } from "react";
import { destroyCategory, refreshCategories } from "../store/category/categorySlice";
import imgUser from '../assets/img/user.png'
import Header from "../components/Header";
import CategoriesSection from "../components/Home/CategoriesSection";
import EmptySection from "../components/Home/EmptySection";
import TasksSection from "../components/Home/TasksSection";

const Home = ({navigation}) => {
  const categories = useSelector((state: RootState) => state.category.list)

  return <>
    <Box safeArea bg="red">
      <Header
        mainActionPress={() => {}}
        mainIcon={<Image borderRadius={100} source={imgUser} alt="User" width={30} height={30} />}
        title="Hi, random user !"
      />
      {
        categories.length === 0
        ? <EmptySection/>
        : <ScrollView>
          <CategoriesSection 
            navigation={navigation} 
            categories={categories} 
          />
          <TasksSection/>
        </ScrollView>
      }
        
    </Box>
    <Fab renderInPortal={false} shadow={2} placement="bottom-right" size="sm" bgColor="amber.500"
      icon={
        <Ionicons name="add" size={32} color="white" />}
      onPress={() => navigation.navigate('category.create')}
    />
  </>
}

export default Home