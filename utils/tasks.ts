import { CategoryState, TaskState } from './../store/category/categorySlice';
export const getTaskOrderedByDate = (tasks: TaskState[]) => {
  return tasks.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
};

export const getCompletedTasks = (tasks: TaskState[]) => {
  return tasks.filter((task) => task.completed);
}

export const getProgresssText = (tasks: TaskState[]) => {
  const completedTasks = getCompletedTasks(tasks);
  return `${completedTasks.length}/${tasks.length}`;
}

export const getProgressPercentage = (tasks: TaskState[]) => {
  const completedTasks = getCompletedTasks(tasks);
  if(tasks.length === 0) return 0
  const percentage = (completedTasks.length / tasks.length) * 100;
  return percentage.toFixed(0);
}

export const getTodayTasksByCategories = (categories: CategoryState[]) => {
  const today = new Date();
  const todayTasks = categories.map((category) => {
    const tasks = category.tasks.filter((task) => {
      const taskDate = new Date(task.date);
      return (
        taskDate.getDate() === today.getDate() &&
        taskDate.getMonth() === today.getMonth() &&
        taskDate.getFullYear() === today.getFullYear()
      );
    });
    return { ...category, tasks };
  });
  console.log('todayTasks', todayTasks);
  
  return todayTasks;
}

export const getOngoingTasksByCategories = (categories: CategoryState[]) => {
  const ongoingTasks = categories.map((category) => {
    const tasks = category.tasks.filter((task) => {
      return !task.completed
    });
    return { ...category, tasks };
  });
  console.log('ongoingTasks', ongoingTasks);
  return ongoingTasks;
}
export const getCompletedTasksByCategories = (categories: CategoryState[]) => {
  const ongoingTasks = categories.map((category) => {
    const tasks = category.tasks.filter((task) => {
      console.log('Completed TASK', task.date);
      return task.completed
    });
    console.log('Completed', tasks);
    return { ...category, tasks };
  });
  return ongoingTasks;
}