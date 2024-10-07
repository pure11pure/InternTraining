import axios from "axios";
import { NextResponse } from "next/server";


const BASE_URL = "http://localhost:3001/blogs";

export async function GET() {
    try {
        const res = await axios.get(`${BASE_URL}`)
        return NextResponse.json(res.data);
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const data = await req.json();
        const res = await axios.post(`${BASE_URL}`, data )
        console.log("POST",res.data)
        return NextResponse.json(res.data);
    } catch (error) {
        console.error("Error create blogs:", error);
        return NextResponse.json({ error: 'Failed to create blogs' }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const data = await req.json();
        console.log(data)
        const res = await axios.delete(`${BASE_URL}/${data.id}`)
        console.log("Delete",res.data)
        return NextResponse.json(res.data);
    } catch (error) {
        console.error("Error delete blogs:", error);
        return NextResponse.json({ error: 'Failed to delete blogs' }, { status: 500 });
    }
}