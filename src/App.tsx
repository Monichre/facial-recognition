import './App.css'

import { useCallback, useEffect } from 'react'

declare global {
  interface Window {
    faceIO: any
  }
}
function App() {
  let faceio: any
  useEffect(() => {
    // @ts-ignore
    faceio = new faceIO('fioaff6a') /* Your application Public ID */
  }, [])

  const signUp = useCallback(async () => {
    try {
      let response = await faceio.enroll({
        locale: 'auto',
        payload: {
          email: 'example@gmail.com',
          pin: '12345',
        },
      })

      console.log(` Unique Facial ID: ${response.facialId}
    Enrollment Date: ${response.timestamp}
    Gender: ${response.details.gender}
    Age Approximation: ${response.details.age}`)
    } catch (error) {
      console.log(error)
    }
  }, [faceio])

  const signIn = useCallback(async () => {
    try {
      let response = await faceio.authenticate({
        locale: 'auto',
      })
      console.log('response: ', response)

      console.log(` Unique Facial ID: ${response.facialId}
          PayLoad: ${response.payload}
          `)
    } catch (error) {
      console.log(error)
    }
  }, [faceio])

  return (
    <div className='App'>
      <h1>Facial Recognition</h1>
      <div className='card'>
        <button onClick={signUp}>Sign Up with Face ID</button>

        <button onClick={signIn}>Sign In with Face ID</button>
      </div>
    </div>
  )
}

export default App
