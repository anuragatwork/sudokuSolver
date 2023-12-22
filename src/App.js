import './App.css';
import {useState} from 'react';

const initial=[
  [-1, 5, -1, 9, -1, -1, -1, -1, -1],
  [8, -1, -1, -1, 4, -1, 3, -1, 7],
  [-1, -1, -1, 2, 8, -1, 1, 9, -1],
  [5, 3, 8, 6, -1, 7, 9, 4, -1],
  [-1, 2, -1, 3, -1, 1, -1, -1, -1],
  [1, -1, 9, 8, -1, 4, 6, 2, 3],
  [9, -1, 7, 4, -1, -1, -1, -1, -1],
  [-1, 4, 5, -1, -1, -1, 2, -1, 9],
  [-1, -1, -1, -1, 3, -1, -1, 7, -1]
]

function App() {

  const [sudokoArr,setSudokoArr]=useState(initial);

  function getDeepCopy(arr){
    return JSON.parse(JSON.stringify(arr));
  }

  function onInputChange(e,row,col){
    let val=parseInt(e.target.value)||-1,grid=getDeepCopy(sudokoArr);
    
    if(val===-1 ||(val>=1 &&val<=9)){
      grid[row][col]=val;
    }
    setSudokoArr(grid);
  }

  // solve sudoko ---------------------------------------------------------------
  function isValid(row,col,board,num){
    for( let i=0;i<9;i++){
      if(board[i][col]===num )return false;
      if(board[row][i]===num )return false;

      if(board[3 * Math.floor(row/3) + Math.floor(i/3)][3 * Math.floor(col/3)+(i%3)]===num) return false;
    }
    return true;
  }
  function solver(board){
    let n=9;
    for( let i=0;i<n;i++){
      for( let j=0;j<n;j++){
        if(board[i][j]===-1){
          for(let num=1;num<=9;num++){
            if(isValid(i,j,board,num)){
              board[i][j]=num;
              if(solver(board)===true){
                return true;
              }
              else{
                //to delete filled values
                board[i][j]=-1;
              }
            }
          }
          // no possible arrangement possible backtrack and delete filled values
          return false;
        }
        
      }
    }
    // no empty block hence solve
    return true;
  }
  function sudokoSolver(){
    let board=getDeepCopy(initial);
    // console.log("before",sudoko);
    solver(board);
    setSudokoArr(board);

  }

  //----------------------------------------------------------------

  function resetSudoko(){
    const board=getDeepCopy(initial);
    setSudokoArr(board);
  }


  function check(row,col,board,num){
    for( let i=0;i<9;i++){
      if(board[i][col]===num && i!==row){
        return true;
      }
      if(board[row][i]===num && i!==col){
        return true;
      }
      let a=3 * Math.floor(row/3) + Math.floor(i/3),b=3 * Math.floor(col/3)+(i%3);
      if(board[a][b]===num && (a!==row && b!==col)){
        return true;
      }
    }
    return false;
  }

  function checkSudoko(){
    const board=getDeepCopy(sudokoArr);
    for( let i=0;i<9;i++){
      for(let j=0;j<9;j++){
        //for each element check that its unique in row col and its square
        if(board[i][j]===-1){
          alert("keep going , sudoko is not filled completely");
          return;
        }
        if(check(i,j,board,board[i][j])){
          alert("wrong answer please check again ");
          return;
        }
      }
    }
    alert("congrats , you have won !!!");
    return;
  }

  return (
    <div className="appHeader">
     <h3>Sudoko Solver</h3>
     <table>
      <tbody>
        {
          [0,1,2,3,4,5,6,7].map((row,rIndex)=>{
            return <tr key={rIndex}>
              {
                [0,1,2,3,4,5,6,7].map((col,cIndex)=>{
                  return  <td key={rIndex+cIndex}>
                            <input 
                            onChange={(e)=>onInputChange(e,row,col)}
                            value={sudokoArr[row][col]===-1?'':sudokoArr[row][col]}
                            className='cellInput'
                            disabled={initial[row][col]!==-1}
                            />
                          </td>
                })
              }
            </tr>
          })
        }
      </tbody>
     </table>
     <div className="buttonConatiner">
      <button className="solveButton" onClick={sudokoSolver}>Solve</button>
      <button className="checkButton" onClick={checkSudoko}>Check</button>
      <button className="resetButton" onClick={resetSudoko}>Reset</button>
     </div>
    </div>
  );
}

export default App;
