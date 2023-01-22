import Link from 'next/link'
import styles from '../../styles/Home.module.css'
import React from 'react';
import { Button, Box, Collapse, Grid, ListItemIcon, ListItem, ListSubheader, Typography, ListItemButton, ListItemText, Stack, ListItemAvatar, List, Modal } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import {LocationOn, ExpandLess, ExpandMore} from '@mui/icons-material';

import CustomHead from '../components/customhead'
import CustomFooter from '../components/customfooter'
import AddActivityModal from '../components/addactivitymodal';
import { useEffect, useState } from 'react'
import axios from 'axios';
import { RecordId, ServerURL } from '../refs';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type RawActivitiesData = {
  Record: {
    id: string;
    lineId: string;
    name: string;
  }
  createdAt: string;
  dateTime: string;
  id: string;
  member: {
    activitieId: string;
    lineId: string;
  }[];
  misc: string;
  name: string;
  place: string;
  recordId: string;
  updatedAt: string;
}[];

interface RawRecordData {
  activities: {
    id: string;
    createdAt: string;
    dateTime: string;
    misc: string;
    name: string;
    place: string;
    recordId: string;
    updatedAt: string;
  }[];
  id: string;
  lineId: string;
  name: string;
}

export interface ActivityData {
  id: string;
  title: string;
  date: Date;
  place: string;
  members: string[];
  misc: string;
  open: boolean;
}
interface RecordData {
  name: string;
  activities: ActivityData[]
}

const voidRecord: RecordData = {
  name: 'undefined',
  activities: [{
    id: '123456789',
    title: 'undefined',
    date: new Date(),
    place: 'undefined',
    members: ['undefined'],
    misc: 'undefined',
    open: false,
  }]
}

export default function Home() {
  const [aaModalOpen, setAaModalOpen] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [rec, setRec] = useState<RecordData>(voidRecord);
    
    // バックエンドからデータ取得
    const [rawRecord, setRawRecord] = useState<RawRecordData>()
    const [rawActivities, setRawActivities] = useState<RawActivitiesData>(); 
    useEffect(() => {
      (async() => {
        const response1 = await axios.get(ServerURL + "/record/" + RecordId)
        setRawRecord(await response1.data as RawRecordData)
        console.log('<rawRecord>');
        console.log(rawRecord);
        const response2 = await axios.get(ServerURL + "/activitie/record/" + RecordId)
        setRawActivities(await response2.data as RawActivitiesData)
        console.log('<rawActivities>');
        console.log(rawActivities);
        // データの成形
        setRec((()=>LoadRecord(rawRecord, rawActivities))());
      })()
    }, [rawRecord===undefined, rawActivities===undefined])
    // }, [])


  function handleClick(i: number){
    setRec((r:RecordData)=>{
      r.activities[i].open = !r.activities[i].open;
      return Object.assign({}, r);
    });
  }

  function HandleAddActivityButtonClick(){
    //alert('活動を追加');
    setAaModalOpen(b=>true);
  }

  function addActivity(ac:ActivityData){
    setRec(rc=>{
      if(!rc)return rc;
      rc.activities.push(ac);
      return Object.assign({}, rc);
    })
  }

  return (
    <div className={styles.container}>
      <CustomHead/>
      
      <main style={{
        textAlign:'center',
        padding: '4rem 0',
        minHeight: '100vh'
      }}>

        <h1 className={styles.title}>
          Activities
        </h1>

        <Link href="/" passHref>
          <Button variant="contained" style={{textTransform: 'none'}}>
            Back
          </Button>
        </Link>

        <Box sx={{
          width: '100%',
          maxWidth: 500,
          margin: '0 auto',
          bgcolor: 'background.paper'
        }}>
          <Grid container>
            <Grid item xs={10} sx={{fontWeight:'bold',fontSize:20, textAlign:'left', float:'left'}}>
              {rec.name}
            </Grid>
            <Grid item xs={2}>
              <Button sx={{float:'right'}} onClick={HandleAddActivityButtonClick}><AddIcon/></Button>
              <AddActivityModal
                open={aaModalOpen}
                setOpen={setAaModalOpen as (a: Function) => void}
                addActivity={addActivity}
              />
            </Grid>
          </Grid>
          <List>{rec.activities.map((ac,i)=>(
            <React.Fragment key={i}>
              <ListItemButton onClick={()=>handleClick(i)}>
                {ac.open?<ExpandLess/>:<ExpandMore/>}
                <ListItemText
                sx={{
                  maxWidth: 350,
                }}
                primary={ac.title}
                secondary={ac.open?'':<Typography sx={{
                  overflow:'hidden',
                  whiteSpace:'nowrap',
                  textOverflow:'ellipsis',
                  color: 'text.secondary',
                }}>{`@${ac.place} メンバー(${ac.members.length})：${ac.members.join(', ')}`}</Typography>}
                />
                <ListItemText
                sx={{
                  textAlign:'right',
                  mr: 2,
                }}
                primary={<Typography
                >{
                  `${ac.date.getFullYear()}/${ac.date.getMonth()+1}/${ac.date.getDate()}`
                }</Typography>}
                secondary={<Typography
                sx={{
                  color: 'text.secondary'
                }}
                >{
                  `${ac.date.getHours().toString().padStart(2,'0')}:${ac.date.getMinutes().toString().padStart(2,'0')}`
                }</Typography>}
                />
              </ListItemButton>
              <Collapse
                in={ac.open}
                sx={{pl:4, pr:4}}
                timeout="auto"
                unmountOnExit
                style={{textAlign:'center'}}
              >
                <Stack>
                  <h4 style={{textAlign:'left'}}>メモ</h4>
                  <p style={{textAlign:'left'}}>{ac.misc}</p>
                  <h4 style={{textAlign:'left'}}>{`メンバー(${ac.members.length})`}</h4>
                  <Button onClick={handleOpen}>メンバーの招待<AddIcon/></Button>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Typography id="modal-modal-title" variant="h6" component="h2">
                        メンバー招待用URL
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        以下のURLを参加させたいメンバーに共有してください<br />
                        <a href={`http://localhost:3000/activity/${ac.id}`}>http://localhost:3000/activity/{ac.id}</a>
                      </Typography>
                    </Box>
                  </Modal>
                  <Grid container spacing={0.5}>
                    {ac.members.map((m,i)=>(
                      <Grid item xs={4} key={i}>
                        <Item>{m}</Item>
                      </Grid>
                    ))}
                  </Grid>
                </Stack>
              </Collapse>
            </React.Fragment>
          ))}</List>
        </Box>

      </main>

      <CustomFooter/>
    </div>
  )
}

function LoadRecord(rr?: RawRecordData, ra?: RawActivitiesData): RecordData{
  // Dateコンストラクタに入れる文字列
  if(!rr || !ra)return voidRecord;
  let dateStr: string;
  let record: RecordData = {
    name: rr.name,
    activities: [],
  };
  ra.forEach(ac=>{

    // TODO: dateStr設定
    // dateStrフォーマット(成功) : 2019/09/26 11:01:22
    // dateStrフォーマット(現在) : 1970-01-01T00:00:00.000Z
    dateStr = ac.dateTime;

    record.activities.push({
      id: ac.id,
      title: ac.name,
      date: new Date(dateStr),
      place: ac.place,
      members: ac.member.map(m=>m.lineId),
      misc: ac.misc,
      open: false,
    });
  });
  return record;
}
