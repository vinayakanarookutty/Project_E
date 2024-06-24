

export function AuthLayout(
  { children }: { children: React.ReactNode }
) {
  return (
    <div className="w-full lg:grid  lg:grid-cols-2 h-screen overflow-hidden">
      <div className="flex h-full items-center justify-center">
        {children}
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src="https://images-ext-1.discordapp.net/external/qBpaXGP1_P6Qb1m6HFcbmlFBmqSEJtsQ3I83oawg714/https/images.playground.com/98afaaeebc0643e893a6cca873492a83.jpeg?format=webp"
          alt="Image"
          className="object-cover h-screen w-full"
        />
      </div>
    </div>
  )
}
