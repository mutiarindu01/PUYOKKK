"use client"

import * as React from "react"
import { useFormContext } from "react-hook-form"

interface FormFieldProviderProps {
  children: React.ReactNode
}

function FormFieldProvider({ children }: FormFieldProviderProps) {
  const { control, formState } = useFormContext()

  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            control,
            formState,
          })
        }

        return child
      })}
    </>
  )
}

export { FormFieldProvider }
