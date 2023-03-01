import { Box, Pressable } from "native-base";

interface SelectColorItemProps {
  color: string
  selected: boolean
  onPress: (color: string) => void
}

const SelectColorItem = ({color, selected, onPress}: SelectColorItemProps) => {
  return (
    <Pressable onPress={() => onPress(color)}>
      <Box
        bg={color}
        w={10}
        borderWidth={selected ? 2 : 0}
        h={10}
        borderRadius={5}
        mr={2}
        mb={2}
        _text={{color: 'white', fontSize: 'sm', fontWeight: 'bold'}}
      />
    </Pressable>
  );
};

export default SelectColorItem;