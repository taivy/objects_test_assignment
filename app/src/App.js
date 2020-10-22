import React, { useCallback } from 'react';
import Popover from '@material-ui/core/Popover';
import { IconButton } from '@material-ui/core';
import { MenuList } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import VideoCallOutlinedIcon from '@material-ui/icons/VideoCallOutlined';
import AddPhotoAlternateOutlinedIcon from '@material-ui/icons/AddPhotoAlternateOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import { Divider } from '@material-ui/core';
import {useDropzone} from 'react-dropzone';

import './App.css';


const backendUrl = 'http://64.227.43.113:8088';


function Block(props) {
  const [blockData] = props;


  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleActionBtnClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleActionBtnClose = () => {
    setAnchorEl(null);
  };

  const onDrop = useCallback(async (acceptedFiles) => {
  	const formData = new FormData();
  	formData.append('file', acceptedFiles[0]);
    let data;

  	try {
    	let response = await fetch(backendUrl + 'uploader/' + blockData['id'], {
    	  method: 'POST',
    	  body: formData
    	});

    	data = await response.json();
  	} catch(e) {
      console.log(e)
      return
    }
	  blockData['image_url'] = backendUrl + data['image_url'];
  }, [blockData]);

  const {getInputProps, open} = useDropzone({
    noClick: true,
    noKeyboard: true,
    accept: 'image/*',
    multiple: false,
    onDrop
  });

  const actionPopoverOpen = Boolean(anchorEl);
  const actionPopoverId = actionPopoverOpen ? 'action-btn-popover' : undefined;

    return  (
		<div className="block">
    		<div className="block-header">
    			<div className="block-action">
    				<IconButton className="action-button" aria-describedby={actionPopoverId} onClick={handleActionBtnClick}>
    					<img src="/dots.svg" />
    				</IconButton>
			        <Popover
			          id={actionPopoverId}
			          open={actionPopoverOpen}
			          anchorEl={anchorEl}
			          onClose={handleActionBtnClose}
			          anchorOrigin={{
			            vertical: 'bottom',
			            horizontal: 'center',
			          }}
			          transformOrigin={{
			            vertical: 'top',
			            horizontal: 'center',
			          }}
			        >
			          <MenuList>
			            <MenuItem onClick={open}>
			            	<ListItemIcon>
			            		<AddPhotoAlternateOutlinedIcon />
			            	</ListItemIcon>
			            	<input {...getInputProps()} />
			            	<ListItemText primary="Add Image" />
			            </MenuItem>
			            <MenuItem>
			            	<ListItemIcon>
			            		<VideoCallOutlinedIcon />
			            	</ListItemIcon>
			            	<ListItemText primary="Add Video" />
			            </MenuItem>
			            <Divider />
			            <MenuItem>
			            	<ListItemIcon>
			            		<DeleteOutlineOutlinedIcon />
			            	</ListItemIcon>
			            	<ListItemText primary="Delete Block" style={{color: "red"}} />
			            </MenuItem>
			          </MenuList>
			        </Popover>
    			</div>
    		</div>
    		<div className="block-media">
    			<img src={backendUrl + blockData['img_url']} />
    		</div>
    		<div className="block-content">
    			<p>
    				{ blockData['text'] }
    			</p>
    		</div>
    	</div>
	)
}


function App() {
  const [blocks, setBlocks] = React.useState([]);

  const getBlocks = async () => {
  	const getBlockEndpoint = backendUrl + "blocks"
  	let response = await fetch(getBlockEndpoint, {
  	  method: 'GET'
  	});

  	let data = await response.json();
  	setBlocks(data['blocks']);
  }

  return (
    <div className="App">
	    <div className="block-container">
	    	{blocks.map((blockData) => (
	    		<Block blockData />
	    	))}
	    </div>
    </div>
  );
}

export default App;
