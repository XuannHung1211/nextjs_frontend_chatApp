import { MessageCircleDashed } from "lucide-react"

const EmptyChatState = () => {
  return (
    <div className="flex h-full items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-6 text-center">

        <div className="w-20 h-20 flex items-center justify-center rounded-full 
                        bg-gray-100 text-gray-400">
          <MessageCircleDashed size={36} />
        </div>

        <div className="space-y-1">
          <h2 className="text-lg font-medium text-gray-700">
            Chọn một cuộc trò chuyện
          </h2>

          <p className="text-sm text-gray-400 max-w-xs">
            Bắt đầu kết nối và trò chuyện với mọi người
          </p>
        </div>

      </div>
    </div>
  )
}

export default EmptyChatState