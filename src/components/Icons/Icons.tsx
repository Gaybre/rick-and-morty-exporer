import {
  DeleteForeverOutlined as Delete,
  Search,
  FilterAltOutlined as Filter,
  SentimentVerySatisfiedSharp as Alive,
  SentimentVeryDissatisfiedSharp as Dead,
  SentimentDissatisfiedSharp as Unknown,
} from '@mui/icons-material'

export const icons = {
  delete: <Delete />,
  search: <Search />,
  filter: <Filter />,
  alive: <Alive sx={{ fontSize: 30 }} />,
  dead: <Dead sx={{ fontSize: 30 }} />,
  unknown: <Unknown sx={{ fontSize: 30 }} />,
}
