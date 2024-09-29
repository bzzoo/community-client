import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog'
import { CreateArticleForm } from '@/features/article/create-article'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

import { PiNotePencilBold } from 'react-icons/pi'
import { UserIcon } from 'lucide-react'
import { Label } from '@/shared/ui/label'

export function CreateArticleModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex w-full items-center gap-4">
          <UserIcon />
          <div className="relative w-full flex items-center gap-4 p-4 rounded-full bg-defaultGray">
            <Label className="text-base text-slate-400">
              새로운 글을 작성해 보세요
            </Label>
            <PiNotePencilBold
              className="absolute right-4"
              size={28}
              color="gray"
            />
          </div>
        </div>
      </DialogTrigger>

      <DialogContent>
        <VisuallyHidden>
          <DialogTitle />
        </VisuallyHidden>
        <CreateArticleForm />
        <VisuallyHidden>
          <DialogDescription />
        </VisuallyHidden>
      </DialogContent>
    </Dialog>
  )
}
