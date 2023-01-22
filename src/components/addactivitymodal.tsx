import { Modal, Fade, Stack, Typography, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { ActivityData } from "../pages/activities";

export default function AddActivityModal(
  props: {
    open: boolean;
    recId: string;
    setOpen: (a: Function) => void;
    addActivity: (a: ActivityData) => void;
  }
) {
  const initActivity:ActivityData = {
    title: '新しい活動',
    date: new Date(),
    place: 'どこどこ',
    misc: '',
    recordId: props.recId,
    members: [],
    open: false,
  };
  const [newActivity, setNewActivity] = useState<ActivityData>(initActivity);
  
  function handleClose(){
    setNewActivity(ac=>initActivity);
    props.setOpen(() => false);
  }

  function handleOk(){
    if(!newActivity)return;
    props.addActivity(newActivity);
    handleClose();
  }


  function handleChangeTitle(event: React.ChangeEvent<HTMLInputElement>){
    setNewActivity(ac=>{
      ac.title = event.target.value;
      return Object.assign({}, ac);
    });
  }
  
  function handleChangeDate(event: React.ChangeEvent<HTMLInputElement>){
    // console.log(event.target.value);
    setNewActivity(ac=>{
      ac.date = new Date(event.target.value);
      return Object.assign({}, ac);
    });
  }
  
  function handleChangePlace(event: React.ChangeEvent<HTMLInputElement>){
    setNewActivity(ac=>{
      ac.place = event.target.value;
      return Object.assign({}, ac);
    });
  }
  
  function handleChangeMisc(event: React.ChangeEvent<HTMLInputElement>){
    setNewActivity(ac=>{
      ac.misc = event.target.value;
      return Object.assign({}, ac);
    });
  }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={props.open}
      onClose={handleClose}
      closeAfterTransition
    >
      <Fade in={props.open}>
        <Stack spacing={3} sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: 5,
          boxShadow: 24,
          p: 4,
        }}>
          <Typography variant='h6' sx={{pb:2}}>
            新しい活動の作成
          </Typography>
          <TextField
            required
            label='タイトル'
            type='search'
            onChange={handleChangeTitle}
            defaultValue={newActivity.title}
          />
          <TextField
            required
            label='日時'
            type='datetime-local'
            onChange={handleChangeDate}
            defaultValue={newActivity.date.toLocaleString().replace(/(?<!\d)(\d{1})(?!\d)/g,'0$1').replace(/\//g,'-').replace(' ','T').replace(/:\d+$/,'')}
            InputLabelProps={{shrink: true}}
          />
          <TextField
            required
            label='場所'
            type='search'
            onChange={handleChangePlace}
            defaultValue={newActivity.place}
          />
          <TextField
            label='メモ(任意)'
            type='search'
            onChange={handleChangeMisc}
            defaultValue={newActivity.misc}
          />
          <Button onClick={handleOk}>OK</Button>
        </Stack>
      </Fade>
    </Modal>
  );
}