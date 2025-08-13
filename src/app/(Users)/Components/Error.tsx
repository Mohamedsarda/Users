import React from 'react'

const ErrorCard = ({ errorMessage }: { errorMessage: string }) => {
  return (
    <div className="text-center py-12">
      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 w-full mx-auto">
        <p className="text-red-400 font-medium">Failed to load users</p>
        <p className="text-red-300 text-sm mt-2">{errorMessage}</p>
      </div>
    </div>
  )
}

export default ErrorCard
