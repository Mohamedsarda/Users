'use client'
import { useQuery } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { UserCard } from '../Components/UserCard'
import { TaskCard } from './Components/TaskCard'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Filter, Search, ListTodo } from 'lucide-react'
import { fetchUser, fetchUserTasks } from '@/app/api/users'
import { TaskType } from '@/app/Utils/Types'
import ErrorCard from '../Components/Error'
import PageHeader from './Components/PageHeader'

const Page = () => {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<
    'all' | 'completed' | 'pending'
  >('all')

  const {
    data: user,
    error: userError,
    isPending: isUserPending,
  } = useQuery({
    queryKey: ['user', params.id],
    queryFn: () => fetchUser(params.id),
  })

  const {
    data: tasks,
    error: tasksError,
    isPending: isTasksPending,
  } = useQuery({
    queryKey: ['userTasks', params.id],
    queryFn: () => fetchUserTasks(params.id),
  })

  const filteredTasks = tasks?.filter((task: TaskType) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const matchesFilter =
      filterStatus === 'all' ||
      (filterStatus === 'completed' && task.completed) ||
      (filterStatus === 'pending' && !task.completed)

    return matchesSearch && matchesFilter
  })

  const completedCount = tasks?.filter((task) => task.completed).length || 0
  const totalCount = tasks?.length || 0

  if (userError || tasksError) router.push('/')
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1C1B] to-[#222]">
      {/* Header */}
      <PageHeader
        user={user}
        isUserPending={isUserPending}
        onBack={() => router.back()}
        totalCount={totalCount}
        completedCount={completedCount}
        isTasksPending={isTasksPending}
        tasks={tasks}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
        {/* User Info Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-48">
            {isUserPending ? (
              <Skeleton
                height={400}
                baseColor="#333"
                highlightColor="#444"
                borderRadius="0.75rem"
              />
            ) : userError ? (
              <ErrorCard errorMessage={userError.message} />
            ) : user ? (
              <UserCard user={user} />
            ) : null}
          </div>
        </div>

        {/* Tasks Section */}
        <div className="lg:col-span-2">
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <ListTodo size={20} className="text-[#95ff77]" />
                Tasks
              </h2>
            </div>

            {/* Search and Filter */}
            <div className="flex  gap-4">
              <div className="relative flex-1">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-[#333] border border-[#444] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#95ff77] focus:ring-2 focus:ring-[#95ff77]/20 transition-all text-sm"
                />
              </div>

              <div className="relative">
                <Filter
                  size={16}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <select
                  value={filterStatus}
                  onChange={(e) =>
                    setFilterStatus(
                      e.target.value as 'all' | 'completed' | 'pending'
                    )
                  }
                  className="pl-9 pr-8 py-2 bg-[#333] border border-[#444] rounded-lg text-white focus:outline-none focus:border-[#95ff77] focus:ring-2 focus:ring-[#95ff77]/20 transition-all text-sm appearance-none cursor-pointer"
                >
                  <option value="all">All Tasks</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>
          </div>

          {/* Tasks List */}
          {isTasksPending ? (
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <Skeleton
                  key={i}
                  height={80}
                  baseColor="#333"
                  highlightColor="#444"
                  borderRadius="0.5rem"
                />
              ))}
            </div>
          ) : tasksError ? (
            <ErrorCard errorMessage={tasksError.message} />
          ) : filteredTasks && filteredTasks.length > 0 ? (
            <div className="space-y-3">
              {filteredTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-gray-500/10 border border-gray-500/20 rounded-xl p-8">
                <ListTodo size={48} className="text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400 font-medium">No tasks found</p>
                <p className="text-gray-500 text-sm mt-2">
                  {searchTerm || filterStatus !== 'all'
                    ? 'Try adjusting your search or filter'
                    : 'This user has no tasks assigned'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Page
