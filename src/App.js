import { Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Home from "./components/Home";
import './App.css'
import Navbar from "./components/Navbar";
import TV from "./components/TV";
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClientProvider, QueryClient } from "react-query";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Trending from "./components/Trending";
import Details from "./components/Details";

export const Url = 'https://api.themoviedb.org/3'
export const imageUrl = 'https://image.tmdb.org/t/p/original'
export const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzg2OGIyM2I5NzI5NDg2MWI0ZWFmN2FkZTk0NGZlNyIsInN1YiI6IjYzYjk1NWEzNmQ2NzVhMDA4MmQyYjIxYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wuYuN88juA-XFiQUNx4h7Naug16qDYEuPCzycqjJLnc'

const queryClient = new QueryClient()


function App() {


  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Box>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/tv' element={<TV />} />
            <Route path='/:id' element={<Details/>} />
          </Routes>
        </Box>
        <ReactQueryDevtools/>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
