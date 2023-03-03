import axios from "axios";
import { Url } from '../App'
import { token } from "../App";

export const getMovies = async () => {
    try {
        let result = await axios.get(`${Url}/discover/movie`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        // console.log(result?.data?.results)
        return result?.data?.results
    } catch (err) {
        console.log(err)
    }
}

export const getTV = async () => {
    try {
        let result = await axios.get(`${Url}/discover/tv`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        console.log(result?.data?.results)
        return result?.data?.results
    } catch (err) {
        console.log(err)
    }
}

export const getTrending = async (genre) => {
    try {
        let result = await axios.get(`${Url}/trending/${genre}/week`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        // console.log(result?.data?.results)
        return result?.data?.results
    } catch (err) {
        console.log(err)
    }
}

export const getDetails = async (id) => {
    try {
        let result = await axios.get(`${Url}/movie/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        console.log(result)
        return result?.data
    } catch (err) {
        console.log(err)
    }
}

export const getDetailsTV = async (id) => {
    try {
        let result = await axios.get(`${Url}/tv/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        // console.log(result)
        return result?.data
    } catch (err) {
        console.log(err)
    }
}

export const getTvReviews = async (id) => {
    try {
        let result = await axios.get(`${Url}/tv/${id}/reviews`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        // console.log(result)
        return result?.data
    } catch (err) {
        console.log(err)
    }
}

export const getMovieReviews = async (id) => {
    try {
        let result = await axios.get(`${Url}/movie/${id}/reviews`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        // console.log(result)
        return result?.data
    } catch (err) {
        console.log(err)
    }
}
