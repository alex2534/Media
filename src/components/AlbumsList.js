import { useFetchAlbumsQuery } from "../store";

function AlbumsList({ user }) {
  //distructoring the useFetchAlbumsQuery in here (data error and isLoading)
  const { data, error, isLoading } = useFetchAlbumsQuery(user);
  console.log(data, error, isLoading);
  return <div>Albums for {user.name}</div>;
}

export default AlbumsList;
