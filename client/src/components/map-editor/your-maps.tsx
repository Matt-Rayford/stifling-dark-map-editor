import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Plus } from 'react-bootstrap-icons';
import { useQuery } from '@apollo/client';
import { useTour } from '@reactour/tour';
import {
  LoadMapsDocument,
  Map as SDMap,
} from '../../graphql/__generated__/graphql';
import { useSdUser } from '../../contexts/user-context';
import { SignInButton, useUser } from '@clerk/clerk-react';
import { MapEditor } from './map-editor';
import { MapForm } from './map-form';

export const YourMaps = () => {
  const [maps, setMaps] = useState<Pick<SDMap, 'id' | 'title'>[]>([]);

  const navigate = useNavigate();

  const { setIsOpen } = useTour();

  const { isSignedIn } = useUser();
  const { user } = useSdUser();

  const [searchParams, setSearchParams] = useSearchParams();
  const mapId = searchParams.get('mapId');
  const newMap = searchParams.get('newMap');

  const {
    data,
    loading: mapsLoading,
    refetch,
  } = useQuery(LoadMapsDocument, {
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (!mapsLoading && isSignedIn) {
      if (data?.maps) {
        setMaps(data.maps.filter((m) => !!m));
      }
    }
  }, [data, mapsLoading, isSignedIn]);

  useEffect(() => {
    if (!mapId) {
      refetch();
    }
  }, [mapId]);

  if (user && !user.viewedSetup) {
    setIsOpen(true);
  } else {
    setIsOpen(false);
  }

  return (
    <div className="content-container">
      {!isSignedIn && (
        <div>
          <h1>
            Create an account or login to use the Stifling Dark Map Editor
          </h1>
          <p>
            <SignInButton>
              <button className="btn btn-primary">
                Create Account / Login
              </button>
            </SignInButton>
          </p>
        </div>
      )}
      {isSignedIn && !mapId && (
        <div id="your-maps" className="content-container">
          <h1>Your Maps</h1>
          {maps.map((mapData: any) => {
            return (
              <button
                key={mapData.id}
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  searchParams.delete('newMap');
                  searchParams.set('mapId', mapData.id);
                  setSearchParams(searchParams);
                }}
                style={{ marginRight: '15px' }}
              >
                {mapData.title}
              </button>
            );
          })}

          <button
            className="btn btn-primary"
            type="button"
            onClick={() => {
              searchParams.delete('mapId');
              searchParams.set('newMap', 'true');
              setSearchParams(searchParams);
            }}
            style={{ height: '38px' }}
          >
            <Plus width={24} height={24} /> New Map
          </button>
        </div>
      )}
      {isSignedIn && mapId && <MapEditor mapId={mapId} />}
      {isSignedIn && newMap && (
        <MapForm
          onCreated={(mapId: string) => {
            searchParams.delete('newMap');
            searchParams.set('mapId', mapId);
            setSearchParams(searchParams);
          }}
        />
      )}
    </div>
  );
};
