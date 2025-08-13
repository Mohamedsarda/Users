import {
  User as UserIcon,
  MapPin,
  Phone,
  Globe,
  Building,
  Mail,
  ExternalLink,
} from 'lucide-react'
import { UserType } from '@/app/Utils/Types'
import { usePathname, useRouter } from 'next/navigation'

export const UserCard = ({ user }: { user: UserType }) => {
  const pathname = usePathname()

  const isUserPage = pathname === `/${user.id}`

  const handleEmailClick = () => {
    window.open(`mailto:${user.email}`, '_blank')
  }

  const handleWebsiteClick = () => {
    const url = user.website.startsWith('http')
      ? user.website
      : `https://${user.website}`
    window.open(url, '_blank')
  }

  const router = useRouter()
  const handleUserView = () => {
    router.push(`/${user.id}`)
  }

  return (
    <div className="group rounded-xl bg-gradient-to-br from-[#2A2E2E] to-[#242828] shadow-lg border border-[#333] h-[420px] flex flex-col gap-3 p-5 hover:scale-[1.01] hover:shadow-xl hover:border-[#95ff77]/20 transition-all duration-300 cursor-pointer">
      {/* Header */}
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-[#95ff77]/20 to-[#555D58] rounded-full flex items-center justify-center backdrop-blur-sm shadow-inner">
            <UserIcon size={18} className="text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-white group-hover:text-[#95ff77] transition-colors">
              {user.name}
            </h2>
            <p className="text-sm text-gray-400">@{user.username}</p>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="flex-1 space-y-3">
        <div className="flex items-center gap-3 text-sm text-gray-300 hover:text-white transition-colors">
          <Mail size={16} className="text-[#95ff77] flex-shrink-0" />
          <span className="truncate">{user.email}</span>
        </div>

        <div className="flex items-center gap-3 text-sm text-gray-300 hover:text-white transition-colors">
          <Phone size={16} className="text-[#95ff77] flex-shrink-0" />
          <span>{user.phone}</span>
        </div>

        <div className="flex items-center gap-3 text-sm text-gray-300 hover:text-white transition-colors">
          <Globe size={16} className="text-[#95ff77] flex-shrink-0" />
          <span className="truncate">{user.website}</span>
        </div>

        <div className="flex items-start gap-3">
          <MapPin size={16} className="text-[#95ff77] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-gray-300">
              {user.address.city}, {user.address.street}
            </p>
            <p className="text-sm text-gray-300">
              {user.address.suite}, {user.address.zipcode}
            </p>
            <span className="text-xs text-gray-500">
              {user.address.geo.lat}, {user.address.geo.lng}
            </span>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Building size={16} className="text-[#95ff77] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-gray-300 font-medium">
              {user.company.name}
            </p>
            <p className="text-sm text-gray-400 italic">
              {user.company.catchPhrase}
            </p>
            <span className="text-xs text-gray-500">{user.company.bs}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-3 border-t border-[#333]">
        <button
          onClick={handleEmailClick}
          className="flex-1 flex items-center justify-center gap-2 text-sm py-2.5 px-4 rounded-lg border border-[#95FF77]/20 bg-[#95ff77]/5 hover:bg-[#95ff77]/15 hover:border-[#95ff77]/40 transition-all duration-300 group/btn"
        >
          <Mail
            size={16}
            className="text-[#95ff77] group-hover/btn:scale-110 transition-transform"
          />
          <span className="text-gray-300 group-hover/btn:text-white">
            Email
          </span>
        </button>

        <button
          onClick={handleWebsiteClick}
          className="flex-1 flex items-center justify-center gap-2 text-sm py-2.5 px-4 rounded-lg border border-[#95FF77]/20 bg-[#95ff77]/5 hover:bg-[#95ff77]/15 hover:border-[#95ff77]/40 transition-all duration-300 group/btn"
        >
          <Globe
            size={16}
            className="text-[#95ff77] group-hover/btn:scale-110 transition-transform"
          />
          <span className="text-gray-300 group-hover/btn:text-white">
            WebSite
          </span>
        </button>
        {!isUserPage && (
          <button
            onClick={handleUserView}
            className="flex-1 flex items-center justify-center gap-2 text-sm py-2.5 px-4 rounded-lg border border-[#95FF77]/20 bg-[#95ff77]/5 hover:bg-[#95ff77]/15 hover:border-[#95ff77]/40 transition-all duration-300 group/btn"
          >
            <ExternalLink
              size={10}
              className="text-[#95ff77] group-hover/btn:scale-120 transition-transform"
            />
            <span className="text-gray-300 group-hover/btn:text-white">
              More
            </span>
          </button>
        )}
      </div>
    </div>
  )
}
