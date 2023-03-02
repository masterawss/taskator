import { createSlice } from '@reduxjs/toolkit'
import { ProveedorState } from '../Proveedor/proveedorSlice'

export interface TaskState {
  id: string,
  title: string,
  completed: boolean,
  // date: string,
}

export interface CategoryState {
  id: string,
  title: string,
  description: string|null,
  color: string,
  tasks: TaskState[],
}

export interface ListState {
  list: CategoryState[]
}

const initialState: ListState = {
  list: []
}

export const counterSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    storeCategory: (state, action) => {
      state.list.push(action.payload as never)
    },
    destroyCategory: (state, action) => {
      state.list = state.list.filter(category => category.id !== action.payload.id)
    },
    refreshCategories: (state, action) => {
      state.list = []
    },
    updateCategory: (state, action) => {
      const category = state.list.find(category => category.id === action.payload.id)
      if (category) {
        category.title = action.payload.title
        category.description = action.payload.description
        category.color = action.payload.color
      }
    },
    addTaskToCategory: (state, action) => {
      const category = state.list.find(category => category.id === action.payload.categoryId)
      if (category) {
        category.tasks.push(action.payload.task)
      }
    },
    toogleTaskToCategory: (state, action) => {
      const category = state.list.find(category => category.id === action.payload.categoryId)
      if (category) {
        const task = category.tasks.find(task => task.id === action.payload.taskId)
        if (task) {
          console.log('TASK', task.completed);

          task.completed = action.payload.completed
        }
      }
    },
    destroyTaskToCategory: (state, action) => {
      const category = state.list.find(category => category.id === action.payload.categoryId)
      if (category) {
        category.tasks = category.tasks.filter(task => task.id !== action.payload.taskId)
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  storeCategory,
  destroyCategory,
  updateCategory,
  addTaskToCategory,
  destroyTaskToCategory,
  toogleTaskToCategory,
  refreshCategories
} = counterSlice.actions

export default counterSlice.reducer