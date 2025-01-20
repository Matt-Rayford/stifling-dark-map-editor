import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CreateMapDocument } from '../../graphql/__generated__/graphql';
import { useTour } from '@reactour/tour';
import { useSdUser } from '../../contexts/user-context';

interface Props {
  onCreated: (mapId: string) => void;
}

export const MapForm = ({ onCreated }: Props) => {
  const { user } = useSdUser();
  const { setIsOpen } = useTour();
  const [title, setMapTitle] = useState('');
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [createMap] = useMutation(CreateMapDocument);

  useEffect(() => {
    setIsOpen(false);
  }, []);

  const handleSubmit = () => {
    if (user?.email && title) {
      createMap({
        variables: { title, email: user.email },
        onCompleted: (data) => {
          if (data?.map) {
            onCreated(data.map.id);
          }
        },
      });
    }
  };

  return (
    <form style={{ paddingTop: '32px' }} className="content-container">
      <h1>Create a New Map</h1>
      <div className="form-row">
        <div className="col-md-12">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">Map Title</span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Title..."
              required
              onChange={(e) => setMapTitle(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="form-row" style={{ paddingTop: '16px' }}>
        <div className="col-md-12">
          <button
            className="btn btn-primary w-100"
            type="button"
            disabled={!title || title.length === 0}
            onClick={handleSubmit}
          >
            Create
          </button>
        </div>
      </div>
    </form>
  );
};
