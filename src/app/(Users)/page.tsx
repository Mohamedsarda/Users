'use client'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Users, Search } from 'lucide-react'
import { UserCard } from './Components/UserCard'
import ErrorCard from './Components/Error'
import { fetchAllUsers } from '../api/users'

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')

  const { data, error, isPending } = useQuery({
    queryKey: ['users'],
    queryFn: fetchAllUsers,
  })

  const filteredAndSortedUsers = data?.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.company.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="bg-gradient-to-br from-[#1A1C1B] to-[#222] border border-[#333] shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#2A2E2E] to-[#242828] h-32 md:h-42 p-4 border-b border-[#333] fixed top-0 left-0 right-0 z-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white flex items-center gap-4">
            <div className="md:p-4 p-2 bg-gradient-to-br from-[#95ff77]/20 to-[#555D58] rounded-full shadow-lg">
              <Users className="text-white md:w-5 w-2 md:h-5 h-2" />
            </div>
            <span className="md:text-base text-xs">Users Directory</span>
            <span className="md:text-lg text-xs font-normal text-gray-400">
              ({filteredAndSortedUsers?.length || 0} users)
            </span>
          </h1>
        </div>

        {/* Search and Filter */}
        <div className="relative flex-1">
          <Search
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search by name, email, or company..."
            value={searchTerm}
            autoFocus={true}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-[#333] border border-[#444] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#95ff77] focus:ring-2 focus:ring-[#95ff77]/20 transition-all"
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-8 md:mt-42 mt-32">
        {isPending && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-xl">
                <Skeleton
                  height={300}
                  baseColor="#333"
                  highlightColor="#444"
                  borderRadius="0.75rem"
                />
              </div>
            ))}
          </div>
        )}

        {error && <ErrorCard errorMessage={error.message} />}

        {data && filteredAndSortedUsers && (
          <>
            {filteredAndSortedUsers.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-gray-500/10 border border-gray-500/20 rounded-xl p-8 w-full mx-auto">
                  <Search size={48} className="text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400 font-medium">No users found</p>
                  <p className="text-gray-500 text-sm mt-2">
                    Try adjusting your search terms
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                {filteredAndSortedUsers.map((user) => (
                  <UserCard key={user.id} user={user} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
