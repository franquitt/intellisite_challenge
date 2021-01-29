const menus = {
	main: `
    cli [command] <options>
    file_upload .............. load a JSON file into the DB
    help ..................... show help menu for a command
`,
	file_upload: `
    cli file_upload <options>
    --file ................... the location of the file to upload
`,
}

module.exports = (args) => {
	const subCmd = args._[0] === 'help'
		? args._[1]
		: args._[0]
	console.log(menus[subCmd] || menus.main)
}
