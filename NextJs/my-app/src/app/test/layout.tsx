export default function TestLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section>
            <div>Sub Header</div>
            {children}
        </section>
    )
}