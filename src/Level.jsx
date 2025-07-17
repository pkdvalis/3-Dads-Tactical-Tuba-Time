import sword from './assets/sword.png';
import dragon from './assets/dragon.png';
import blank from './assets/blank.png';
import fire from './assets/fire.png';

export default function Level({ gridLevel, level, winner, handleClick, turn, size }) {

    return (
    
      <div className='board-wrapper'>
      <div className="board" style={{ gridTemplateColumns: `repeat(${size}, 1fr)`,
                                      gridTemplateRows: `repeat(${size}, 1fr)`}}>
    
        {
          gridLevel.map((row,x) => {
            return row.map((square, y) => {
              
            
            return <button 
              onClick={(e) => {
                
                if (gridLevel[x][y] != "") return;
                if (winner) return;
                handleClick(level,x,y,turn);
                
                }}
              key={level.toString()+x+y} 
              id={level.toString()+x+y}
              className="square"><img src={square == 'X'? sword : square == "O" ? dragon : square == "B" ? fire : blank} width="100%" /></button>
    
            })
          })
    
        }
        
    
      </div>
      </div>
    )
    
    }