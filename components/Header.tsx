import { Ionicons } from "@expo/vector-icons";
import { Box, HStack, Pressable, StatusBar, Text } from "native-base";

interface HeaderProps {
  mainActionPress: () => void
  title: string
  color?: string
  actions?: JSX.Element|JSX.Element[]
  mainIcon?: JSX.Element
}

const Header = (props: HeaderProps) => {

  const {
    mainActionPress,
    title,
    color = 'black',
    actions,
    mainIcon = <Ionicons color={color} name="arrow-back" size={30} />
  } = props

  return <>
    <StatusBar barStyle="light-content" />
    <HStack px="3" py="3"  justifyContent="space-between" alignItems="center" w="100%" >
      <Box>
        <HStack>
          <Pressable onPress={mainActionPress}>
            {mainIcon}
          </Pressable>
          <Text ml={3} fontSize="20" color={color}>
            {title}
          </Text>
        </HStack>
      </Box>
      {actions}
    </HStack>
  </>
}

export default Header