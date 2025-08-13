import type { UserType, TaskType } from '../Utils/Types'

export const fetchUser = async (id: string): Promise<UserType> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`
    )
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return response.json()
  } catch (err) {
    throw err
  }
}

export const fetchAllUsers = async (): Promise<UserType[]> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return response.json()
  } catch (err) {
    throw err
  }
}

export const fetchUserTasks = async (userId: string): Promise<TaskType[]> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos?userId=${userId}`
    )
    if (!response.ok) {
      throw new Error('Failed to fetch user tasks')
    }
    return response.json()
  } catch (err) {
    throw err
  }
}
