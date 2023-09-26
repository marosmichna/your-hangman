
type HangmanBodyProps = {
    numberOfGuess: number
    isDarkMode: boolean
}

export const HangmanBody = ({ numberOfGuess, isDarkMode }: HangmanBodyProps) => {
    
    const backgroundColor = isDarkMode ? "white" : "black";

    const HEAD = (
        <div
            style={{
                width: "50px",
                height: "50px",
                borderRadius: "100%",
                border: isDarkMode ? "10px solid white" : "10px solid black",
                position: "absolute",
                top: "50px",
                right: "-30px"
            }} 
        />
    )
    
    const BODY = (
        <div
            style={{
                width: "10px",
                height: "100px",
                background: backgroundColor,
                position: "absolute",
                top: "120px",
                right: 0
            }} 
        />
    )
    
    const RIGHT_ARM = (
        <div
            style={{
                width: "100px",
                height: "10px",
                background: backgroundColor,
                position: "absolute",
                top: "150px",
                right: "-100px",
                rotate: "-30deg",
                transformOrigin: "left bottom"
            }} 
        /> 
    )
    
    const LEFT_ARM = (
        <div
            style={{
                width: "100px",
                height: "10px",
                background: backgroundColor,
                position: "absolute",
                top: "150px",
                right: "10px",
                rotate: "30deg",
                transformOrigin: "right bottom"
            }} 
        /> 
    )
    
    const RIGHT_LEG = (
        <div
            style={{
                width: "100px",
                height: "10px",
                background: backgroundColor,
                position: "absolute",
                top: "210px",
                right: "-90px",
                rotate: "60deg",
                transformOrigin: "left bottom"
            }} 
        /> 
    )
    
    const LEFT_LEG = (
        <div
            style={{
                width: "100px",
                height: "10px",
                background: backgroundColor,
                position: "absolute",
                top: "210px",
                right: 0,
                rotate: "-60deg",
                transformOrigin: "right bottom"
            }} 
        /> 
    )
    
  
    
    const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG]
    
    return(
        <div style={{ position: "relative" }}>
            {BODY_PARTS.slice(0, numberOfGuess)}
            <div
                style={{
                    height: "50px",
                    width: "10px",
                    background: backgroundColor,
                    position: "absolute",
                    top: 0,
                    right: 0,
                }}
            />
            <div
                style={{
                    height: "10px",
                    width: "200px",
                    background: backgroundColor,
                    marginLeft: "120px"
                }}
            />
            <div
                style={{
                    height: "350px",
                    width: "10px",
                    background: backgroundColor,
                    marginLeft: "120px"
                }}
            />
            <div 
                style={{
                    height: "10px",
                    width: "250px",
                    background: backgroundColor
                }}
            />
        </div>
    )
};