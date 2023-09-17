import { useRemoveAlbumMutation } from "../store";
import { GoTrash } from "react-icons/go";
import Button from "./Button";
import ExpandablePanel from "./ExpendablePanel";
import PhotosList from "./PhotosList";

function AlbumsListItem({ album }) {
  //Every time we call a useHookMutation we recive an array
  const [removeAlbum, results] = useRemoveAlbumMutation();

  const handleRemoveAlbum = () => {
    //Passing the album as an argument so we recive the album id we  need to remove the album
    removeAlbum(album);
  };

  const header = (
    <>
      <Button
        className="mr-2"
        loading={results.isLoading}
        onClick={handleRemoveAlbum}
      >
        <GoTrash />
      </Button>
      {album.title}
    </>
  );
  return (
    <ExpandablePanel key={album.id} header={header}>
      <PhotosList album={album} />
    </ExpandablePanel>
  );
}

export default AlbumsListItem;
