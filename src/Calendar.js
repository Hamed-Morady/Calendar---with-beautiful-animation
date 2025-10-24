import { useState,useEffect } from "react";
import "./main.css";

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
const getToday = () => {
  const now = new Date();
  return {
    day: now.getDate(),
    month: now.getMonth(),
    year: now.getFullYear(),
  };
};
export default function Calendar() {
  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth());
  const [season, setSeason] = useState('');
  const [loadImage,setLoadImage]=useState('')
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = new Date(year, month, 1).getDay();
  const [clicked, setClicked] = useState(false);
  useEffect(() => {
    const backGroundSelect = () => {
      if (month <= 2) {
        setSeason("/images/Spring season nature wallpaper.jpg");
      }else if(month <= 5){
        setSeason('/images/Summer beach wallpapers HD for desktop.jpg');
      }else if(month <= 8){
        setSeason("/images/download (1).jpg");
      }else if(month <= 11){
        setSeason("/images/Winter.jpg");
      }
    };
    backGroundSelect()
  }, [month]);
  useEffect(() => {
    const img = new Image()
    img.src = season
    img.onload=()=>setLoadImage(season)
  }, [season]);
  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };
    setVh();
    window.addEventListener('resize', setVh);
    return () => window.removeEventListener('resize', setVh);
  }, []);
  
  const days = [];
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }
  
  const years = [];
  for (let y = 2010; y <= 2050; y++) {
    years.push(y);
  }
  const blanks = Array(firstDay).fill(null);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = getToday();
  const handleClick = (e) => {
    e.preventDefault();
    setClicked(true);
  };
  const now = new Date();
  let weekDay = now.getDay();

  return (
    <div id="wrapper">
      <h1>Calendar</h1>
      <div className="calendar-box" style={{ backgroundImage: `url('${loadImage}')`, transition: 'background-image 0.5s ease-in-out' }}>
        <div
          className={`main ${clicked ? 'main-show' : ''}`}
        >
          <div
            className={`data-text ${clicked ? 'data-text-clicked' : ''}`}
            onClick={handleClick}
          >
            <span className="text">{today.day}</span>
            <span className="text-week">{weekDays[weekDay]}</span>
            <span className="text-month">{months[today.month].slice(0,3)}</span>
          </div>
        </div>
        <div
          className={`content ${clicked ? 'content-show' : ''}`}
        >
          <div className="calendar">
            <div className="calendar-header">
              <select
                id="year"
                name="year"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
              >
                {Array.from({ length: 50 }, (_, i) => 2010 + i).map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
              <select
                id="month"
                name="month"
                value={month}
                onChange={(e) => setMonth(Number(e.target.value))}
              >
                {months.map((mon, i) => (
                  <option key={i} value={i}>
                    {mon}
                  </option>
                ))}
              </select>
            </div>
            <div className="calendar-grid">
              {weekDays.map((wd, i) => (
                <div key={i} className="day-name">
                  {wd}
                </div>
              ))}
              {blanks.map((_, i) => (
                <div key={`b${i}`} className="day-box empty"></div>
              ))}
              {days.map((dy, i) => {
                const isToday =
                  dy === today.day &&
                  month === today.month &&
                  year === today.year;
                return (
                  <div key={i} className={`day-box ${isToday ? "today" : ""}`}>
                    {dy}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
