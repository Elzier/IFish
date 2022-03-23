// usage: node {path to script}

import fs from "fs"
import favicons from "favicons"

const source = "/Users/elizier/Downloads/BBlog.png"
const faviconsPath = "./src/assets/icons"
const faviconsHtmlPath = "./src/favicons.njk"

const configuration = {
  path: "/assets/favicons",
  appName: "blog",
  appShortName: null,
  appDescription: null,
  developerName: "bb",
  developerURL: "elzier.github.io",
  dir: "auto",
  lang: "en-US",
  background: "#fafafa",
  theme_color: "#111111",
  appleStatusBarStyle: "black-translucent",
  display: "standalone",
  orientation: "any",
  scope: "/",
  start_url: "/",
  version: "1.0",
  logging: false,
  pixel_art: false,
  loadManifestWithCredentials: false,
  icons: {
    android: true,
    appleIcon: false,
    appleStartup: false,
    coast: false,
    favicons: true,
    firefox: false,
    windows: false,
    yandex: true,
  },
};

const callback = function (error, response) {
  if (error) {
    console.log(error.message)
    return;
  }

  if (!fs.existsSync(faviconsPath)) {
    fs.mkdirSync(faviconsPath)
  }

  response.images.forEach((element) => {
    fs.writeFileSync(`${faviconsPath}/${element.name}`, element.contents)
  })

  response.files.forEach((element) => {
    fs.writeFileSync(`${faviconsPath}/${element.name}`, element.contents)
  })

  fs.writeFileSync(faviconsHtmlPath, response.html.join("\n"))
}

favicons(source, configuration, callback)
