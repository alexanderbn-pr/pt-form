import InputComponent from '../inputComponent';
import SelectComponent from '../selectComponent';
import PhotoComponent from '../photoComponent';
import {
  TYPE_OPTIONS,
  MAX_IMAGE_PX,
  ACCEPTED_IMAGE_TYPES,
  MAX_PHOTOS,
} from '../../constants';
import { AccommodationValues, AccommodationErrors, Photo } from '../../types';

interface Props {
  handleSubmit: (e: React.FormEvent, step: number) => void;
  values: AccommodationValues;
  errors: AccommodationErrors;
  touched: Partial<Record<keyof AccommodationValues, boolean>>;
  handleChange: (field: keyof AccommodationValues, value: string) => void;
  handleBlur: (field: keyof AccommodationValues) => void;
  isValid: boolean;
  type: string;
  setType: (value: string) => void;
  handleAddPhotos: (files: FileList | File[]) => void;
  photos: Photo[];
}

function Accommodation({
  handleSubmit,
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  isValid,
  type,
  setType,
  handleAddPhotos,
  photos,
}: Props) {
  const onFilesSelected: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const inputEl = e.currentTarget;
    const fileList = inputEl.files;
    if (!fileList) return;

    const files = Array.from(fileList);
    const validFiles: File[] = [];
    let processed = 0;

    files.forEach((file) => {
      const objectUrl = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        processed++;
        if (img.width <= MAX_IMAGE_PX && img.height <= MAX_IMAGE_PX) {
          validFiles.push(file);
        } else {
          alert(
            ` ${file.name} exceeds the allowed size (maximum 500x500 pixels)`,
          );
        }
        URL.revokeObjectURL(objectUrl);
        if (processed === files.length) {
          if (validFiles.length > 0) {
            handleAddPhotos(validFiles);
          }
          inputEl.value = '';
        }
      };
      img.src = objectUrl;
    });
  };

  return (
    <form onSubmit={(e) => handleSubmit(e, 2)} className="form">
      <h2 className="title">Accommodation</h2>
      <InputComponent
        value={values.name}
        setValue={(val) => handleChange('name', val)}
        label="Name *"
        required={true}
        error={errors.name}
        touched={touched.name}
        onBlur={() => handleBlur('name')}
      />
      <InputComponent
        value={values.address}
        setValue={(val) => handleChange('address', val)}
        label="Address *"
        required={true}
        error={errors.address}
        touched={touched.address}
        onBlur={() => handleBlur('address')}
      />
      <InputComponent
        value={values.description}
        setValue={(val) => handleChange('description', val)}
        label="Description"
        required={false}
        error={errors.description}
        touched={touched.description}
        onBlur={() => handleBlur('description')}
      />
      <SelectComponent
        type={type}
        setType={setType}
        label="Type *"
        options={TYPE_OPTIONS}
        touched={touched.type}
        error={errors.type}
        handleBlur={handleBlur}
      />
      <div>
        <label className="block text-sm font-medium mb-1 text-blue-700">
          Photos
        </label>

        <div className="flex gap-3 flex-wrap">
          <PhotoComponent photos={photos} />
          {photos.length < MAX_PHOTOS && (
            <>
              <input
                id="photo-upload"
                type="file"
                accept={ACCEPTED_IMAGE_TYPES}
                multiple
                onChange={onFilesSelected}
                className="hidden"
              />

              <label
                htmlFor="photo-upload"
                className="w-24 h-20 flex items-center justify-center rounded-lg border border-blue-200 bg-white text-blue-700 hover:bg-blue-50 shadow-sm cursor-pointer"
              >
                Add Photo
              </label>
            </>
          )}
        </div>
      </div>
      <button type="submit" className="mt-2 btn-primary" disabled={!isValid}>
        Next
      </button>
    </form>
  );
}

export default Accommodation;
