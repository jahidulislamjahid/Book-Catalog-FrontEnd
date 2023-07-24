
function App() {

  return (
    <>
      <div className="grid grid-cols-4 gap-4, m-2 p-3 bg-gray-50">
        <h1 className="text-3xl font-semibold text-cyan-500 text-center">
          this is a heading
        </h1>
        <div className="card w-96 glass">
          <figure><img src="https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/d9245a6cf_50507.jpg" alt="car!" /></figure>
          <div className="card-body">
            <h2 className="card-title">Life hack</h2>
            <p>How to park your car at your garage?</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Learn now!</button>
            </div>
          </div>
        </div>
        <div className="card card-side bg-base-100 shadow-xl glass mb-5">
          <figure><img src="https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/d9245a6cf_50507.jpg" alt="Movie" /></figure>
          <div className="card-body">
            <h2 className="card-title text-white">New movie is released!</h2>
            <p>Click the button to watch on Jetflix app.</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Watch</button>
            </div>
          </div>
        </div>
        <h1>this is another test</h1>
        <div className="card card-side bg-white shadow-xl hover:scale-105 hover:duration-500 rounded-lg">
          <figure><img src="https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/d9245a6cf_50507.jpg" alt="Movie" /></figure>
          <div className="card-body">
            <h2 className="card-title">Chakrabak</h2>
            <p>Id: B-1002</p>
            <p>Author: Kai Najrul Islam</p>
            <p>Genre: Novel</p>
            <p>Price: 1234</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary rounded-md">Watch</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
