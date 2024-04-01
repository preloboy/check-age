import React, { useState } from 'react'
import arrow from '../src/assets/images/icon-arrow.svg'
import './App.css'

interface FormData {
  date: number;
  month: number;
  year: number;
}

function App() {

  const [age, setAge] = useState({
    days: '--',
    months: '--',
    years: '--',
  })

  const [formData, setFormData] = useState<FormData>({
    date: 19,
    month: 8,
    year: 1999,
  })

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  function handleClick(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault(); // Prevents default form submission behavior
    console.log("Working");
    const { date, month, year } = formData;
    // if (formData.date === 0 && formData.month === 0 && formData.year === 0) {
      // All are 0
      const dob = new Date(year, month - 1, date)
      const today = new Date();

      let years = today.getFullYear() - dob.getFullYear();
      let months = today.getMonth() - dob.getMonth();
      let days = today.getDate() - dob.getDate();

      // Adjust months and years if the current month and day are before the birth month and day
      if (months < 0 || (months === 0 && days < 0)) {
        years--;
        months += 12;
      }
      // Adjust days if the current day is before the birth day
      if (days < 0) {
        const pMonth = new Date(today.getFullYear(), today.getMonth() - 1, 0);
        days += pMonth.getDate();
        months--;
      }

      
      setAge({
        days: days.toString(),
        months: months.toString(),
        years: years.toString()
      });

    // } else{
    //   console.log("Check your Inputs")
    // }
  }
  return (
    <>
      <div className="bg-main d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="box-design card p-3">
          <form onSubmit={handleClick}>
            <div className="input-box d-flex gap-3 px-3 w-75">
              <div className="mb-3">
                <label className="form-label d-flex">DAY</label>
                <input type="text" className="form-control p-2" placeholder="DD" name="date" value={formData.date} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="form-label d-flex">MONTH</label>
                <input type="text" className="form-control p-2" placeholder="MM" name="month" value={formData.month} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="form-label d-flex">YEAR</label>
                <input type="text" className="form-control p-2" placeholder="YYYY" name="year" value={formData.year} onChange={handleChange} />
              </div>
            </div>
            <div className="d-flex align-items-center px-3">
              <div style={{ width: '85%' }}>
                <svg height="50" width="100%" xmlns="http://www.w3.org/2000/svg">
                  <line x1="0" y1="50%" x2="100%" y2="50%" style={{ stroke: 'black', width: 1 }} />
                  Sorry, your browser does not support inline SVG.
                </svg>
              </div>
              <button type="submit" className="btn p-0 rounded-circle">
                <img className="button-img rounded-circle p-2" src={arrow} alt="Arrow" />
              </button>
            </div>
          </form>
          {/* <span>{formData.date}-{formData.month}-{formData.year}</span> */}
          <div className="output px-3">
            <h1><span className="out">{age.years}</span> years</h1>
            <h1><span className="out">{age.months}</span> months</h1>
            <h1><span className="out">{age.days}</span> days</h1 >
          </div >
        </div >
      </div >
      <div className="attribution position-absolute start-50 translate-middle" style={{ top: '95%' }}>
        Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank" rel="noopener noreferrer">Frontend Mentor</a>.
        Coded by <a href="https://github.com/preloboy/">Prelo Tulshi</a>.
      </div>
    </>
  )
}

export default App
