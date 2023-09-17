import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
//Faker will be used to add new data
import { faker } from "@faker-js/faker";

//DEV ONLY !!!
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

const albumsApi = createApi({
  reducerPath: "albums",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3005",
    //This is only to test the spinners
    fetchFn: async (...args) => {
      await pause(1000);
      return fetch(...args);
    },
  }),
  //Any time we need to tell Redux query about how to make another kind of request,
  //we're going to add in another key inside of this ( endpoints aobject )
  //from that function albumsApi
  endpoints(builder) {
    return {
      removeAlbum: builder.mutation({
        //This will call the fetchQuery whenever we remove an album/or a user
        invalidatesTags: (result, error, album) => {
          return [{ type: "Album", id: album.id }];
        },
        //our parmeter will be album so we can get the id of the album to remove it
        query: (album) => {
          return {
            url: `/albums/${album.id}`,
            method: "DELETE",
          };
        },
      }),

      //Every time we use mutation we are telling Redux we are going to change some data.
      addAlbum: builder.mutation({
        //This is to invalidet a tag in a fetchQuery to update the view
        invalidatesTags: (result, error, user) => {
          return [{ type: "UsersAlbums", id: user.id }];
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
        providesTags: (result, error, user) => {
          const tags = result.map((album) => {
            //With this album.id we can call this query when we delete/or add  a album
            return { type: "Album", id: album.id };
          });
          tags.push({ type: "UsersAlbums", id: user.id });
          return tags;
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
export const {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation,
} = albumsApi;
export { albumsApi };
