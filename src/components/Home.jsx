import { useState, useEffect } from 'react'
import { imageUrl, Url } from '../App'
import { Card, Grid, Typography, CardMedia, CardContent, Icon, Paper } from '@mui/material'
import { Box } from '@mui/system'
import { useQuery, useQueryClient } from 'react-query'
import { getDetails, getMovies } from '../lib/api'
import GradeRoundedIcon from '@mui/icons-material/GradeRounded';
import Trending from './Trending'
import Loader from './Loader'
import { Link } from 'react-router-dom'
import Details from './Details'
const Home = () => {
    const queryClient = useQueryClient()

    const { data: movies, isLoading, error } = useQuery('movieData', getMovies)
    if (isLoading) return (<Loader />)

    return (
        <>
            <Box>
                <Typography
                    textAlign='center'
                    fontWeight={500}
                    variant='h5'
                    fontFamily='fantasy'
                    marginTop={'100px'}
                >
                    Trending Movies this week
                </Typography>
                <Trending genre={'movie'} />
            </Box>
            <Box width={'90vw'} margin='auto'>
                <header className="header">
                    <Typography
                        fontWeight={600}
                        letterSpacing={3}
                        color='#90cea1'
                        variant='h3'
                    >
                        All Movies
                    </Typography>
                </header>
                <hr />
                <Grid container spacing={4}>
                    {movies?.map((movie) => (
                        <Grid className='item' item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                            <Link style={{ textDecoration: 'none', color: 'black' }} to={`/${movie.id}`}>
                                <Card>
                                    <div className='img-container'>
                                        <CardMedia
                                            component="img"
                                            image={`${imageUrl}/${movie.backdrop_path}`}
                                            alt={movie.name}
                                            className='card-img'
                                        />
                                    </div>
                                    <CardContent sx={{ backgroundColor: 'black' }}>
                                        <Typography
                                            color='white'
                                            fontWeight={500}
                                            variant='h6' >
                                            {movie.title}
                                        </Typography>
                                        <Box display='flex' justifyContent={'space-between'} alignItems='center'>
                                            <Typography
                                                color='white'
                                                fontWeight={500}
                                                variant='h6' >
                                                {movie.vote_average} &#9733;
                                            </Typography>
                                            <Typography color='white'>{new Date(movie.release_date).toDateString()}</Typography>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    )
}

export default Home