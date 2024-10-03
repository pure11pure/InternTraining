import { useRef, useEffect } from "react";

export default function VideoPlayer({ src, isPlaying }) {
  const ref = useRef(null);

  //   useEffect จะทำงานทุกรอบที่ isPlaying มีการเปลี่ยนแปลง
  //   แต่ก็มีการดักจับ event การเปลี่ยนแปลง
  useEffect(() => {
    // ต้องการใข้ ref หลังจากที่ component render ออกมาแล้ว
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }, [isPlaying]);

  //   และถ้าต้องการให้ run แค่ครั้งเดียว ให้ใช้เป็น []
  //   useEffect(() => {
  //     if (isPlaying) {
  //       ref.current.play();
  //     } else {
  //       ref.current.pause();
  //     }
  //   }, []);

  return <video ref={ref} src={src} loop playsInline />;
}
// แต่ถ้า video ยังไม่สามารถเล่นได้ ให้ลองการ action อะไรก็ได้
