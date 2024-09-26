import { useRef, useEffect } from "react";

export default function VideoPlayer({ src, isPlaying }) {
  const ref = useRef(null);

  useEffect(() => {
    // ต้องการใข้ ref หลังจากที่ component render ออกมาแล้ว
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  });

  return <video ref={ref} src={src} loop playsInline />;
}
// แต่ถ้า video ยังไม่สามารถเล่นได้ ให้ลองการ action อะไรก็ได้