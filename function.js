const justify=(req,res,user,text)=> {

    if (!text) {
        res.send('')
        return
    }

    if (!checkuser(req,res,user,text)) {
        return
    }
    var cmp = 79;
    var newtext = ""
    var j
    text = text.replace(/\s\s+/g, ' ')
    for (var i = 0; i < text.length; i++) {
        newtext += text[i]
        if (i == cmp ) {
            if (text[i] == ' ' || text[i] == ',' || text[i] == '.') {
                newtext += '\n'
                cmp = i + 1 + 80
            }
            else {
                j = 0;
                while (text[i] !== ' ' && text[i] !== '.' && text[i] !== ',') {
                    i = i - 1;
                    j++;
                }
                newtext = newtext.substr(0, newtext.length - j)
                newtext += '\n'
                cmp = i + 80
            }
        }
    }

    res.send(space(newtext))
}


const checkuser=(req,res,user,text)=> {

    var currentuser = user[req.token]

    if (!currentuser || !currentuser.date) {
        res.sendStatus(403)
        return false
    }

    let userDay = currentuser.date.getDate()
    let currentDay = new Date().getDate()

    if (currentDay !== userDay) {
        currentuser.date = new Date()
        currentuser.words = 0
    }

    if (currentuser.words + text.length > 80000) {
        res.status(403).json({ message: 'Payment Required',status:'403' })
        return false
    }

    currentuser.words = currentuser.words + text.length

    user[req.token] = currentuser

    return true
}


const space=(text)=> {
MaxLineLength = 80

var newLines = text.split(/\n/)

for (var i = 0; i < newLines.length; i++) {

    var line = newLines[i].trim()
  

    if (line.length >= MaxLineLength) {
        continue;
    }
    var k = 1
    for (var j = 0; j < line.length; j++) {

        if (line[j] == " " && line.length < MaxLineLength) {
            line = char(line, j, "  ")
            j = j + k
        }
        if (j == line.length - 1 && line.length < MaxLineLength) {
            j = 0
            k++
        }
    }
    newLines[i] = line
}
return newLines.join("\n")

}


const char=(str, index, chr)=> {
if (index > str.length - 1) return str
return str.substr(0, index) + chr + str.substr(index + 1)
}


module.exports = {
    justify
  }