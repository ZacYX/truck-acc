export default function ContactPage() {
  return (
    <div>
      <div className="relative-box min-h-[50vh] bg-[url('/images/rooftop-tent.jpg')] bg-center bg-cover">
        <div className="content-box ">
          <p className="text-zinc-200 text-7xl font-bold">We are waiting for you!</p>
        </div>
      </div>
      <div className="relative-box">
        <div className="content-box flex-col">
          <p>Need any help to choose the right tent? Our team is here to help you.</p>
          <label className="input input-bordered flex items-center gap-2">
            Name
            <input type="text" className="grow" placeholder="Your name ..." />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Email
            <input type="text" className="grow" placeholder="Your email ..." />
          </label>
        </div>
      </div>
    </div >
  );
}
