import React, {
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

type MapLayersContextType = {
  user: {[key: string]: any} | null;
  setUser: Dispatch<SetStateAction<{[key: string]: any} | null>>;
};

const MapLayersContext = createContext<MapLayersContextType | undefined>(
  undefined,
);

function useMapLayers(): MapLayersContextType {
  const context = useContext(MapLayersContext);
  if (!context) {
    throw new Error('useMapLayers must be used within an MapLayersProvider');
  }
  return context;
}

const MapLayersProvider = (props: {children: ReactNode}): ReactElement => {
  const [user, setUser] = useState<{[key: string]: any} | null>(null);

  return <MapLayersContext.Provider {...props} value={{user, setUser}} />;
};

export {MapLayersProvider, useMapLayers};
