//Importing all Redux Query from inside of the store/inde.js file
import { useFetchAlbumsQuery, useAddAlbumMutation } from "../store";
//This imports is to use with the useFetchAlbumsQuery
import Skeleton from "./Skeleton";
import Button from "./Button";
import AlbumsListItem from "./AlbumsListItem";

function AlbumsList({ user }) {
  //distructoring the useFetchAlbumsQuery in here (data error and isLoading)
  const { data, error, isLoading } = useFetchAlbumsQuery(user);

  const [addAlbum, results] = useAddAlbumMutation();

  const handleAddAlbum = () => {
    //The user here is the user we want to tie the album to
    addAlbum(user);
  };

  let content;

  if (isLoading === true) {
    //When useing the sketon we have to pass a props called times, it is to show how many lines of the skeleton
    content = <Skeleton className="h-10 w-full" times={3} />;
  } else if (error) {
    //In case we have an error we will show a message
    content = <div>Error loading albums.</div>;
  } else {
    //If we have succes in the fetch than we display the data, we have got from it
    content = data.map((album) => {
      return <AlbumsListItem key={album.id} album={album} />;
    });
  }

  return (
    <div>
      <div className="m-2 flex flex-row items-center justify-between">
        <h3 className="text-lg font-bold">Albums for {user.name}</h3>
        <Button loading={results.isLoading} onClick={handleAddAlbum}>
          {" "}
          + Add Album
        </Button>
      </div>
      <div>{content}</div>
    </div>
  );
}

export default AlbumsList;
