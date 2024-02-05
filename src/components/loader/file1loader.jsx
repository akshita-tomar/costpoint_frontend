import imgLoader from '../../images/loader.gif'
import './loader.css'
const FileLoader=()=>{
    return(
      
        <div className='fileLoader bg'>
            <img src={imgLoader} height="210px" width="310px"/>
        </div>

       
    )
}
export default FileLoader