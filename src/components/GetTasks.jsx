
import supabase from '../supabase-client';

const GetTasks = () => {
    async function getTasks() {
        let { data: tasks, error } = await supabase
        .from('tasks')
        .select('*');

        if(error) console.log('error', error);
        return tasks;
    }
}

export default GetTasks
