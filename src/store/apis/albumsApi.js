import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
//Faker will be used to add new data
import { Faker, faker } from "@faker-js/faker";

const albumsApi = createApi({
  reducerPath: "albums",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3005",
  }),
  //Any time we need to tell Redux query about how to make another kind of request,
  //we're going to add in another key inside of this ( endpoints aobject )
  //from that function albumsApi
  endpoints(builder) {
    return {
      //Every time we use mutation we are telling Redux we are going to change some data.
      addAlbum: builder.mutation({
        //This is to invalidet a tag in another function
        invalidatesTags: (results, error, user) => {
          return [{ type: "Album", id: user.id }];
        },
        //The query function is to tell about some parameters to use for the request
        query: (user) => {
          return {
            url: "/albums",
            //What kind of request we are making
            method: "POST",
            //Body will contain all the data we want to add
            body: {
              userId: user.id,
              title: faker.commerce.productName(),
            },
          };
        },
      }),
      fetchAlbums: builder.query({
        //The query function is to tell about some parameters to use for the request
        //This tag is to be used when a query mutation happens
        providesTags: (results, error, user) => {
          return [{ type: "Album", id: user.id }];
        },
        query: (user) => {
          return {
            url: "/albums",
            params: {
              userId: user.id,
            },
            method: "GET",
          };
        },
      }),
    };
  },
});

//becase we add it in fetch albums specifically, we now ge access to a
//hook called albumsApi.useFetchAlbumsquery() then we can use inside one of our components
export const { useFetchAlbumsQuery, useAddAlbumMutation } = albumsApi;
export { albumsApi };
