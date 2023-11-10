import React, { useRef, useState } from 'react'
import {
  HStack,
  Input,
  InputField,
  Button,
  ButtonText,
  ButtonIcon,
  AddIcon,
} from '@gluestack-ui/themed'

interface Props {
  handleSubmit: (arg: string) => void
}

const InputContainer = ({ handleSubmit }: Props) => {
  const [value, setValue] = useState('')
  const ref = useRef(null)

  const onSubmit = () => {
    if (value !== '') {
      handleSubmit(value)
      setValue('')
      //@ts-ignore
      ref.current?.blur()
    }
  }

  return (
    <HStack w="$full" gap={'$3'}>
      <Input variant="outline" size="md" flex={1} borderColor="#a8a8a8">
        <InputField
          ref={ref}
          placeholder="Enter color name..."
          value={value}
          autoCapitalize="none"
          onChangeText={setValue}
        />
      </Input>
      <Button
        action="primary"
        variant="link"
        size="lg"
        style={{ gap: 5 }}
        isDisabled={false}
        onPress={onSubmit}
      >
        <ButtonText>Add</ButtonText>
        <ButtonIcon as={AddIcon} />
      </Button>
    </HStack>
  )
}

export default InputContainer
