import React, { useState } from 'react';
import {
    Button,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    FormHelperText
} from "@material-ui/core";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { checkEventTypeValidation, checkEventLocationValidation, checkGenderValidation } from '../helpers/commonValidation';
import Header from './header';

import {http} from '../helpers/httpService';

const AddEvent = (props) => {

    const [eventType, setEventType] = useState('');
    const [eventTypeError, setEventTypeError] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    const [eventLocationError, setEventLocationError] = useState('');
    const [gender, setGender] = useState('');
    const [genderError, setGenderError] = useState('');
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
    const [imageUpload, setImageUpload] = useState('');

    const events = ['Marriage', 'Engagement', 'Birthday'];
    const eventLocations = ['Jaipur', 'Delhi', 'Gurgaon', 'Noida'];
    const genders = ['Male Only', 'Female Only']

    const handleDateChange = date => {
        setSelectedDate(date);
      };

    const handleCreateEvent = () => {
            const data = {
                'type' : eventType,
                'image' : imageUpload,
                'location' : eventLocation,
                'data' : selectedDate,
                'genederAllowed' : gender
            }
            

            http.post('http://localhost:5000/api/event/add', data).then(res => {
                props.history.push('/event-list');
                
            }).catch(error => {
                console.log(error);                
            });
      }

      const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);   
        reader.onerror = error => reject(error);
    });

      const onChange = async (e) => {
        const image = await toBase64(e.target.files[0]);
        setImageUpload(image);
    }

    return (<React.Fragment>
        <Header type='list'/>
        <FormControl error={eventTypeError ? true : null} variant="outlined" className="opening-box" style={{
            width: '50%',
            padding: '20px'
        }}>
            <InputLabel htmlFor="filled-jobType-simple">Event Type</InputLabel>
            <Select
                value={eventType}
                onChange={e => setEventType(e.target.value)}
                onBlur={e => { setEventTypeError(checkEventTypeValidation(e.target.value)) }}
                inputProps={{
                    name: 'eveny',
                    id: 'filled-exp-simple',
                }}
            >
                {
                    events.map(event => {
                        return <MenuItem value={event}>{event}</MenuItem>
                    })
                }
            </Select>
            {eventTypeError ? <FormHelperText >Event Type is Required</FormHelperText> : null}
        </FormControl>
        <FormControl error={eventLocationError ? true : null} variant="outlined" className="opening-box" style={{
            width: '50%',
            padding: '20px'
        }}>
            <InputLabel htmlFor="filled-jobType-simple">Event Location</InputLabel>
            <Select
                value={eventLocation}
                onChange={e => setEventLocation(e.target.value)}
                onBlur={e => { setEventLocationError(checkEventLocationValidation(e.target.value)) }}
                inputProps={{
                    name: 'eveny',
                    id: 'filled-exp-simple',
                }}
            >
                {
                    eventLocations.map(eventLoc => {
                        return <MenuItem value={eventLoc}>{eventLoc}</MenuItem>
                    })
                }
            </Select>
            {eventLocationError ? <FormHelperText >Event Location is Required</FormHelperText> : null}
        </FormControl><br />
        <FormControl error={genderError ? true : null} variant="outlined" className="opening-box" style={{
            width: '50%',
            padding: '20px'
        }}>
            <InputLabel htmlFor="filled-jobType-simple">Gender</InputLabel>
            <Select
                value={gender}
                onChange={e => setGender(e.target.value)}
                onBlur={e => { setGenderError(checkGenderValidation(e.target.value)) }}
                inputProps={{
                    name: 'eveny',
                    id: 'filled-exp-simple',
                }}
            >
                {
                    genders.map(gender => {
                        return <MenuItem value={gender}>{gender}</MenuItem>
                    })
                }
            </Select>
            {genderError ? <FormHelperText >Gender is Required</FormHelperText> : null}
        </FormControl><br />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date picker dialog"
          format="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          style={{paddingRight: '20px'}}
        />
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="Time picker"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        /><br />
        </MuiPickersUtilsProvider>
        <Button
            variant="contained"
            component="label"
            style={{ margin:'10px'}}
        >
            Upload Event Image
  <input
                type="file"
                style={{ display: "none" }}
                accept=".png,.jpg,.jpeg"
                onChange={e => {
                    onChange(e);
                }}
            />
        </Button><br />
        <Button
            variant="contained"
            component="label"
            onClick={handleCreateEvent}
        >
            Create Event
        </Button>
    </React.Fragment>);
}

export default AddEvent;