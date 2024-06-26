"use client"

import { useRef, useState, useEffect ,useCallback } from "react";
import Webcam from 'react-webcam';

import { IoMdClose } from "react-icons/io";
import { FaCamera } from "react-icons/fa";
import { MdCameraswitch } from "react-icons/md";

import styles from './camera.module.css';


interface VideoConstraints {
  width: number;
  height: number;
  facingMode: string | { exact: string };
}


export function Camera({ isCaptureEnabled, setCameraStartButton, setCaptureEnabled, setImgUrl }: { isCaptureEnabled: boolean, setCameraStartButton: any ,setCaptureEnabled: any, setImgUrl: any }) {
    const [videoConstraints, setVideoConstraints] = useState<VideoConstraints>({
      width: 500,
      height: 900,
      facingMode: "user",
    });
    
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth <= 600) { // モバイルの場合
          setVideoConstraints({
            width: 500,
            height: 900,
            facingMode: { exact: "environment" },
          });
        } else { // PCの場合
          setVideoConstraints({ // 文字列型
            width: 900,
            height: 500,
            facingMode: "user",
          });
        }
      };
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    const switchCamera = () => {
      setVideoConstraints(prevConstraints => ({
          ...prevConstraints,
          facingMode: prevConstraints.facingMode === "user" ? { exact: "environment" } : "user"
      }));
    };
  
    const webcamRef = useRef<Webcam>(null);
    const capture = useCallback(() => {
      const imageSrc = webcamRef.current?.getScreenshot();
      setCaptureEnabled(false);
      if (imageSrc) {
        setImgUrl(imageSrc);
      }
    }, [webcamRef]);
  
    return (
      <>
        {isCaptureEnabled && (
          <>
            <div style={{position: "relative"}}>
                <Webcam
                    className={styles.camera}
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                />

                <button onClick={() => {setCaptureEnabled(false), setCameraStartButton(true)}} // カメラ閉じる
                    style={{
                        position: 'absolute',
                        top: '10px', // 位置を調整
                        left: '10px', // 位置を調整
                    }}>
                    <div className=" rounded-md border bg-gray-700 px-1 py-1 text-white">
                        <IoMdClose size={15} />
                    </div>
                </button>

                <button onClick={() => {switchCamera()}} // カメラ切り替え
                    style={{
                        position: 'absolute',
                        top: '10px', // 位置を調整
                        left: '55px', // 位置を調整
                    }}>
                    <div className=" rounded-md border bg-gray-700 px-1 py-1 text-white">
                        <MdCameraswitch size={15} />
                    </div>
                </button>
            </div>

            <button className ={`${styles.shapeWidht} bg-black px-6 py-4 font-semibold text-white`}
                    onClick={capture}>
                <div className="flex items-center justify-center">
                        <FaCamera/>
                </div>
            </button>
          </>
          
        )}
      </>
    );
  };

