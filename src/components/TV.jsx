import React, { useEffect } from 'react'
import { getTV } from '../lib/api'
import { useQueryClient, useQuery } from 'react-query'
import { Typography, Box, Grid, Card, CardMedia, CardContent } from '@mui/material'
import { imageUrl } from '../App'
import Trending from './Trending'
import { Icon } from '@mui/material'
import GradeRoundedIcon from '@mui/icons-material/GradeRounded';
import Loader from './Loader'
import { Link } from 'react-router-dom'

const TV = () => {
    useEffect(() => {
        window.scrollTo({
            top: 100,
            left: 100,
            behavior: 'smooth'
        });
    })
 
 
    const queryClient = useQueryClient()

    const { data: tv, isLoading, error } = useQuery('tvShowData', getTV)
    if (isLoading) return (<Loader />)
    console.log(tv)

    return (
        <>
            <Box>
                <Typography
                    textAlign='center'
                    fontWeight={500}
                    variant='h5'
                    color='#90cea1'
                    fontFamily='fantasy'
                    marginTop={'100px'}
                >
                    Trending TV Shows this week
                </Typography>

                <Trending genre={'tv'} />
            </Box>
            <Box width={'90vw'} margin='auto' marginTop={'50px'}>
                <header className="header">
                    <Typography color={'#90cea1'} fontWeight={600} variant='h3'>All TV Shows</Typography>
                </header>
                <hr />
                <Grid container spacing={4}>
                    {tv?.map((show) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={show.id}>
                            <Card className='card'>
                                <Link style={{ textDecoration: 'none', color: 'black' }} to={`/${show.id}`}>
                                    <div className='img-container'>

                                        <CardMedia
                                            component="img"
                                            image={`${imageUrl}/${show.poster_path}`}
                                            alt={show.name}
                                            className='card-img'
                                        />
                                    </div>
                                </Link>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    )
}

export default TV