import { CheckCircle, Circle, Clock } from 'lucide-react'
import { TaskType } from '@/app/Utils/Types'

// export const TaskCard = ({ task }: { task: TaskType }) => {
//   const isCompleted = task.completed
//   return (
//     <div className="group rounded-lg bg-gradient-to-br from-[#2A2E2E] to-[#242828] shadow-lg border border-[#333] p-4 hover:scale-[1.01] hover:shadow-xl hover:border-[#95ff77]/20 transition-all duration-300">
//       <div className="flex items-start gap-3">
//         <div className="flex-shrink-0 mt-1">
//           {isCompleted ? (
//             <CheckCircle size={20} className="text-[#95ff77]" />
//           ) : (
//             <Circle size={20} className="text-gray-400" />
//           )}
//         </div>

//         <div className="flex-1">
//           <h3
//             className={`text-sm font-medium leading-5 ${
//               isCompleted
//                 ? 'text-gray-400'
//                 : 'text-white group-hover:text-[#95ff77]'
//             } transition-colors`}
//           >
//             {task.title}
//           </h3>

//           <div className="flex items-center gap-2 mt-2">
//             <div
//               className={`flex items-center gap-2 text-xs px-2 py-1 rounded-full ${
//                 isCompleted
//                   ? 'bg-[#95ff77]/10 text-[#95ff77] border border-[#95ff77]/20'
//                   : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
//               }`}
//             >
//               {isCompleted ? <CheckCircle size={12} /> : <Clock size={12} />}
//               <span>{isCompleted ? 'Completed' : 'In Progress'}</span>
//             </div>

//             <span className="text-xs text-gray-500">Task #{task.id}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

interface TaskCardProps {
  task: TaskType
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const isCompleted = task.completed
  return (
    <div className="rounded-2xl p-4 bg-gradient-to-br from-[#2A2E2E] to-[#242828] shadow-lg border border-gray-800 flex items-start gap-4 hover:scale-[1.01] duration-500">
      <div className="mt-1">
        {task.completed ? (
          <CheckCircle className="text-green-500 w-6 h-6" />
        ) : (
          <Circle className="text-gray-500 w-6 h-6" />
        )}
      </div>

      <div className="flex-1">
        <div className="flex flex-col md:flex-row justify-between">
          <h2 className="text-lg font-semibold text-gray-300">{task.title}</h2>
          <div
            className={`w-fit flex items-center gap-2 text-xs px-2 py-1 my-2 rounded-full ${
              isCompleted
                ? 'bg-[#95ff77]/10 text-[#95ff77] border border-[#95ff77]/20'
                : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
            }`}
          >
            {isCompleted ? <CheckCircle size={12} /> : <Clock size={12} />}
            <span>{isCompleted ? 'Completed' : 'In Progress'}</span>
          </div>
        </div>
        <p className="text-sm text-gray-400">Task ID: {task.id}</p>
      </div>
    </div>
  )
}
