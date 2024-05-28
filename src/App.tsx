import { useEffect, useState } from 'react';
import './App.css'
import { socket } from './features/socket';
import { Buffer } from "buffer";

function App() {
  const [img, setImg] = useState<string>('');
  useEffect(() => {
    socket.connect();
    function onData(image: string) {
      setImg(Buffer.from(image, 'base64').toString())
    }
    function onData2(image: string) {
      console.log('test2');
      // setImg(Buffer.from(image, 'base64').toString())
    }

    function onConnect() {
      console.log('connected');
    }

    function onDisconnect() {
      console.log('disconnected');
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('test', onData);
    socket.on('test2', onData2);


    return () => {
      socket.disconnect()
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('test', onData);
      socket.off('test2', onData);

    };
  }, []);

  return (
    <>
      <div>test stream</div>
      <img src={`data:image/jpeg;base64,${img}`} width={640} height={480} />
      {/* <img src={`http://127.0.0.1:3002/camera1`} width={640} height={480} /> */}
    </>
  )
}

export default App
