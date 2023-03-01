import { Button, Center, HStack, Image, Text } from "native-base"
import imgCheck from '../../assets/img/check.png'

interface SectionProps {
  isEdit: boolean
  goToHome: () => void
  goToCategory: () => void
}
const SuccessfullyStoredSection = ({
  goToHome, 
  goToCategory,
  isEdit
}: SectionProps) => {

  return <>
    <Center mt="-50px">
      <Image
        alt="image check"
        source={imgCheck}
        width={150}
        height={150}
      />
      <Text mt={10} fontSize="xl" fontWeight="bold">Category successfully {isEdit ? 'updated' : 'stored'}</Text>
      <Text my={5} fontSize="md" color="gray.500">You can now add tasks to this category</Text>
      <HStack justifyContent="space-between" space={4}>
        <Button variant="outline" 
          onPress={goToHome}
        >
          Go to home
        </Button>
        <Button variant="solid"
          onPress={goToCategory}
        >
          Go to category
        </Button>
      </HStack>
    </Center>
  </>
}

export default SuccessfullyStoredSection