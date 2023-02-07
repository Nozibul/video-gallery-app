import { createApi ,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:9000',
    }),
    tagsTypes:["Videos", "Video", "RelatedVideo"],
    endpoints: (builder)=>({
         getVideos: builder.query({
            query: ()=> ({
                url: '/videos',
                method: "GET"
            }),
            keepUnusedDataFor: 120,
            providesTags: ["Videos"]
         }),

         getVideo : builder.query({
            query: (videoId) => `/videos/${videoId}`,
            providesTags: (result, error, arg)=>[
              { type: "Video", id:arg},
            ],
         }),

         // http://localhost:9000/videos?title_like=css&title_like=javascript&_limit=3&id_ne=3
         getRelatedVideo: builder.query({
            query: ({id, title})=>{
                const tags = title.split(" ") ;
                const likes = tags.map((tag)=> `title_like=${tag}`) ;
                const queryStr = `/videos?${likes.join("&")}&id_ne=${id}&_limit=4`
                return queryStr ;
            },
            providesTags: (result, error, arg)=>[
                { type: "RelatedVideo", id:arg.id},
              ],
         }),

         addVideo: builder.mutation({
            query: (data)=> ({
                url: `/videos`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Videos"]
         }),

         editVideo: builder.mutation({
            query: ({id, data})=> ({
                url: `/videos/${id}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: (result, error, arg)=>[
              "Videos",
              { type:"Video", id: arg.id},
              { type: "RelatedVideo", id: arg.id }
            ]
         }),

         deleteVideo: builder.mutation({
            query: (id)=> ({
                url: `/videos/${id}`,
                method: "DELETE", 
            }),
            invalidatesTags:["Videos"]
         }),

    }),
});

export const { 
    useGetVideosQuery , 
    useGetVideoQuery, 
    useGetRelatedVideoQuery ,
    useAddVideoMutation,
    useEditVideoMutation,
    useDeleteVideoMutation,
} = apiSlice ;