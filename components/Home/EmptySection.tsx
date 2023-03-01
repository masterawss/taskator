import { Center, Image, Text } from "native-base"
import imgEmpty from '../../assets/img/empty.png'

const EmptySection = () => {
  return <Center mt={20}>
    <Image
      alt="It looks empty"
      width={230}
      height={230}
      source={imgEmpty}
    />
    <Text bold>It looks empty</Text>
    <Text color="gray.500">Add a project</Text>
  </Center>
}

export default EmptySection