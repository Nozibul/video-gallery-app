import { createApi ,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:9000',
    }),
    endpoints: (builder)=>({
         getVideos: builder.query({
            query: ()=> '/videos'
         }),
         getVideo : builder.query({
            query: (videoId) => `/videos/${videoId}`
         }),
         
         // http://localhost:9000/videos?title_like=css&title_like=javascript&_limit=3&id_ne=3
         getRelatedVideo: builder.query({
            query: ({id, title})=>{
                const tags = title.split(" ") ;
                const likes = tags.map((tag)=> `title_like=${tag}`) ;
                const queryStr = `/videos?${likes.join("&")}&id_ne=${id}&_limit=4`
                return queryStr ;
            }
         })
    }),
});

export const { useGetVideosQuery , useGetVideoQuery, useGetRelatedVideoQuery } = apiSlice ;