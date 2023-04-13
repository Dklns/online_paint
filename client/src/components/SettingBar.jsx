import toolState from "../store/toolState";


const SettingBar = () => {
    return (
        <div className="setting-bar" style={{top: 40}}>
            <label htmlFor="line-width">线条粗细</label>
            <input 
                onChange={e => toolState.setLineWidth(e.target.value)}
                style={{margin: '0 10px'}} 
                id="line-width" type="number" defaultValue={1} min={1} max={50} 
            />
            <label htmlFor="stroke-color">边框颜色</label>
            <input onChange={e => toolState.setStrokeColor(e.target.value)} type="color" />
        </div>
    )
}

export default SettingBar;