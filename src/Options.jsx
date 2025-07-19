export default function Options({ id, size, oplayer, blockCenter, sound, dimensions, sizes, difficulty, setDifficulty, setOplayer, setBlockCenter, setSound, setDimensions, resetGame, setSize, highlight }) {


    return (
        <div id={id}>

        
            <label htmlFor="oplayer">Computer controls O:</label>
            <input type="checkbox" id="oplayer" name="oplayer" checked={oplayer} onChange={() => setOplayer(!oplayer)} /><br />
            <label htmlFor="blockcenter">Block Center Square:</label>
            <input type="checkbox" id="blockcenter" name="blockcenter" checked={blockCenter} onChange={() => {
                setBlockCenter(!blockCenter);
                }} />

            <p>
                    <button onClick={() => setSound(!sound)}>Sound: {sound? `On` : `Off` }</button>
                </p>
            <p>
            <button onClick={() => {
              resetGame();
              setDimensions(prev => prev === '2D'? '3D' : '2D')
              return;
            }}
            id="setDimBtn">Dimensions: {dimensions}</button>
        </p>

        <p id="sizeBtnContainer">
            <button onClick={() => {
              setSize(prev => {
                let i = sizes.indexOf(prev);
                let newSize = sizes[(i + 1) % sizes.length]
                //document.getElementsByClassName('board')[0].style.gridTemplateColumns = `repeat(${newSize}, 1fr)`;
                //document.getElementsByClassName('board')[0].style.gridTemplateRows = `repeat(${newSize}, 1fr)`;
                return newSize;
                });
                

            }}
            id="sizeBtn">{dimensions === '3D' ? `${size} x ${size} x ${size}` : `${size} x ${size}`}</button>
        </p>

        <p>
            <button onClick={() => {
              setDifficulty(prev => prev == "Easy"? "Hard" : "Easy")
            }}
            id="difficultyBtn">Difficulty: {difficulty}</button>
        </p>



     
    </div>
    
    )
}