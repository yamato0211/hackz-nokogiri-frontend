import { Modal, Fade, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function AddActivityModal(
    props: {
        open: boolean;
        setOpen: (a:Function)=>void;
    }
){
    const handleClose = ()=> props.setOpen(()=>false);

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={props.open}
            onClose={handleClose}
            closeAfterTransition
            // BackdropComponent={Backdrop}
            // BackdropProps={{
            //   timeout: 500,
            // }}
        >
            <Fade in={props.open}>
                <Box sx={{
                    position:'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%,-50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    borderRadius: 5,
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography>
                        もーだる！！！
                    </Typography>
                </Box>
            </Fade>
        </Modal>
    );
}