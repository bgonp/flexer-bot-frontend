import React from 'react'
import { RepliersContextProvider } from 'context/RepliersContext'
import { TmiForm } from 'components/TmiForm'
import { Repliers } from 'components/Repliers'
import { Navbar } from 'components/Navbar'

export const MainPage = () => {
  return (
    <RepliersContextProvider>
      <Navbar />
      <TmiForm />
      <Repliers />
    </RepliersContextProvider>
  )
}
