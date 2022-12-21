import { Button, Flex } from '@chakra-ui/react'
import React from 'react'

const ClearTasks = () => {
  return (
    <Flex>
        <Button colorScheme={"gray"} px="8" h="45" color="gray.500" mt="10">Clear Tasks</Button>
    </Flex>
  )
}

export default ClearTasks