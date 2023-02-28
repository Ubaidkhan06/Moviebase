import { Badge, Box, Grid, Chip, Typography } from "@mui/material";
import React from "react";
import { useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { getDetails, getDetailsTV } from "../lib/api";
import Loader from "./Loader";
import { imageUrl } from "../App";
import { Stack } from "@mui/system";
import millify from "millify";

const Details = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  console.log(id);

  const {
    data: details,
    isLoading,
    error,
  } = useQuery(["movieDetailData", id], () => getDetails(id));

  const {
    data: tvDetails,
    isLoading: tvIsLoading,
    error: tvError,
  } = useQuery(["tvDetailData", id], () => getDetailsTV(id));
  
  if (isLoading) return <Loader />;
  if (tvIsLoading) return <Loader />;
  // if (tvError) return (<div>error :- {tvError}</div>)
  console.log(tvDetails);

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}.${minutes}`;
  };

  const finalData = !!details ? details : tvDetails;

  return (
    <Box marginTop={10} overflow="hidden">
      <Grid container spacing={3}>
        <Grid item key={1} xs={12} sm={12} md={6} lg={7} xl={7}>
          <div>
            <img
              src={`${imageUrl}/${finalData.backdrop_path}`}
              alt={finalData.original_title}
              style={{ objectFit: "contain" }}
              height={"100%"}
              width={"100%"}
            />
          </div>
        </Grid>
        <Grid item key={2} xs={12} sm={12} md={6} lg={5} xl={5}>
          <Box>
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
            <Typography variant="h3" color="#90cea1">
              {!!details ? finalData.original_title : finalData.original_name}
            </Typography>
            <hr />
            <Typography color="white" variant="h4">
              {finalData?.tagline.length === 0 ? (
                <p>No TagLine</p>
              ) : (
                finalData?.tagline
              )}
            </Typography>
            <hr />
            <Stack direction={"row"} spacing={2}>
              {finalData?.genres?.map((genre) => (
                <Chip color="primary" label={genre.name} />
              ))}
            </Stack>
            <hr />
            <Typography color="white" variant="h5">
              {finalData?.overview.length === 0 ? (
                <p>No Overview</p>
              ) : (
                finalData?.overview
              )}
            </Typography>
            <hr />
            <Stack sx={{ flexWrap: "wrap" }} direction={"row"} spacing={1}>
              {finalData?.production_companies?.map((item) => (
                <Chip color="primary" variant="filled" label={item.name} />
              ))}
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Details;
