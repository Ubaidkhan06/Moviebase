import { Badge, Box, Grid, Chip, Typography, Card, CardMedia } from "@mui/material";
import React from "react";
import { useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import {
    getDetails,
    getDetailsTV,
    getMovieReviews,
    getTvReviews,
} from "../lib/api";
import Loader from "./Loader";
import { imageUrl } from "../App";
import { margin, Stack } from "@mui/system";
import millify from "millify";

const Details = () => {
    const { id } = useParams();
    const queryClient = useQueryClient();
    console.log(id);

    /**
     * !Query Function to get Movie Details
     */
    const {
        data: details,
        isLoading,
        error,
    } = useQuery(["movieDetailData", id], () => getDetails(id));

    /**
     * !Query Function to get Tv Show Details
     */
    const {
        data: tvDetails,
        isLoading: tvIsLoading,
        error: tvError,
    } = useQuery(["tvDetailData", id], () => getDetailsTV(id));

    /**
     * ! Query Function to get Moview Reviews
     */
    const {
        data: movieReviews,
        isLoading: movieReviewLoading,
        error: movieReviewError,
    } = useQuery(["movieReview", id], () => getMovieReviews(id));

    /**
     * ! Query Function to get Tv Show Reviews
     */
    const {
        data: tvReview,
        isLoading: tvReviewLoading,
        error: tvReviewError,
    } = useQuery(["tvReview", id], () => getTvReviews(id));

    if (isLoading) return <Loader />;
    if (tvIsLoading) return <Loader />;
    // if (tvError) return (<div>error :- {tvError}</div>)

    /**
     * !Converts Total minutes in Hours.Minutes Format
     * @param {Number} TotalMinutes
     * @returns {String} Hours.Minutes 
     */
    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}.${minutes}`;
    };

    // ?final Data depeends what id have been passed in parameter according to that movie list or tv show list is selected
    const finalData = !!details ? details : tvDetails;

    // ?Reviews is selected on the basis of id passed in param either for movies or tv shows 
    const reviews = !!movieReviews ? movieReviews : tvReview
    console.log(reviews?.results);

    // return (
    //     <Box marginTop={10} overflow="hidden">
    //         <Grid container spacing={3}>
    //             <Grid item key={1} xs={12} sm={12} md={6} lg={7} xl={7}>
    //                 <div>
    //                     <img
    //                         src={`${imageUrl}/${finalData.backdrop_path}`}
    //                         alt={finalData.original_title}
    //                         style={{ objectFit: "contain" }}
    //                         height={"100%"}
    //                         width={"100%"}
    //                     />
    //                 </div>
    //             </Grid>
    //             <Grid item key={2} xs={12} sm={12} md={6} lg={5} xl={5}>
    //                 <Box>
    //                     <Stack direction={"row"} spacing={3}>
    //                         <Typography color="white" variant="h6" gap={2}>
    //                             {new Date(
    //                                 !!details
    //                                     ? finalData?.release_date
    //                                     : finalData?.first_air_date
    //                             ).toDateString()}
    //                         </Typography>
    //                         <Typography color="white" variant="h6">
    //                             &#9733;
    //                             {finalData.vote_average}/10
    //                         </Typography>
    //                         <Typography color="white" variant="h6">
    //                             {millify(finalData.vote_count)}
    //                         </Typography>
    //                         <Typography color="white" variant="h6">
    //                             {!!details && `${toHoursAndMinutes(finalData.runtime)} hrs`}
    //                         </Typography>
    //                     </Stack>
    //                     <hr />
    //                     <Typography variant="h3" color="#90cea1">
    //                         {!!details ? finalData.original_title : finalData.original_name}
    //                     </Typography>
    //                     <hr />
    //                     <Typography color="white" variant="h4">
    // {finalData?.tagline.length === 0 ? (
    //     <p>No TagLine</p>
    // ) : (
    //     finalData?.tagline
    // )}
    //                     </Typography>
    //                     <hr />
    // <Stack direction={"row"} spacing={2}>
    //     {finalData?.genres?.map((genre) => (
    //         <Chip color="primary" label={genre.name} />
    //     ))}
    // </Stack>
    // <hr />
    // <Typography color="white" variant="h5">
    // {finalData?.overview.length === 0 ? (
    //     <p>No Overview</p>
    // ) : (
    //     finalData?.overview
    // )}
    // </Typography>
    //                     <hr />
    // <Stack sx={{ flexWrap: "wrap" }} direction={"row"} spacing={1}>
    //     {finalData?.production_companies?.map((item) => (
    //         <Box key={item.name}>
    //             <Chip sx={{ margin: '5px' }} color="primary" variant="filled" label={item.name} />
    //         </Box>
    //     ))}
    // </Stack>
    //                 </Box>
    //             </Grid>
    //         </Grid>
    //         {/* {reviews?.length === 0 ? <Typography>No Reviews</Typography> : reviews?.map(item => (
    //             <Box key={item.id}>
    //                 {item?.results?.map(item => (
    //                     <div key={item.author}>
    //                         <h1>{item.author}</h1>
    //                     </div>
    //                 ))}
    //             </Box>
    //         ))} */}
    //         <Box>
    //             <Typography color='white'>
    //                 Reviews
    //             </Typography>
    //         </Box>
    //         {reviews.results.length === 0 ? (<Typography color={'white'} textAlign='center'>No Reviews..</Typography>) : (reviews.results.map(item => (
    //             <Card sx={{ display: 'flex', gap: 2, overflowY: 'scroll', height: 250, padding: '20px', margin: '1rem' }}>
    //                 <img src={`${imageUrl}/${item.author_details.avatar_path}`} />
    //                 <Box>
    //                     <Typography>
    //                         {item.author}
    //                     </Typography>
    //                     <Typography>
    //                         {item.content}
    //                         Rating :- {item.author_details.rating}
    //                     </Typography>
    //                 </Box>
    //             </Card>
    //         )))}
    //     </Box>
    // );
    return (
        <>
            <Box>
                <img
                    src={`${imageUrl}/${finalData.backdrop_path}`}
                    alt={finalData?.original_title}
                    style={{ opacity: 0.1, objectFit: 'contain', height: 'auto', width: '100%', position: 'relative' }}
                />
            </Box>
            <Box sx={{
                position: 'absolute',
                objectFit: 'contain',
                // height: '500px',
                // width: 'auto',
                bottom: '10%',
                left: '10%',
                borderRadius: '10px',
                display: 'flex',
                gap: 5,
                alignItems: 'center'
            }}>
                <Card className="card">
                    <CardMedia
                        component="img"
                        image={`${imageUrl}/${finalData.poster_path}`}
                        alt={finalData.original_title}
                        // className='card-img'
                        sx={{
                            objectFit: 'contain',
                            height: '500px',
                            width: 'auto',
                        }}
                    />
                </Card>
                <Box>
                    <Typography variant="h3" color="#90cea1">
                        {!!details ? finalData.original_title : finalData.original_name}
                    </Typography>
                    <hr />
                    <Stack direction={"row"} spacing={3}>
                        <Typography color="white" variant="h6" gap={2}>
                            {new Date(
                                !!details
                                    ? finalData?.release_date
                                    : finalData?.first_air_date
                            ).toDateString()}
                        </Typography>
                        <Typography color="white" variant="h6">
                            &#9733;
                            {finalData.vote_average}/10
                        </Typography>
                        <Typography color="white" variant="h6">
                            {millify(finalData.vote_count)}
                        </Typography>
                        <Typography color="white" variant="h6">
                            {!!details && `${toHoursAndMinutes(finalData.runtime)} hrs`}
                        </Typography>
                    </Stack>
                    <hr />
                    <Stack>
                        <Typography color='white' variant='h5'>
                            {finalData?.tagline.length === 0 ? (
                                <p>No TagLine</p>
                            ) : (
                                finalData?.tagline
                            )}
                        </Typography>
                    </Stack>
                    <hr />
                    <Stack direction={"row"} spacing={2}>
                        {finalData?.genres?.map((genre) => (
                            <Chip color="primary" label={genre.name} />
                        ))}
                    </Stack>
                    <hr />
                    <Typography variant="h6" color='white' width={'50rem'}>
                        {finalData?.overview.length === 0 ? (
                            <p>No Overview</p>
                        ) : (
                            finalData?.overview
                        )}
                    </Typography>
                    <hr />
                    <Stack sx={{ flexWrap: "wrap" }} direction={"row"} spacing={1}>
                        {finalData?.production_companies?.map((item) => (
                            <Box key={item.name}>
                                <Chip sx={{ margin: '5px' }} color="primary" variant="filled" label={item.name} />
                            </Box>
                        ))}
                    </Stack>
                </Box>
            </Box>
        </>
    )
};

export default Details;
