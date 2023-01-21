import Link from 'next/link'
import styles from '../../styles/Home.module.css'
import React from 'react';
import { Button, Box, Collapse, Grid, ListItemIcon, ListItem, ListSubheader, Typography, ListItemButton, ListItemText, Stack, ListItemAvatar, List } from '@mui/material'
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import {LocationOn, ExpandLess, ExpandMore} from '@mui/icons-material';

import CustomHead from '../components/customhead'
import CustomFooter from '../components/customfooter'
import { useEffect, useState } from 'react'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

interface RawData {
  name: string;
  activities: {
    date: string;
    time: string;
    place: string;
    members: string[];
    misc: string;
  }[]
}

interface RecordData {
  name: string;
  activities: {
    date: Date;
    place: string;
    members: string[];
    misc: string;
    open: boolean;
  }[]
}



export default function Home() {
  // バックエンドから取得するデータ(仮)
  const data0_tmp: RawData = {
    "name": "記録簿A",
    "activities": [
      {
        "date": "2023/01/21",
        "time": "13:39",
        "place": "部室",
        "members": ['aaaaa','bbbbb','ccccc','ddddd','eeeee','fffff','ggggg'],
        "misc": "適当なメモ"
      },
      {
        "date": "2024/01/01",
        "time": "23:59",
        "place": "講義室A",
        "members": ["ccc", "ddd"],
        "misc": "メモメモメモ"
      },
    ],
  }

  // データの成形
  const [rec, setRec] = useState((()=>LoadRecord(data0_tmp))());

  function handleClick(i: number){
    setRec(r=>{
      r.activities[i].open = !r.activities[i].open;
      return {
        name: r.name,
        activities: r.activities
      };
    });
  }

  return (
    <div className={styles.container}>
      <CustomHead/>
      
      <main className={styles.main}>

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
          bgcolor: 'background.paper'
        }}>
          <h2>{rec.name}</h2>
          <List>{rec.activities.map((ac,i)=>(
            <React.Fragment key={i}>
              <ListItemButton onClick={()=>handleClick(i)}>
                {ac.open?<ExpandLess/>:<ExpandMore/>}
                <ListItemText
                primary={ac.place}
                secondary={ac.open?'':<Typography sx={{
                  overflow:'hidden',
                  whiteSpace:'nowrap',
                  textOverflow:'ellipsis',
                  color: 'text.secondary'
                }}>{`メンバー：${ac.members.join(', ')}`}</Typography>}
                />
                <ListItemText
                primary={<Typography
                sx={{
                  display: 'inline',
                  float: 'right'
                }}
                >{
                  `${ac.date.getFullYear()}/${ac.date.getMonth()}/${ac.date.getDate()}`
                  }</Typography>
                }
                />
              </ListItemButton>
              <Collapse
                in={ac.open}
                sx={{pl:4, pr:4}}
                timeout="auto"
                unmountOnExit
              >
                <Stack>
                  <h4>メモ</h4>
                  <p>{ac.misc}</p>
                  <h4>メンバー</h4>
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

function LoadRecord(data: RawData): RecordData{
  // Dateコンストラクタに入れる文字列
  let dateStr: string;
  let record: RecordData = {
    name: data.name,
    activities: [],
  };
  data.activities.forEach(ac=>{

    // TODO: dateStr設定
    // dateStrフォーマット : 2019/09/26 11:01:22
    dateStr = "2019/09/26 11:01:22";

    record.activities.push({
      date: new Date(dateStr),
      place: ac.place,
      members: ac.members,
      misc: ac.misc,
      open: false,
    });
  });
  return record;
}
