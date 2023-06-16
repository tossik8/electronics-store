import React, { ReactNode, createContext, useEffect, useState } from 'react'

export interface IDevice{
  id: number,
  name: string,
  model: string,
  description: string,
  url: string,
  price: string,
  category_id: number,
  quantity?: number
}

export type DevicesContextType = {
  devices: IDevice[],
  setDevices: (devices: IDevice[]) => void,
  selectedDevice: IDevice,
  setSelectedDevice: (selectedDevice: IDevice) => void,
  cart: IDevice[],
  setCart: (cart: IDevice[]) => void
}

interface DevicesContextProviderProps{
  children: ReactNode
}

export const DevicesContext = createContext<DevicesContextType>(null!);

export const DevicesContextProvider = ({children} : DevicesContextProviderProps) => {
  const [devices, setDevices] = useState<IDevice[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<IDevice>(null!);
  const [cart, setCart] = useState<IDevice[]>([]);
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if(storedCart){
      setCart(JSON.parse(storedCart));
    }
  }, []);

  return (
    <DevicesContext.Provider value={{devices, setDevices, selectedDevice, setSelectedDevice, cart, setCart}}>
      {children}
    </DevicesContext.Provider>
  )
}