import { Button, HStack, Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import supabase from '../supabase-client';

const AddTask = () => {
  const [text, setText] = useState('');
  const handleInsert = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
    .from('tasks')
    .insert([
      { task: text },
    ])
    if (error) console.log('error', error)
    setText('');
  }

  return (
    <form>
        <HStack my="4" h="45">
            <Input h="100%" variant="filled" borderColor="gray.300" placeholder="Add a new task" value={text} onChange={(e) => setText(e.target.value)} />
            <Button colorScheme={"twitter"} px="10" h="100%" onClick={handleInsert}>Add</Button>
        </HStack>
    </form>
  )
}

export default AddTask
