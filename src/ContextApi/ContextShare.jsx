import React, { createContext, useState } from 'react'

export const addProjectResponseContext = createContext()
export const editUserProjectResponseContext = createContext()
function ContextShare({children}) {

    const [ addProjectRes , setAddProjectRes] = useState("")
    const [editUserProjectRes , setEditUserProjectRes ] = useState("")
  return (
    <div>
        <addProjectResponseContext.Provider value={{addProjectRes , setAddProjectRes}}>
          <editUserProjectResponseContext.Provider value={{editUserProjectRes,setEditUserProjectRes}}>
          {children}
          </editUserProjectResponseContext.Provider>
        </addProjectResponseContext.Provider>
    </div>
  )
}

export default ContextShare