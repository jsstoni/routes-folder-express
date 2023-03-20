const path = require('path')
const fs = require('fs')
const express = require('express')
const router = express.Router()

const root = path.dirname(process.mainModule.filename)
const folderRoutes = `${root}\\routes`

const removeExtension = (fileName) => {
    return fileName.split('.').shift()
}

if (fs.existsSync(folderRoutes)) {
	fs.readdirSync(folderRoutes).filter(async (file) => {
		const fileWithoutExt = removeExtension(file)
		const skip = ['index'].includes(fileWithoutExt)
		if (!skip) {
			const pathName = fileWithoutExt == 'web' ? '/' : `/${fileWithoutExt}`
			const pathFile = `${folderRoutes}\\${fileWithoutExt}`
			router.use(pathName, require(pathFile))
		}
	})
}

module.exports = router