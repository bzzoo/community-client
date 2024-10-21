import { cn } from '@/shared/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from './avatar'

const UserIcon = ({ size = 'lg' }) => {
  return (
    <Avatar
      className={cn({
        'w-24 h-24': size === 'xl',
        'w-11 h-11': size === 'lg',
        'w-9 h-9': size === 'md',
        'w-7 h-7': size === 'sm',
      })}
    >
      <AvatarImage
        src="https://github.com/shadcn.png"
        alt="@shadcn"
      />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}

export default UserIcon
