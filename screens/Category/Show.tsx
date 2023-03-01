import { Box, Button, Center, Fab, HStack, Image, Input, Modal, Text, useToast } from "native-base"
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import { RootState } from "../../store";
import { addTaskToCategory, CategoryState, destroyCategory, toogleTaskToCategory } from "../../store/category/categorySlice";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState,useMemo } from "react";
import { Controller } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import uuid from "react-uuid";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Item from "../../components/Category/Item";
import TasksSection from "../../components/Category/TasksSection";
import ModalCreate from "../../components/Category/ModalCreate";

const Show = ({navigation, route}) => {
  const { id } = route.params;
  const dispatch = useDispatch()
  const toast = useToast()

  const [showModal, setShowModal] = useState(false);
  
  const category = useSelector((state: RootState) => state.category.list.find((item: any) => item.id === id)) as CategoryState


  const destroy = () => {
    dispatch(destroyCategory({id: category.id}))
    toast.show({
      description: "Category deleted",
    })
    navigation.navigate('home')
  }

  return <>
    <Box safeArea>
      <Header
        color="#7d7d7d"
        mainActionPress={() => navigation.goBack()}
        title={category.title}
        actions={<HStack space={4}>
          <Button variant="ghost" onPress={() => navigation.navigate('category.create', {id: category.id})}>
            <Ionicons name="pencil" color="#7d7d7d" size={20} />
          </Button>
          <Button variant="ghost" onPress={destroy}>
            <Ionicons name="trash" color="#7d7d7d" size={20} />
          </Button>
        </HStack>}
      />
      <Box mx={4}>
        <Item navigation={navigation} category={category} />
      </Box>

      <TasksSection category={category} />

    </Box>
    <Fab renderInPortal={false} shadow={2} placement="bottom-right" size="sm" bgColor={category.color}
      icon={<Ionicons name="add" size={32} color="white" />}
      onPress={() => setShowModal(true)}
    />

    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <Modal.Content maxWidth="400px">
        <Modal.Body>
          <ModalCreate
            dispatch={dispatch}
            category={category}
            toogleModal={(val) => setShowModal(val)}
          />
        </Modal.Body>
      </Modal.Content>
    </Modal>
  </>
}

export default Show