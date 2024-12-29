import {parseISO, formatDistanceToNow, subHours} from 'date-fns'
import { Typography } from '@mui/material'

interface TimeAgoProps {
    timestamp :string
}

export const TimeAgo = ({timestamp} : TimeAgoProps) => {
    let timeAgo = ''
    const date = parseISO(timestamp)

    const timePeriod = formatDistanceToNow(subHours(date, 8))
    timeAgo = `${timePeriod} ago`

    return (
        <Typography variant="body2" component="span" title={timestamp}>
    <i>{timeAgo}</i>
        </Typography>
    )
}