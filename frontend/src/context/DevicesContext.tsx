import React, { ReactNode, createContext, useState } from 'react'

interface DevicesContextProps{
    devices: object[],
    setDevices: (i: object[]) => void,
    selectedDevice: object|null,
    setSelectedDevice: (i: object) => void
}

export const DevicesContext = createContext<DevicesContextProps|null>(null);

interface DevicesContextProviderProps{
    children: ReactNode
}

export const DevicesContextProvider = ({children} : DevicesContextProviderProps) => {
    const [devices, setDevices] = useState<object[]>([]);

    const [selectedDevice, setSelectedDevice] = useState<object|null>(null);

  return (
    <DevicesContext.Provider value={{devices, setDevices, selectedDevice, setSelectedDevice}}>{children}</DevicesContext.Provider>
  )
}
