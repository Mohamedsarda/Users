import { TaskType } from '@/app/Utils/Types'
import { CheckCircle, Clock, ListTodo } from 'lucide-react'

const TaskStats = ({
  totalCount,
  completedCount,
  isTasksPending,
  tasks,
}: {
  totalCount: number
  completedCount: number
  isTasksPending: boolean
  tasks: TaskType[] | undefined
}) => {
  if (isTasksPending || !tasks) return null

  return (
    <div className="flex items-center gap-6 text-sm">
      <div className="flex items-center gap-2 border border-blue-400/20 bg-blue-400/10 px-4 py-2 rounded-2xl shadow-2xl">
        <ListTodo size={16} className="text-blue-400" />
        <span className="text-blue-400 md:text-xs text-[8px]">
          {totalCount} total tasks
        </span>
      </div>
      <div className="flex items-center gap-2 border border-[#95FF77]/20 bg-[#95ff77]/10 px-4 py-2 rounded-2xl shadow-2xl">
        <CheckCircle size={16} className="text-[#95ff77]" />
        <span className="text-[#95ff77] md:text-xs text-[8px]">
          {completedCount} completed
        </span>
      </div>
      <div className="flex items-center gap-2 border border-orange-400/20 px-4 py-2 rounded-2xl shadow-2xl bg-orange-400/10">
        <Clock size={16} className="text-orange-400" />
        <span className="text-orange-400 md:text-xs text-[8px]">
          {totalCount - completedCount} pending
        </span>
      </div>
    </div>
  )
}
export default TaskStats
