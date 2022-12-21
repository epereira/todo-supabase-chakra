import { Heading, VStack } from "@chakra-ui/react";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";

function App() {
  return (

      <VStack p={4} minH="100vh" bg="gray.100">
        <Heading 
          mt="20"
          p="5"
          fontWeight="extrabold"
          size="2xl"
          bgGradient="linear(to-l, #7928CA,#FF0080)"
          bgClip="text"
          >TODO LIST
        </Heading>
        <TaskList />
      </VStack>
  );
}

export default App;
