import { setupWorker } from 'msw';
import { handlers } from './handlers'; // ฟังก์ชันสำหรับสร้าง handlers ของคุณ

export const worker = setupWorker(...handlers);
