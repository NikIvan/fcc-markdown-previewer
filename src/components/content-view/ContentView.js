import {useState} from 'react';

import classes from './ContentView.module.css';

const defaultFontScale = 1.5;

function ContentView(props) {
  const [fontScale, setFontScale] = useState(defaultFontScale);
  
  return (
    <div 
      className={classes.container}
      style={{
        height: props.isExpanded ? '80vh' : '40vh',
        display: props.isVisible ? '' : 'none',
      }}
    >
      <header className={classes.header}>
        <div>{props.title}</div>
        <div className={classes.controls}>
          <button 
            className={classes.btn} 
            onClick={() => setFontScale(fontScale + .1)}
          >
              <i className="fas fa-search-plus"></i>
          </button>
          <button
            className={classes.btn} 
            onClick={() => setFontScale(fontScale - .1)}
          ><i className="fas fa-search-minus"></i>
          </button>
          <button 
            className={classes.btn} 
            onClick={() => props.toggleExpanded()}
          >
            {props.isExpanded 
            ? <i className="fas fa-compress-arrows-alt" title="minimize"></i> 
            : <i className="fas fa-expand-arrows-alt" title="expand"></i>}
          </button>
        </div>
      </header>
      <div 
        className={classes.content}
        style={{
          fontSize: `${fontScale}em`,
        }}
      >
        {props.children}
      </div>
    </div>
  );
}

export default ContentView;
