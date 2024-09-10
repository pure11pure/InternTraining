export async function GET(
    request: Request,
    { params }: { params: { id: string } }
  ) {
    return Response.json({
        name : 'pure',
        id: params.id
    })
  }