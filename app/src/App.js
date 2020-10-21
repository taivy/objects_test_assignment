import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
	    <div className="block-container">
	    	<div className="block">
	    		<div className="block-header">
	    			<div className="block-action">
	    				<button className="action-button">
	    					<img src="/dots.svg" />
	    				</button>
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
