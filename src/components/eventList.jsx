import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Header from './header';
import { http } from '../helpers/httpService';
const EventList = () => {

    const [eventData, setEventData] = useState([]);

    const useStyles = makeStyles({
        root: {
            minWidth: 275,
        },
        bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },
    });

    const handleScroll = () =>  {
        //console.log('asdas');
        if(window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight){
            return 
        } else{
            console.log('at the end')
        }
        console.log(window.innerHeight);
        console.log(document.documentElement.scrollTop)
        console.log(document.documentElement.offsetHeight);
        // if (myDiv.offsetHeight + myDiv.scrollTop >= myDiv.scrollHeight) {
        //     scrolledToBottom(e);
        //   }
      }

    useEffect(() => {
           getEventList(); 
           window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
    }, [])

    const getEventList = () => {
        http.get('http://localhost:5000/api/event/1').then(res => {
            console.log(res.data.data);
            setEventData(res.data.data);
        })
       
    }

    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <React.Fragment>
            <Header type='Add'/>

            <Grid container spacing={3}>
                <Grid item xs={4}>
                {eventData.map((text, index) => (
                    <Card className="dashboard-card total-jobs" key={text._id} style={{padding: '10px', margin : '10px'}}>
                        <CardContent >
                        Type : {text.type}
                        </CardContent>
                    <CardContent>
                        
                        Location : {text.location}
                    </CardContent>
                </Card>
                ))}
                    
                </Grid>
                
            </Grid>
            
        </React.Fragment>);
}

export default EventList;