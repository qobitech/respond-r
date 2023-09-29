const { exec } = require("child_process")

const OSENUM = {
  WINDOWS: "Winows",
  MAC: "MacOS",
  LINUX: "Linux",
}

function getOS() {
  const os = process.platform
  if (os === "darwin") {
    return OSENUM.MAC
  } else if (os === "win32" || os === "win64") {
    return OSENUM.WINDOWS
  } else if (os === "linux") {
    return OSENUM.LINUX
  }
  return ""
}

const runCMD = (command, fileName, callBackError, callback) => {
  console.log(fileName)
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log("error: ", error.message)
    }
    if (stderr) {
      console.log(stderr)
      if (typeof callBackError === "function") callBackError()
    }
    if (stdout) {
      console.log(stdout)
      if (typeof callback === "function") callback()
    }
  })
}

const runHttpServer = () => {
  const os = getOS()
  if (os === OSENUM.MAC) {
    return `osascript -e 'tell app "Terminal"
    do script "http-server ./"
end tell'`
  }
  if (os === OSENUM.LINUX) {
    return `gnome-terminal -- bash -c "http-server ./"`
  }
  if (os === OSENUM.WINDOWS) {
    return `start cmd /k "http-server ./"`
  }
}

const installNodeonMac = () => {
  runCMD(
    "chmod +x install_node.sh",
    "making node script executable",
    null,
    () => {
      runCMD("./mac-install-node.sh", "installing node js", null, () => {
        runAppConfig()
      })
    }
  )
}

const installNodeonWindows = () => {
  runCMD(
    `runas /user:Administrator /savecred "./win-install-node.bat"`,
    "install node on windows",
    null,
    () => {
      runAppConfig()
    }
  )
}

const runAppConfig = () => {
  runCMD(
    "node -v",
    "checking node version - ",
    () => {
      installNodeonMac()
      installNodeonWindows()
    },
    () => {
      runCMD(
        "http-server -v",
        "checking http-version - ",
        () => {
          runCMD("npm i -g http-server", "install http-server - ", null, () => {
            runAppConfig()
          })
        },
        () => {
          runCMD(runHttpServer(), "run http-server", null, null)
        }
      )
    }
  )
}

runAppConfig()
