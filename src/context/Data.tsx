// import React, {useState, useEffect} from "react"

// const Context = React.createContext()

// function ContextProvider({children}) {
//     const [allPhotos, setAllPhotos] = useState([])
//     const [user, setUser] = useState({
//         name: '',
//         email: '',
//         saveInfo: false,
//         date_created: new Date(),
//     })
     
//     // Local Storage: setting & getting data
//     useEffect(() => {
//         const userData = JSON.parse(localStorage.getItem('user'))
        
//         if (userData) {
//             setuUer(userData)
//         }
//     }, [])
    
//     useEffect(() => {
//         localStorage.setItem('user', JSON.stringify(user))
//     }, [user])

//     return (
//         <Context.Provider value={{}}>
//             {children}
//         </Context.Provider>
//     )
// }