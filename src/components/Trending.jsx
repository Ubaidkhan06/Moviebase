import { useQueryClient, useQuery } from 'react-query'
import { getTrending } from '../lib/api'
import Carousel from 'react-material-ui-carousel'
import { imageUrl } from '../App'
import { Box, Typography } from '@mui/material'
import Loader from './Loader'
import { Link } from 'react-router-dom'

const Trending = ({ genre }) => {

  const queryClient = useQueryClient()

  const { data: trending, isLoading, error } = useQuery(['trendingData', genre], () => getTrending(genre))
  if (isLoading) return (<Loader />)
  console.log(trending)
  return (
    <Box className='carousel-box'>
      <Carousel interval={3000} navButtonsAlwaysVisible>
        {trending?.map(item => (
          <Link to={`/${item.id}`} style={{ textDecoration: 'none', color: 'black' }} >
            <div>
              <img
                src={`${imageUrl}/${item.backdrop_path}`}
                alt={item.name}
                className='card-img-1'
              />
              <Typography
                textAlign={'center'} fontWeight={700} variant='h6'>
                {genre === 'tv' ? item.name : item.title}  ||  {new Date(genre === 'tv' ? item.first_air_date : item.release_date).toDateString()}
              </Typography>
            </div>
          </Link>
        ))}
      </Carousel>
    </Box>
  )
}

export default Trending