import '../popup.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import React, { useState } from "react";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiFillDelete, AiOutlineClose } from 'react-icons/ai'
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'; 
import {toast} from 'react-toastify'
import { get } from 'http';


interface CaloriIntakePopupProps {
  setShowCalorieIntakePopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const CalorieIntakePopup: React.FC< CaloriIntakePopupProps > = ({ setShowCalorieIntakePopup }) => {
  const color = '#ffc20e'
  const [date, setDate] = useState(dayjs(new Date()));
  const [time, setTime] = useState(dayjs(new Date()));

  const[calorieIntake, setCalorieIntake] = useState<any>({
    item: '',
    date: '',
    quantity: '',
    quantityty  : 'g'
  })

  const[items, setItems] = useState<any>([])

  const saveCalorieIntake = async() => {
    let tempdate = date.format('YYYY-MM-DD')
    let temptime = time.format('HH:mm:ss')
    let tempdatetime = tempdate + ' ' + temptime
    let finaldatetime = new Date(tempdatetime)

    console.log(finaldatetime+ ' finaldatetime');

    fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/CalorieIntake/addcalorieintake', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        item: calorieIntake.item,
        date: finaldatetime,
        quantity: calorieIntake.quantity,
        quantitytype: calorieIntake.quantitytype
      })
    })
    .then(res => res.json())
    .then(data => {
      if(data.ok) {
        toast.success("Calorie intake added successfully")
        getCalorieIntake()
      } else {
        toast.error("Error in adding calorie intake")
      }
    })
    .catch(err => {
      toast.error("Error in adding calorie intake")
      console.log(err);
    })
  }
  const getCalorieIntake = async() => {
    setItems([])
    fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/CalorieIntake/getcalorieintakebydate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        date:date
      })
    })
    .then(res => res.json())
    .then(data => {
      if(data.ok) {
        console.log(data.data);
        setItems(data.data)
      } else {
        toast.error("Error in getting calorie intake")
      }
    })
    .catch(err => {
      toast.error("Error in getting calorie intake")
      console.log(err);
    })
  }
  const deleteCalorieIntake = async(item:any) => {
    fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/CalorieIntake/deletecalorieintake', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        item:item.item,
        date:item.date,
      })
    })
    .then(res => res.json())
    .then(data => {
      if(data.ok) {
        toast.success("Calorie intake item delete add successfully")
        getCalorieIntake()
      } else {
        toast.error("Error in deleten calorie intake")
      }
    })
    .catch(err => {
      toast.error("Error in deleting calorie intake")
      console.log(err);
    })
  }


  React.useEffect(() => {
    getCalorieIntake()
  }, [date])

  const selectedDay = (val: any) => {
    setDate(val)
  };

  return (
    <div className='popupout'>
      <div className="popupbox">
          <button className='close'
              onClick={() => {
                setShowCalorieIntakePopup(false)
              }}
            >
              <AiOutlineClose />
          </button>


        
        {/* <DatePicker selected={date} onChange={(date: Date | null) => date && setDate(date)} /> */}

        
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Select date"
              value={date}
              onChange={(newValue: any) => {
                  selectedDay(newValue);
              }}
            />  
          </LocalizationProvider>

          <TextField id="outlined-basic" label="Food item name" variant="outlined" color='warning'
             onChange={(e) => {
              setCalorieIntake({...calorieIntake, item: e.target.value})
             }} 
          />

          <TextField id="outlined-basic" label="Food item amount (in gms)" variant="outlined" color="warning" type="number"
              onChange={(e) => {
                  setCalorieIntake({...calorieIntake, quantity: e.target.value})
              }} 
          />
          
          <div className='timebox'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label="Select time"
                value={time}
                onChange={(newValue:any) => 
                  setTime(newValue)}
              />
            </LocalizationProvider>
          </div>
          
          <Button variant='contained' color='warning' 
              onClick={saveCalorieIntake}
          >Save</Button>
         
         <div className="hrline"></div>
         <div className="items">
                  {
                    items.map((item: any) => {
                      return (
                        <div className='item' >
                          <h3>{item.item}</h3>
                          <h3>{item.quantity} {item.quantitytype}</h3>
                          <button onClick={() => deleteCalorieIntake(item)}>
                            <AiFillDelete /></button>
                          </div>
                      )
                    })
                  }
         </div>
      </div>
    </div>
  )
}

export default CalorieIntakePopup