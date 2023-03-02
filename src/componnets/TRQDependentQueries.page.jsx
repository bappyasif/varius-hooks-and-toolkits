import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const fetchUserByEmail = addr => axios.get(`http://localhost:4000/users/${addr}`)

const fetchContentsFromChannel = id => axios.get(`http://localhost:4000/channels/${id}`)

export const TRQDependentQueriesPage = ({emailAddr}) => {
  const {data: user} = useQuery({queryKey: ["user", emailAddr], queryFn: () => fetchUserByEmail(emailAddr)})
  const channelId = user?.data.channelId;
  console.log(user?.data, "data", channelId)
  const { data:channel } = useQuery({queryKey: ["channel", channelId], queryFn: () => fetchContentsFromChannel(channelId), enabled: !!channelId})
  console.log(channel?.data, "channel!!")
  return (
    <main>
      <h1>DependentQueriesPage</h1>
      {channel?.data.contents.map(content => <h2 key={content}>{content}</h2>)}
    </main>
  )
}
