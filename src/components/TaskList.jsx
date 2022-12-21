import { Button, HStack, Image, Input, StackDivider, Text, VStack, useToast, IconButton } from '@chakra-ui/react';
import { useEffect, useState } from 'react'
import DeleteTask from './DeleteTask';
import img from '../images/todolist.svg';
import supabase from '../supabase-client';
import { FiTrash2 } from 'react-icons/fi';

export default function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    async function getTasks() {
        let { data: tasks, error } = await supabase
        .from('tasks')
        .select('*');

        setTasks(tasks);

        if (error) console.log('error', error)
        else console.log('tasks', tasks)
    } 

    const handleDelete = async (id) => {
        setLoading(true)
        const { data, error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id)
        setLoading(false)
        getTasks();

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

    const handleInsert = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase
        .from('tasks')
        .insert([
        { task: text },
        ])
        if (error) console.log('error', error)
        setText('');
        getTasks();
    }


    useEffect(() => {
        getTasks();
    }, [])


    return (
    <>
        <HStack my="4" h="45">
            <Input h="100%" variant="filled" borderColor="gray.300" placeholder="Add a new task" value={text} onChange={(e) => setText(e.target.value)} />
            <Button colorScheme={"twitter"} px="10" h="100%" onClick={handleInsert}>Add</Button>
        </HStack>
        {!tasks || !tasks.length ? 
            <Image src={img} w="30%" maxW="95%" /> : 
            <VStack
                divider={<StackDivider />}
                borderColor="gray.300"
                borderWidth="2px"
                p="5"
                borderRadius="lg"
                width="100%"
                maxW={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '30vw' }}
                alignItems="stretch"
            >
                {tasks.map((task) => (
                    <HStack key={task.id}>
                        <Text w="100%" p="8px" borderRadius="lg">
                        {task.task}
                        </Text>
                        <IconButton isRound="true" icon={<FiTrash2 />} bgColor="gray.300" onClick={() => handleDelete(task.id)} isLoading={loading} />

                    </HStack>
                ))}
            
            </VStack>
    }

    </>
    
    );
    }


