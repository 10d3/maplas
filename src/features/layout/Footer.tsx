
export default function Footer() {
  return (
    <footer className="w-full flex items-center justify-center flex-col md:flex-row">
        <div className="w-full md:w-1/3 items-center flex flex-col md:flex-row">
            <div>logo</div>
            <div>newsletter</div>
        </div>
        <div className="w-full md:w-2/3 items-center flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/4 items-center flex flex-col gap-4">
                <h1>Quick link</h1>
                <div>link</div>
            </div>
            <div className="w-full md:w-1/4 items-center flex flex-col gap-4">
                <h1>Quick link</h1>
                <div>link</div>
            </div>
            <div className="w-full md:w-1/4 items-center flex flex-col gap-4">
                <h1>Quick link</h1>
                <div>link</div>
            </div>
            <div className="w-full md:w-1/4 items-center flex flex-col gap-4">
                <h1>Quick link</h1>
                <div>link</div>
            </div>
        </div>
    </footer>
  )
}
