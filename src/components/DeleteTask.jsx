import { IconButton, useToast } from '@chakra-ui/react'
import React from 'react'
import { FiTrash2 } from 'react-icons/fi'
import supabase from '../supabase-client'

const DeleteTask = ({id}) => {
  const [loading, setLoading] = React.useState(false);
  const toast = useToast();


  const handleDelete = async () => {
    setLoading(true)
    const { data, error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id)
    setLoading(false)

    if(error) {
      toast({
        title: "An error occurred.",
        position: "top",
        description: "Unable to delete task.",
        status: "error",
        duration: 2000,
        isClosable: true,
      })
    }
    else {
      toast({
        title: "Task deleted",
        position: "top",
        description: "Your task has been deleted",
        status: "success",
        duration: 2000,
        isClosable: true,
      })
    }

  }

  return (
    <IconButton isRound="true" icon={<FiTrash2 />} bgColor="gray.300" onClick={handleDelete} isLoading={loading} />
  )
}

export default DeleteTask