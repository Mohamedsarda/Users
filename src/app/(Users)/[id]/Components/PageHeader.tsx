import { ArrowLeft, User } from 'lucide-react'
import { TaskType, UserType } from '@/app/Utils/Types'
import TaskStats from './TaskStats'

const PageHeader = ({
  user,
  isUserPending,
  onBack,
  totalCount,
  completedCount,
  isTasksPending,
  tasks,
}: {
  user: UserType | undefined
  isUserPending: boolean
  onBack: () => void
  totalCount: number
  completedCount: number
  isTasksPending: boolean
  tasks: TaskType[] | undefined
}) => {
  return (
    <div className="bg-gradient-to-r from-[#2A2E2E] to-[#242828] p-6 border-b border-[#333] sticky top-0 z-10">
      <div className="">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={onBack}
            className="p-2 rounded-lg border border-[#95FF77]/20 bg-[#95ff77]/5 hover:bg-[#95ff77]/15 hover:border-[#95ff77]/40 transition-all duration-300 group"
          >
            <ArrowLeft
              size={20}
              className="text-[#95ff77] group-hover:scale-110 transition-transform"
            />
          </button>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-[#95ff77]/20 to-[#555D58] rounded-full shadow-lg">
              <User size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                {isUserPending ? 'Loading...' : user?.name || 'User Details'}
              </h1>
              <p className="text-gray-400">
                @{isUserPending ? '...' : user?.username}
              </p>
            </div>
          </div>
        </div>

        <TaskStats
          totalCount={totalCount}
          completedCount={completedCount}
          isTasksPending={isTasksPending}
          tasks={tasks}
        />
      </div>
    </div>
  )
}
export default PageHeader
