import Header from '../../components/Header'
import {Box, Button, Center, HStack, Image, Input, ScrollView, Text, VStack} from 'native-base'
import { colors } from '../../utils/colors'
import SelectColorItem from '../../components/Category/SelectColorItem'
import { useMemo, useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import uuid from "react-uuid";
import { Controller } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { CategoryState, storeCategory, updateCategory } from '../../store/category/categorySlice'
import Ionicons from '@expo/vector-icons/Ionicons';
import SuccessfullyStoredSection from '../../components/Category/SuccessfullyStoredSection'
import imgDocCheck from '../../assets/img/check-doc.png'
import { getImagesByColor } from '../../utils/images'
import { RootState } from '../../store'

interface FormProps {
  title: string,
  description: string|null
}


const Create = ({navigation, route}) => {

  const categoryId = route.params?.id
  const category = useSelector((state:RootState) => state.category.list.find((category:CategoryState) => category.id === categoryId))
  const [id, setId] = useState(uuid())
  useEffect(() => {
    if (categoryId) {
      setValue('title', category?.title || '' )
      setValue('description', category?.description || '' )
      setColorSelected(category?.color || colors[0])
    }
  }, [])

  const dispatch = useDispatch()
  const { control, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      title: '',
      description: ''
    }
  });
  const [successfullyStored, setSuccessfullyStored] = useState(false)

  const [colorSelected, setColorSelected] = useState(colors[0])

  const setColor = (color:any):void => {
    setColorSelected(color)
  }

  const createCategory = (data:FormProps) => {
    if(categoryId) {
      dispatch(updateCategory({
        ...data,
        id: categoryId,
        color: colorSelected,
      }))
    }else{
      dispatch(storeCategory({
        ...data,
        id,
        color: colorSelected,
        tasks: []
      }))
    }
    setSuccessfullyStored(true)
  }

  const img = useMemo(() => {
    let imageColor = getImagesByColor(colorSelected) || imgDocCheck
    return imageColor
  }, [colorSelected])
  

  return <>
    <Box safeArea bg={colorSelected} minHeight="full">
      <Header
        mainActionPress={() => navigation.goBack()}
        title={`${categoryId ? 'Edit' : 'Create'} category`}
        color='white'
      />
      <ScrollView>
        <Box bg="white" p={4} mx={4} borderRadius={10} mt="80px">
          {
            successfullyStored
            ? <SuccessfullyStoredSection
                isEdit={!!categoryId}
                goToCategory={() => {
                  const idRoute = categoryId || id
                  navigation.replace('category.show', {id: idRoute})
                }}
                goToHome={() => navigation.replace('home')}
              />
            : (
              <>
                <Center mt="-80px" mb={8}>
                  <Image
                    key={img}
                    alt="image check"
                    source={img}
                    width={150}
                    height={150}
                  />
                </Center>
                <HStack mb={3} justifyContent="space-between">
                  {
                    colors && colors.map((color, index) => (
                      <SelectColorItem key={color} color={color} selected={colorSelected === color} onPress={setColor} />
                    ))
                  }
                </HStack>

                <Controller
                  name="title"
                  control={control}
                  rules={{
                  required: {
                    value: true,
                    message: 'This is required.'
                  }
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Box>
                      <Text mb={1} mt={2}>Title</Text>
                      <Input mb={3} variant="filled" placeholder="Your awesome title"
                        value={String(value)} onBlur={onBlur} onChangeText={onChange}
                      />
                      {
                        !!errors.title && (
                          <Box>
                            <Ionicons color="red" name="information-circle" size={18} /> <Text color="red">{errors.title?.message}</Text>
                          </Box>
                        )
                      }
                    </Box>
                  )}
                />
                <Controller
                  name="description"
                  control={control}
                  rules={{
                    required: false
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Box>
                      <Text mb={1} mt={2}>Description</Text>
                      <Input mb={3} variant="filled" placeholder="Your awesome description"
                        value={String(value)} onBlur={onBlur} onChangeText={onChange}
                      />
                      {
                        !!errors.description && (
                          <Box>
                            <Ionicons color="red" name="information-circle" size={18} /> <Text color="red">{errors.description?.message}</Text>
                          </Box>
                        )
                      }
                    </Box>
                  )}
                />

                <Button onPress={handleSubmit(createCategory)}>
                  {`${categoryId ? 'Edit' : 'Create'} category`}
                </Button>
              </>
            )
          }
        </Box>
      </ScrollView>
    </Box>
  </>
}

export default Create