import React from 'react';
import Popover from '@material-ui/core/Popover';
import { IconButton } from '@material-ui/core';
import './App.css';


function App() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleActionBtnClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleActionBtnClose = () => {
    setAnchorEl(null);
  };

  const actionPopoverOpen = Boolean(anchorEl);
  const actionPopoverId = actionPopoverOpen ? 'action-btn-popover' : undefined;

  return (
    <div className="App">
	    <div className="block-container">
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
				          <p>The content of the Popover.</p>
				        </Popover>
	    			</div>
	    		</div>
	    		<div className="block-media">
	    			<img src="https://gagadget.com/media/cache/ca/bb/cabb848a7a94d220637c60682e3955ae.jpg" />
	    		</div>
	    		<div className="block-content">
	    			<p>
	    				Block #1 text fefe
	    			</p>
	    		</div>
	    	</div>
	    </div>
    </div>
  );
}

export default App;
