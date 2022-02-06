//A helper object I made to log colorfull statements by specific need
const c =  
    {
        //Failiure Console Message(Purple + White BackGround)
        f: {
            s: '\u001b[1;41m', //BackGround Color Start
            
            //Message

            e: '\u001b[0m', //BackGround Color End
        },
        //Success Console Message(Blue + White BackGround)
        s:{
            s: '\u001b[1;42m', 
            e: '\u001b[0m', 
        },
        //Personal Console Message(Cyan + White BackGround)
        p:{
            s: '\u001b[1;46m \u001b[1;33m', 
            e: '\u001b[0m', 
        }
    }


module.exports = c;