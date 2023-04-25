import React, { ReactNode, createContext, useState } from 'react'

export interface IDevice{
  id: number,
  name: string,
  model: string,
  description: string,
  url: string,
  category_id: number
}

export type DevicesContextType = {
  devices: IDevice[],
  setDevices: (devices: IDevice[]) => void,
  selectedDevice: IDevice,
  setSelectedDevice: (selectedDevice: IDevice) => void
}

interface DevicesContextProviderProps{
  children: ReactNode
}

export const DevicesContext = createContext<DevicesContextType | null>(null);

export const DevicesContextProvider = ({children} : DevicesContextProviderProps) => {
  const [devices, setDevices] = useState<IDevice[]>([])
  const [selectedDevice, setSelectedDevice] = useState<IDevice>(null!);

  return (
    <DevicesContext.Provider value={{devices, setDevices, selectedDevice, setSelectedDevice}}>
      {children}
    </DevicesContext.Provider>
  )
}
