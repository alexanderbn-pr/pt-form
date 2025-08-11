import { Photo } from '../types';

interface PhotoComponentProps {
  photos: Photo[];
}

function PhotoComponent({ photos }: PhotoComponentProps) {
  return (
    <>
      {photos.map((photo) => (
        <div key={photo.id} className="photo">
          <img
            alt={`Photo  ${photo.id}`}
            className="photo-img"
            src={photo.url}
          />
        </div>
      ))}
    </>
  );
}

export default PhotoComponent;
