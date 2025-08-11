import { AccommodationValues, OwnerValues, Photo } from '../../types';
import PhotoComponent from '../photoComponent';
interface ResumeProps {
  accommodationValues: AccommodationValues;
  accommodationType: string;
  accommodationPhotos: Photo[];
  ownerValues: OwnerValues;
  handleResetValues: () => void;
}

function Resume({
  accommodationValues,
  accommodationType,
  accommodationPhotos,
  ownerValues,
  handleResetValues,
}: ResumeProps) {
  return (
    <section className="h-[630px] rounded-2xl">
      <div className="p-5 flex flex-col gap-4 justify-between h-full">
        <div className="container-resume">
          <h2 className="container-resume-title">Accommodation</h2>
          <div className="space-y-1 text-blue-900">
            <p>
              <span className="label-global">Name: </span>
              {accommodationValues.name || '-'}
            </p>
            <p>
              <span className="label-global">Address: </span>
              {accommodationValues.address || '-'}
            </p>
            <p className="leading-snug">
              <span className="label-global">Description: </span>
              {accommodationValues.description || '-'}
            </p>
            <p>
              <span className="label-global">Type: </span>
              {accommodationType || '-'}
            </p>
          </div>

          <div className="mt-4">
            <span className="label-global">Photos: </span>
            <div className="flex gap-3 flex-wrap mt-1">
              <PhotoComponent photos={accommodationPhotos} />
            </div>
          </div>
        </div>

        <div className="container-resume">
          <h3 className="container-resume-title">Owner</h3>
          <div className="space-y-1 text-blue-900">
            <p>
              <span className="label-global">Name: </span>
              {ownerValues.name || '-'}
            </p>
            <p>
              <span className="label-global">Email: </span>
              {ownerValues.email || '-'}
            </p>
            <p>
              <span className="label-global">Phone: </span>
              {ownerValues.phone || '-'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => handleResetValues()}
          className="btn-primary"
        >
          Submit
        </button>
      </div>
    </section>
  );
}

export default Resume;
